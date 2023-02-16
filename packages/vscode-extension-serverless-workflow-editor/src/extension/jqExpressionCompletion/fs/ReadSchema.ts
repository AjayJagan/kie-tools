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
import { parseAsyncApiSchema, parseJsonSchema, parseOpenApiSchema } from "./helper";
import { SchemaPathArgs } from "@kie-tools/serverless-workflow-language-service/dist/channel";

const SCHEMA_REGEX = new RegExp("^.*\\.(json|yaml|yml)$");

export class ReadSchema {
  private schemaPathArgs: SchemaPathArgs[];
  constructor(schemaPathArgs: SchemaPathArgs[]) {
    this.schemaPathArgs = schemaPathArgs;
  }
  public readSchemaProperties(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const promises: Thenable<string[]>[] = [];
      this.schemaPathArgs.forEach((schemaPath: SchemaPathArgs) => {
        promises.push(this.getSchemaProperties(schemaPath));
      });
      Promise.all(promises)
        .then((properties) => resolve(properties.flatMap((p) => p)))
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  }

  private async getSchemaProperties(schemaPath: SchemaPathArgs): Promise<string[]> {
    try {
      if (this.checkFileType(schemaPath.path)) {
        switch (schemaPath.type) {
          case "json_schema":
            return parseJsonSchema(schemaPath.path);
          case "asyncapi":
            return parseAsyncApiSchema(schemaPath.path);
          case "rest":
            return parseOpenApiSchema(schemaPath.path);
          default:
            return [];
        }
      } else {
        throw new Error(`Invalid file format, should be json,yaml or yml: ${schemaPath.path.split("/").pop()!}`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  private checkFileType(path: string): boolean {
    const fileName = path.split("/").pop()!;
    if (SCHEMA_REGEX.test(fileName.toLowerCase())) {
      return true;
    }
    return false;
  }
  //   private async getRawFile(path: string): Promise<Uint8Array> {
  //     return new Promise<Uint8Array>((resolve, reject) => {
  //       try {
  //         const schemaFileAbsolutePosixPathUri = vscode.Uri.parse(path);
  //         vscode.workspace.fs.stat(schemaFileAbsolutePosixPathUri).then(
  //           async (stats) => {
  //             if (!stats || stats.type !== vscode.FileType.File) {
  //               reject(`Invalid input schema path: ${path}`);
  //               return;
  //             }
  //             const fileName = path.split("/").pop()!;
  //             if (!SCHEMA_REGEX.test(fileName.toLowerCase())) {
  //               reject(`Invalid file format, must be a valid json schema: ${fileName}`);
  //               return;
  //             }
  //             const rawData = await vscode.workspace.fs.readFile(schemaFileAbsolutePosixPathUri);
  //             return resolve(rawData);
  //           },
  //           (reason) => {
  //             reject(`could not load specs folder in ${schemaFileAbsolutePosixPathUri}. the reason ${reason}`);
  //           }
  //         );
  //       } catch (e) {
  //         console.error(e);
  //         reject(`Could not read data from input schema. ${e}`);
  //       }
  //     });
  //   }
}
