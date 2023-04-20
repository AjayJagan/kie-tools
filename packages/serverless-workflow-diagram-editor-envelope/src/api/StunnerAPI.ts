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
export interface StunnerEditor {
  session: StunnerSession;
  canvas: StunnerCanvas;
}

export interface StunnerSession {
  getGraph(): StunnerGraph;
  getEdgeByUUID(uuid: string): StunnerEdge;
  getNodeByUUID(uuid: string): StunnerNode;
  getDefinitionByElementUUID(uuid: string): Object;
  getNodeByName(name: string): StunnerNode;
  getNodeName(uuid: string): string;
  getDefinitionId(bean: Object): string;
  getDefinitionName(bean: Object): string;
  getSelectedElementUUID(): string;
  getSelectedNode(): StunnerNode;
  getSelectedEdge(): StunnerEdge;
  getSelectedDefinition(): Object;
  selectByUUID(uuid: string): void;
  selectByName(name: string): void;
  clearSelection(): void;
}

export interface StunnerGraph {
  getUUID(): string;
  nodes(): Iterable<StunnerNode>;
  nodesArray(): StunnerNode[];
}

export interface StunnerElement {
  getUUID(): string;
  getContent(): StunnerContentView;
}

export interface StunnerNode extends StunnerElement {
  inConnectors(): StunnerEdge[];
  outConnectors(): StunnerEdge[];
}

export interface StunnerEdge extends StunnerElement {
  getSourceNode(): StunnerNode;
  getTargetNode(): StunnerNode;
}

export interface StunnerContentView {
  getDefinition(): Object;
}

export interface StunnerCanvas {
  /**
   * Returns all editor shapes' identifiers.
   */
  getShapeIds(): string[];

  /**
   * Returns a background color of a shape with provided UUID.
   * Returned string is a hex number of the color.
   *
   * @param uuid ID attribute of the queried shape
   */
  getBackgroundColor(uuid: string): string;

  /**
   * Sets a background color of a shape with provided UUID.
   *
   * @param uuid ID attribute of the target shape
   * @param backgroundColor hex number of the desired color as string
   */
  setBackgroundColor(uuid: string, backgroundColor: string): void;

  /**
   * Returns a border color of a shape with provided UUID.
   * Returned string is a hex number of the color.
   *
   * @param uuid ID attribute of the target shape
   */
  getBorderColor(uuid: string): string;

  /**
   * Sets a border color of a shape with provided UUID.
   *
   * @param uuid ID attribute of the target shape
   * @param backgroundColor hex number of the desired color as string
   */
  setBorderColor(uuid: string, backgroundColor: string): void;

  /**
   * Returns the location of a shape with provided UUID.
   * Returns an array where first position is X-attribute
   * and second position is Y-attribute.
   *
   * @param uuid ID attribute of the target shape
   */
  getLocation(uuid: string): number[];

  /**
   * Returns a window location fo a shape with provided UUID.
   * Returns an array where first position is X-attribute
   * and second position is Y-attribute relative to the viewport
   *
   * @param uuid ID attribute of target shape
   */
  getAbsoluteLocation(uuid: string): number[];

  /**
   * Returns dimensions of a shape with provided UUID.
   *
   * @param uuid ID attribute of a target shape
   * @returns A number array which contains the values for width and height
   */
  getDimensions(uuid: string): number[];

  /**
   * Centers a shape in viewable viewport area with provided UUID.
   *
   * @param uuid ID attribute of a target shape
   */
  center(uuid: string): void;

  /**
   * (Re) Draws the canvas.
   *
   */
  draw(): void;
}
