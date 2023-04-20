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

export interface StunnerEditorEnvelopeAPI {
  // Session API.
  editor_session_getAllNodesUUID(): Promise<string[]>;
  editor_session_getEdgeByUUID(uuid: string): Promise<Edge>;
  editor_session_getNodeByUUID(uuid: string): Promise<Node>;
  editor_session_getDefinitionByElementUUID(uuid: string): Promise<Object>;
  editor_session_getNodeByName(name: string): Promise<Node>;
  editor_session_getNodeName(uuid: string): Promise<string>;
  editor_session_getSelectedElementUUID(): Promise<string>;
  editor_session_getSelectedNode(): Promise<Node>;
  editor_session_getSelectedEdge(): Promise<Edge>;
  editor_session_getSelectedDefinition(): Promise<Object>;
  editor_session_selectByUUID(uuid: string): Promise<void>;
  editor_session_selectByName(name: string): Promise<void>;
  editor_session_clearSelection(): Promise<void>;
  // Canvas API.
  editor_canvas_getShapeIds(): Promise<string[]>;
  editor_canvas_getBackgroundColor(uuid: string): Promise<string>;
  editor_canvas_setBackgroundColor(uuid: string, backgroundColor: string): Promise<void>;
  editor_canvas_getBorderColor(uuid: string): Promise<string>;
  editor_canvas_setBorderColor(uuid: string, borderColor: string): Promise<void>;
  editor_canvas_getLocation(uuid: string): Promise<number[]>;
  editor_canvas_getAbsoluteLocation(uuid: string): Promise<number[]>;
  editor_canvas_getDimensions(uuid: string): Promise<number[]>;
  editor_canvas_center(uuid: string): Promise<void>;
  editor_canvas_draw(): Promise<void>;
}

export class Element {
  uuid: string;
  definition: Definition;
}

export class Node extends Element {
  inEdges: Edge[];
  outEdges: Edge[];
}

export class Edge extends Element {
  uuid: string;
  definition: Definition;
  source: string;
  target: string;
}

export class Definition {
  id: string;
  name: string;
}
