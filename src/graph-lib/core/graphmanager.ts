import { v4 as uuidv4 } from 'uuid';  // Importing uuid for unique ID generation
import { Graph, GraphEdge, GraphNode } from '.';

/**
 * Interface defining the Graph Manager structure.
 */
export interface GraphManagerInterface {
  /**
   * Array of graphs managed by the GraphManager.
   */
  graphs: Graph[];
  
  /**
   * Currently active graph.
   */
  currentGraph: Graph | undefined;
  
  /**
   * Array of selected nodes.
   */
  selectedNodes: GraphNode[];
  
  /**
   * Array of selected edges.
   */
  selectedEdges: GraphEdge[];
  
  /**
   * Unique identifier for the GraphManager.
   */
  id: string;
}

/**
 * GraphManager class implementing the GraphManagerInterface.
 */
export class GraphManager implements GraphManagerInterface {
  /**
   * Array of graphs managed by the GraphManager.
   * @private
   */
  private graphs_: Graph[] = [];

  /**
   * Currently active graph.
   * @private
   */
  private currentGraph_: Graph | undefined = undefined;

  /**
   * Array of selected nodes.
   * @private
   */
  private selectedNodes_: GraphNode[] = [];

  /**
   * Array of selected edges.
   * @private
   */
  private selectedEdges_: GraphEdge[] = [];

  /**
   * Unique identifier for the GraphManager.
   * @private
   */
  private id_: string;

  /**
   * Creates an instance of GraphManager.
   */
  constructor() {
    this.id_ = uuidv4();  // Generate a unique ID for the GraphManager instance
  }

  /**
   * Gets the array of graphs managed by the GraphManager.
   * @returns {Graph[]} The array of graphs.
   */
  get graphs(): Graph[] {
    return this.graphs_;
  }

  /**
   * Sets the array of graphs managed by the GraphManager.
   * @param {Graph[]} value - The new array of graphs.
   */
  set graphs(value: Graph[]) {
    this.graphs_ = value;
  }

  /**
   * Gets the currently active graph.
   * @returns {Graph | undefined} The currently active graph.
   */
  get currentGraph(): Graph | undefined {
    return this.currentGraph_;
  }

  /**
   * Sets the currently active graph.
   * @param {Graph | undefined} value - The new active graph.
   */
  set currentGraph(value: Graph | undefined) {
    this.currentGraph_ = value;
  }

  /**
   * Gets the array of selected nodes.
   * @returns {GraphNode[]} The array of selected nodes.
   */
  get selectedNodes(): GraphNode[] {
    return this.selectedNodes_;
  }

  /**
   * Sets the array of selected nodes.
   * @param {GraphNode[]} value - The new array of selected nodes.
   */
  set selectedNodes(value: GraphNode[]) {
    this.selectedNodes_ = value;
  }

  /**
   * Gets the array of selected edges.
   * @returns {GraphEdge[]} The array of selected edges.
   */
  get selectedEdges(): GraphEdge[] {
    return this.selectedEdges_;
  }

  /**
   * Sets the array of selected edges.
   * @param {GraphEdge[]} value - The new array of selected edges.
   */
  set selectedEdges(value: GraphEdge[]) {
    this.selectedEdges_ = value;
  }

  /**
   * Gets the unique identifier of the GraphManager.
   * @returns {string} The unique identifier.
   */
  get id(): string {
    return this.id_;
  }
}
