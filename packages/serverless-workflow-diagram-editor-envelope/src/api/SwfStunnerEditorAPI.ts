/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates.
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

import { Node, Edge } from "./StunnerEditorEnvelopeAPI";

export interface SwfStunnerEditorAPI {
  session: SwfStunnerEditoSession;
  canvas: SwfStunnerEditorCanvas;
}

export interface SwfStunnerEditoSession {
  getAllNodesUUID(): Promise<string[]>;
  getEdgeByUUID(uuid: string): Promise<Edge>;
  getNodeByUUID(uuid: string): Promise<Node>;
  // TODO: DOCS - Make special note about getDefinitionByElementUUID function:
  // - Beans must be cloneable, so they can be transferred across appshells.
  // - It is up to third parties to ensure it.
  getDefinitionByElementUUID(uuid: string): Promise<Object>;
  getNodeByName(name: string): Promise<Node>;
  getNodeName(uuid: string): Promise<string>;
  getSelectedElementUUID(): Promise<string>;
  getSelectedNode(): Promise<Node>;
  getSelectedEdge(): Promise<Edge>;
  getSelectedDefinition(): Promise<Object>;
  selectByUUID(uuid: string): Promise<void>;
  selectByName(name: string): Promise<void>;
  clearSelection(): Promise<void>;
}

export interface SwfStunnerEditorCanvas {
  getShapeIds(): Promise<string[]>;
  getBackgroundColor(uuid: string): Promise<string>;
  setBackgroundColor(uuid: string, backgroundColor: string): Promise<void>;
  getBorderColor(uuid: string): Promise<string>;
  setBorderColor(uuid: string, backgroundColor: string): Promise<void>;
  getLocation(uuid: string): Promise<number[]>;
  getAbsoluteLocation(uuid: string): Promise<number[]>;
  getDimensions(uuid: string): Promise<number[]>;
  center(uuid: string): Promise<void>;
  draw(): Promise<void>;
}
