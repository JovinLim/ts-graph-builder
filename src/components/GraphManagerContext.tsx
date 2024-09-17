import { createContext, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Graph, GraphEdge, GraphManager, GraphNode } from "@/graph-lib/core";

// Interface defining the Graph Manager structure
export interface GraphManagerInterface {
  graphs: () => Graph[];
  currentGraph: () => Graph | undefined;
  selectedNodes: () => GraphNode[];
  selectedEdges: () => GraphEdge[];
  setGraphs: (graphs: Graph[]) => void;
  setCurrentGraph: (graph: Graph | undefined) => void;
  setSelectedNodes: (nodes: GraphNode[]) => void;
  setSelectedEdges: (edges: GraphEdge[]) => void;
  debug: () => boolean;
  setDebug: (bool : boolean) => void;
}

// Create a context to provide the GraphManager globally
const GraphManagerContext = createContext<GraphManagerInterface | undefined>(undefined);

// Custom hook to use the GraphManager context
export function useGraphManager(): GraphManagerInterface {
  const context = useContext(GraphManagerContext);
  if (!context) {
    throw new Error("useGraphManager must be used within a GraphManagerProvider");
  }
  return context;
}

// GraphManagerProvider component to provide the context to its children
export function GraphManagerProvider(props: { children: any }) {
  const [graphs, setGraphs] = createSignal<Graph[]>([]);
  const [currentGraph, setCurrentGraph] = createSignal<Graph>();
  const [selectedNodes, setSelectedNodes] = createSignal<GraphNode[]>([]);
  const [selectedEdges, setSelectedEdges] = createSignal<GraphEdge[]>([]);
  const [debug, setDebug] = createSignal<boolean>(true);

  return (
    <GraphManagerContext.Provider value={{
      graphs,
      setGraphs,
      currentGraph,
      setCurrentGraph,
      selectedNodes,
      setSelectedNodes,
      selectedEdges,
      setSelectedEdges,
      debug,
      setDebug,
    }}>
      {props.children}
    </GraphManagerContext.Provider>
  );
}