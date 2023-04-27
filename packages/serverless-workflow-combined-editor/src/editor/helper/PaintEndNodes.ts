/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Edge, Node } from "@kie-tools/serverless-workflow-diagram-editor-envelope/dist/api/StunnerEditorEnvelopeAPI";
import { SwfStunnerEditorAPI } from "@kie-tools/serverless-workflow-diagram-editor-envelope/dist/api/SwfStunnerEditorAPI";

export const paintExitedEndNodes = (args: {
  stateNode: Node;
  isWorkflowCompleted: boolean;
  contentWindow: SwfStunnerEditorAPI;
  nodeColor: string;
  //exitedNodes: string[];
}) => {
  consumeExitedEndNodes({
    stateNode: args.stateNode,
    contentWindow: args.contentWindow,
    endNodeConsumer: async (uuid: string) => {
      await args.contentWindow.canvas.setBackgroundColor(uuid, args.nodeColor);
    },
    isWorkflowCompleted: args.isWorkflowCompleted,
    //exitedNodes: args.exitedNodes,
  });
};

const consumeExitedEndNodes = async (args: {
  stateNode: Node;
  contentWindow: SwfStunnerEditorAPI;
  endNodeConsumer: any;
  isWorkflowCompleted: boolean;
  // exitedNodes: string[];
}) => {
  if (args.isWorkflowCompleted) {
    let state = args.stateNode.definition;
    //if (isExited(state, args.exitedNodes)) {
    if (state.name !== "End") {
      args.endNodeConsumer(args.stateNode);
    }
    let pointsToExitedState = statePointsToAnyExitedState({
      stateNode: args.stateNode,
      //exitedNodes: args.exitedNodes,
      contentWindow: args.contentWindow,
    });
    if (!pointsToExitedState) {
      args.stateNode.outEdges
        .filter((c: Edge) => c.definition.id === "org.kie.workbench.common.stunner.sw.definition.End")
        .forEach((c: Edge) => {
          args.endNodeConsumer(c.uuid);
        });
      // let outConnectors = await args.contentWindow?.session..outConnectors(
      //   args.stateNode
      // );
      // outConnectors
      //   .filter((c: any) => {
      //     return (
      //       c.getTargetNode().getContent().getDefinition() instanceof
      //       args.contentWindow?.org.kie.workbench.common.stunner.sw.definition.End
      //     );
      //   })
      //   .forEach((c: any) => {
      //     let targetEndNode = c.getTargetNode();
      //     args.endNodeConsumer(targetEndNode);
      //   });
    }
    // }
  }
};

const statePointsToAnyExitedState = (args: { stateNode: Node; contentWindow: SwfStunnerEditorAPI }) => {
  let c1 = args.stateNode.outEdges.filter(
    (c: Edge) => c.definition.id === "org.kie.workbench.common.stunner.sw.definition.State"
  ).length;
  return c1 > 0;
  // let c1 = await args.contentWindow?.org.kie.workbench.common.stunner.core.graph.impl.NodeImpl.outConnectors(
  //   args.stateNode
  // ).filter(
  //   (c: any) =>
  //     c.getTargetNode().getContent().getDefinition() instanceof
  //     args.contentWindow?.org.kie.workbench.common.stunner.sw.definition.State
  // ).length;
  // return c1 > 0;
};

// export const isExited = (state: any, exitedNodes: any) => {
//   return exitedNodes.includes(state.name);
// };
