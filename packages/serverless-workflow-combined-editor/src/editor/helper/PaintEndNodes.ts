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

export const paintExitedEndNodes = (args: {
  stateNode: any;
  isWorkflowCompleted: boolean;
  contentWindow: any;
  nodeColor: string;
  exitedNodes: string[];
}) => {
  consumeExitedEndNodes({
    stateNode: args.stateNode,
    contentWindow: args.contentWindow,
    endNodeConsumer: (node: any) => {
      console.log("PAINTING EXITED END NODE:" + node.getUUID());
      args.contentWindow?.canvas.setBackgroundColor(node.getUUID(), args.nodeColor);
    },
    isWorkflowCompleted: args.isWorkflowCompleted,
    exitedNodes: args.exitedNodes,
  });
};

const consumeExitedEndNodes = (args: {
  stateNode: any;
  contentWindow: any;
  endNodeConsumer: any;
  isWorkflowCompleted: boolean;
  exitedNodes: string[];
}) => {
  if (args.isWorkflowCompleted) {
    console.log("is the workflow completed", args.isWorkflowCompleted);
    let state = args.stateNode.getContent().getDefinition();
    console.log("the state is ", state);
    if (isExited(state, args.exitedNodes)) {
      console.log("is this exited");
      let pointsToExitedState = statePointsToAnyExitedState({
        stateNode: args.stateNode,
        exitedNodes: args.exitedNodes,
        contentWindow: args.contentWindow,
      });
      console.log("the pointsToExitedState", pointsToExitedState);
      if (!pointsToExitedState) {
        console.log("this is the current node here", args.stateNode.getContent().getDefinition());
        let outConnectors = args.contentWindow?.org.kie.workbench.common.stunner.core.graph.impl.NodeImpl.outConnectors(
          args.stateNode
        );
        outConnectors
          .filter((c: any) => {
            console.log("the c in filter", c);
            return (
              c.getTargetNode().getContent().getDefinition() instanceof
              args.contentWindow?.org.kie.workbench.common.stunner.sw.definition.End
            );
          })
          .forEach((c: any) => {
            console.log("the end targets", c);
            let targetEndNode = c.getTargetNode();
            args.endNodeConsumer(targetEndNode);
          });
      }
    }
  }
};

const statePointsToAnyExitedState = (args: { stateNode: any; exitedNodes: string[]; contentWindow: any }) => {
  let c1 = args.contentWindow?.org.kie.workbench.common.stunner.core.graph.impl.NodeImpl.outConnectors(args.stateNode)
    .filter(
      (c: any) =>
        c.getTargetNode().getContent().getDefinition() instanceof
        args.contentWindow?.org.kie.workbench.common.stunner.sw.definition.State
    )
    .filter((c: any) => isExited(c.getTargetNode().getContent().getDefinition(), args.exitedNodes)).length;
  return c1 > 0;
};

export const isExited = (state: any, exitedNodes: any) => {
  return exitedNodes.includes(state.name);
};
