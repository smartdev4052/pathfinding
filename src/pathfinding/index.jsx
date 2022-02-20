import React, { useRef, useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  updateEdge,
  Controls,
  removeElements,
  isEdge,
} from "react-flow-renderer";
import Sidebar from "./components/sidebar";
import exampleGraph, {
  nodeSourcePosition,
  nodeTargetPosition,
  edgeLabelBgStyle,
  edgeLabelBgBorderRadius,
  edgeType,
  edgeArrowHeadType,
  edgeLabelBgPadding,
} from "./data/exampleGraph";
import { getGraph } from "./graph/graph";
import {
  getAllEdges,
  updateStyleEdges,
  getEdgeShortestPath,
  updateWeightEdge,
} from "./graph/edges";
import localforage from "localforage";
import { getAllNodes, updateNodeStyle, getNodesVisited } from "./graph/nodes";
import Dijkstra from "./algorithms/dijkstra";
import "./components/sidebar.css";

localforage.config({
  name: "pathfinding",
  storeName: "graph",
});

// programmatically increment id of Nodes
let id = 8;
const getId = () => `${++id}`;

const Pathfinding = () => {
  const [elements, setElements] = useState(exampleGraph);
  const [results, setResults] = useState();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) =>
    setElements((els) =>
      addEdge(
        {
          ...params,
          label: "1",
          arrowHeadType: edgeArrowHeadType,
          type: edgeType,
          labelBgPadding: edgeLabelBgPadding,
          labelBgBorderRadius: edgeLabelBgBorderRadius,
          labelBgStyle: edgeLabelBgStyle,
        },
        els
      )
    );

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
    _reactFlowInstance.fitView();
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      sourcePosition: nodeSourcePosition,
      targetPosition: nodeTargetPosition,
      position,
      data: {
        label: id,
      },
    };

    setElements((es) => es.concat(newNode));
  };

  const onElementClick = (event, element) => {
    event.preventDefault();
    if (isEdge(element)) {
      document.getElementById("source").value = element.source;
      document.getElementById("target").value = element.target;
      document.getElementById("weight").value = "";
      document.getElementById("weight").focus();
    }
  };

  useEffect(() => {
    /*const restoreFlow = async () => {
      const graph = await localforage.getItem("graph");
      if (graph) {
        setElements(graph || []);
      }
    };
    restoreFlow();*/
  }, []);

  return (
    <div className="dndflow" style={{ height: "100%", width: "100%" }}>
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{
            height:
              window.innerWidth <= 820
                ? window.innerHeight * 0.5
                : window.innerHeight,
            width: window.innerWidth,
          }}
        >
          <ReactFlow
            elements={elements}
            onElementClick={onElementClick}
            snapToGrid={true}
            onEdgeUpdate={onEdgeUpdate}
            snapGrid={[15, 15]}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Background gap={15} variant="lines" />
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar
          delete={() => {
            //delete all edges
            setElements(getAllNodes(elements));
          }}
          calculate={() => {
            //prompt
            let startNode = prompt("start Node:");
            let endNode = prompt("End Node:");

            //reset all the animations
            let nelements = elements;
            getAllEdges(nelements).forEach((e) => {
              nelements = updateStyleEdges(e, "#b1b1b7", false, nelements);
            });
            getAllNodes(nelements).forEach((e) => {
              nelements = updateNodeStyle(e, "black", nelements);
            });

            // customize nodes visited
            getNodesVisited(
              nelements,
              Dijkstra(getGraph(elements), startNode, endNode).visited
            ).forEach((e) => {
              nelements = updateNodeStyle(e, "blue", nelements);
            });

            // animate edges of shortest path
            getEdgeShortestPath(
              nelements,
              Dijkstra(getGraph(nelements), startNode, endNode).path
            ).forEach((e) => {
              nelements = updateStyleEdges(e, "red", true, nelements);
            });

            //display results
            setResults(Dijkstra(getGraph(nelements), startNode, endNode));

            setElements(nelements);
          }}
          updateWeight={() => {
            let source = document.getElementById("source").value;
            let target = document.getElementById("target").value;
            let weight = document.getElementById("weight").value;
            if ((source, target, weight)) {
              setElements(updateWeightEdge(source, target, weight, elements));
            }
          }}
          save={() => {
            const graph = elements;
            localforage.setItem("graph", graph);
            alert("Graph Saved");
          }}
          reset={() => {
            let result = window.confirm("Want to restore default graph?");
            if (result) {
              localforage.removeItem("graph");
              setElements(exampleGraph);
            }
          }}
          results={results}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default Pathfinding;
