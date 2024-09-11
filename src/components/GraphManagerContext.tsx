import { createContext, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Graph, GraphEdge, GraphManager, GraphNode } from "@/lib/core";

// Interface defining the Graph Manager structure
export interface GraphManagerInterface {
  graphs: () => Graph[]; // Reactive getter function for graphs
  currentGraph: () => Graph | undefined; // Reactive getter function for current graph
  selectedNodes: () => GraphNode[]; // Reactive getter function for selected nodes
  selectedEdges: () => GraphEdge[]; // Reactive getter function for selected edges
  setGraphs: (graphs: Graph[]) => void; // Setter function for graphs
  setCurrentGraph: (graph: Graph | undefined) => void; // Setter function for current graph
  setSelectedNodes: (nodes: GraphNode[]) => void; // Setter function for selected nodes
  setSelectedEdges: (edges: GraphEdge[]) => void; // Setter function for selected edges
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

  return (
    <GraphManagerContext.Provider value={{
      graphs,
      setGraphs,
      currentGraph,
      setCurrentGraph,
      selectedNodes,
      setSelectedNodes,
      selectedEdges,
      setSelectedEdges
    }}>
      {props.children}
    </GraphManagerContext.Provider>
  );
}