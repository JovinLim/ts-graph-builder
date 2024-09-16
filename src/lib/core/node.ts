import { v4 as uuidv4 } from 'uuid';
import { GraphEdge } from '.';

/**
 * Represents a node in a graph.
 */
export class GraphNode {
  /**
   * Unique identifier for the node.
   * @private
   */
  private id_: string;

  /**
   * Label of the node.
   * @private
   */
  private label_: string;

  /**
   * Identifier for the graph to which this node belongs.
   * @private
   */
  private graphId_: string;

  /**
   * Attributes of the node.
   * @private
   */
  private attributes_: Record<any, any>;

  /**
   * Array of subnodes for hierarchical graphs.
   * @private
   */
  private subnodes_: GraphNode[];

  /**
   * Array of edges connected to this node.
   * @private
   */
  private edges_: GraphEdge[];

  /**
   * Creates an instance of GraphNode.
   * 
   * @param {string} graphId - The identifier for the graph.
   * @param {string} [label=""] - The label of the node.
   * @param {Record<any, any>} [attributes={}] - Additional attributes for the node.
   * @param {GraphNode[]} [subnodes=[]] - Subnodes associated with the node.
   * @param {GraphEdge[]} [edges=[]] - Edges associated with the node.
   */
  constructor(
    graphId: string,
    label: string = "",
    attributes: Record<any, any> = {},
    subnodes: GraphNode[] = [],
    edges: GraphEdge[] = []
  ) {
    this.id_ = uuidv4();  // Assign a random UUID
    this.label_ = label;
    this.graphId_ = graphId;
    this.attributes_ = attributes;
    this.subnodes_ = subnodes;
    this.edges_ = edges;
  }

  /**
   * Gets the unique identifier of the node.
   * @returns {string} The unique identifier of the node.
   */
  get id(): string {
    return this.id_;
  }

  /**
   * Gets the label of the node.
   * @returns {string} The label of the node.
   */
  get label(): string {
    return this.label_;
  }

  /**
   * Sets the label of the node.
   * @param {string} value - The new label of the node.
   */
  set label(value: string) {
    this.label_ = value;
  }

  /**
   * Gets the identifier of the graph to which this node belongs.
   * @returns {string} The identifier of the graph.
   */
  get graphId(): string {
    return this.graphId_;
  }

  /**
   * Sets the identifier of the graph to which this node belongs.
   * @param {string} value - The new identifier of the graph.
   */
  set graphId(value: string) {
    this.graphId_ = value;
  }

  /**
   * Gets the attributes of the node.
   * @returns {Record<any, any>} The attributes of the node.
   */
  get attributes(): Record<any, any> {
    return this.attributes_;
  }

  /**
   * Sets the attributes of the node.
   * @param {Record<any, any>} value - The new attributes of the node.
   */
  set attributes(value: Record<any, any>) {
    this.attributes_ = value;
  }

  /**
   * Gets the subnodes associated with the node.
   * @returns {GraphNode[]} The subnodes associated with the node.
   */
  get subnodes(): GraphNode[] {
    return this.subnodes_;
  }

  /**
   * Sets the subnodes associated with the node.
   * @param {GraphNode[]} value - The new subnodes associated with the node.
   */
  set subnodes(value: GraphNode[]) {
    this.subnodes_ = value;
  }

  /**
   * Gets the edges associated with the node.
   * @returns {GraphEdge[]} The edges associated with the node.
   */
  get edges(): GraphEdge[] {
    return this.edges_;
  }

  /**
   * Sets the edges associated with the node.
   * @param {GraphEdge[]} value - The new edges associated with the node.
   */
  set edges(value: GraphEdge[]) {
    this.edges_ = value;
  }
}
