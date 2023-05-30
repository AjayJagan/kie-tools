/*
 * Copyright 2022 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ELsCodeCompletionStrategy,
  ELsShouldCreateCodelensArgs,
} from "@kie-tools/json-yaml-language-service/dist/channel";
import { TextDocument } from "vscode-languageserver-textdocument";
import { SwfLanguageServiceCommandTypes } from "../api";
import { JqExpressionContentType } from "@kie-tools/serverless-workflow-jq-expressions/dist/api";
export interface ShouldCreateCodelensArgs extends ELsShouldCreateCodelensArgs<SwfLanguageServiceCommandTypes> {}

export interface CodeCompletionStrategy extends ELsCodeCompletionStrategy<SwfLanguageServiceCommandTypes> {}

export interface JqCompletions {
  remote: {
    getJqAutocompleteProperties(args: {
      textDocument: TextDocument;
      schemaPaths: string[];
    }): Promise<Record<string, string>[]>;
  };
  relative: {
    getJqAutocompleteProperties(args: {
      textDocument: TextDocument;
      schemaPaths: string[];
    }): Promise<Record<string, string>[]>;
    getSchemaPropertiesFromInputSchema(schemaDetails: JqExpressionContentType): Promise<Record<string, string>[]>;
  };
}
