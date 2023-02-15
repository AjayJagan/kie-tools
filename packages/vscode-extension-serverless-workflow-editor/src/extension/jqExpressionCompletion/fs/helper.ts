/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import $RefParser from "@apidevtools/json-schema-ref-parser";
import * as SwaggerParser from "@apidevtools/swagger-parser";
import { JSONSchema } from "@apidevtools/json-schema-ref-parser/dist/lib/types";
import { OpenAPIV3 } from "openapi-types";
import * as yaml from "js-yaml";
import { posix as posixPath } from "path";

export function getPropertiesRecursively(schema: JSONSchema): string[] {
  const result: string[] = [];
  function recursiveFunc(subSchema: any, tempArray: string[]) {
    const schemaType = subSchema.type;
    if (schemaType == "array") {
      recursiveFunc(subSchema.items, tempArray);
    } else if (schemaType == "object") {
      for (const [key, value] of Object.entries(subSchema.properties)) {
        tempArray.push(key);
        recursiveFunc(value, tempArray);
      }
    } else {
      return;
    }
    return tempArray;
  }
  return recursiveFunc(schema, result) ?? [];
}

export function parseJsonSchema(rawData: Uint8Array): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const schema = JSON.parse(new TextDecoder("utf-8").decode(rawData)) as JSONSchema;
      const derefSchema = await $RefParser.dereference(schema);
      const properties = getPropertiesRecursively(derefSchema);
      resolve(properties);
    } catch (e) {
      reject(e);
    }
  });
}

export function parseOpenApiSchema(rawData: Uint8Array, path: string): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceName = path.split("/").pop()!;
      //const contentParsed = await SwaggerParser.dereference(JSON.stringify(fileContentToOpenApiDocument(serviceName, rawData)));
      const contentParsed = (await SwaggerParser.dereference(
        new TextDecoder("utf-8").decode(rawData)
      )) as OpenAPIV3.Document;
      console.log(contentParsed);
      const result = Object.values(contentParsed.paths)
        .map((pathVal: any) => Object.values(pathVal))
        .flat()
        .map((restVal: any) => {
          const dataCollector = [];
          dataCollector.push(
            restVal.parameters.map((param: any) => {
              return param.name;
            })
          );

          if ("200" in restVal.responses && "content" in restVal.responses["200"]) {
            dataCollector.push(
              Object.values(restVal.responses["200"].content)
                .map((cont: any) => {
                  return getPropertiesRecursively(cont.schema);
                })
                .flat()
            );
          }

          if (restVal.requestBody && "content" in restVal.requestBody) {
            dataCollector.push(
              Object.values(restVal.requestBody.content)
                .map((cont: any) => {
                  return getPropertiesRecursively(cont.schema);
                })
                .flat()
            );
          }

          return [...dataCollector.flat()];
        });
      resolve([...new Set(result.flat())]);
    } catch (e) {
      reject(e);
    }
  });
}

function fileContentToOpenApiDocument(fileName: string, fileContent: Uint8Array): OpenAPIV3.Document {
  let serviceOpenApiDocument;
  if (posixPath.extname(fileName) === ".json") {
    serviceOpenApiDocument = JSON.parse(new TextDecoder("utf-8").decode(fileContent)) as OpenAPIV3.Document;
  } else {
    serviceOpenApiDocument = yaml.load(new TextDecoder("utf-8").decode(fileContent)) as OpenAPIV3.Document;
  }

  if (!serviceOpenApiDocument.openapi || !serviceOpenApiDocument.info || !serviceOpenApiDocument.paths) {
    throw new Error(`'${fileName}' is not an OpenAPI file`);
  }

  return serviceOpenApiDocument;
}
