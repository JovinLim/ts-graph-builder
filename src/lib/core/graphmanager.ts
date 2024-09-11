import { v4 as uuidv4 } from 'uuid';  // Importing uuid for unique ID generation
import { Graph, GraphEdge, GraphNode } from '.';

// Interface defining the Graph Manager structure
export interface GraphManagerInterface {
  graphs: Graph[];
  currentGraph: Graph|undefined;
  selectedNodes: GraphNode[];
  selectedEdges: GraphEdge[];
  id: string;
}

// GraphManager class implementing the interface
export class GraphManager implements GraphManagerInterface {
  private graphs_: Graph[] = [];
  private currentGraph_: Graph|undefined = undefined;
  private selectedNodes_: GraphNode[] = [];
  private selectedEdges_: GraphEdge[] = [];
  private id_: string;

  constructor(
  ) {
    this.id_ = uuidv4();  // Generate a unique ID for the GraphManager instance
  }

  // Getters and Setters
  get graphs(): Graph[] {
    return this.graphs_;
  }

  set graphs(value: Graph[]) {
    this.graphs_ = value;
  }

  get currentGraph(): Graph | undefined {
    return this.currentGraph_;
  }

  set currentGraph(value: Graph|undefined) {
    this.currentGraph_ = value;
  }

  get selectedNodes(): GraphNode[] {
    return this.selectedNodes_;
  }

  set selectedNodes(value: GraphNode[]) {
    this.selectedNodes_ = value;
  }

  get selectedEdges(): GraphEdge[] {
    return this.selectedEdges_;
  }

  set selectedEdges(value: GraphEdge[]) {
    this.selectedEdges_ = value;
  }

  get id(): string {
    return this.id_;
  }
}