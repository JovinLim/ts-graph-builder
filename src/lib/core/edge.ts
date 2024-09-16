import { v4 as uuidv4 } from 'uuid';

/**
 * Represents an edge in a graph.
 */
export class GraphEdge {
  /**
   * Unique identifier for the edge.
   * @private
   */
  private id_: string;

  /**
   * Label of the edge.
   * @private
   */
  private label_: string;

  /**
   * Identifier for the graph to which this edge belongs.
   * @private
   */
  private graphId_: string;

  /**
   * Attributes of the edge.
   * @private
   */
  private attributes_: Record<any, any>;

  /**
   * Source node identifier for the edge.
   * @private
   */
  private source_: string;

  /**
   * Target node identifier for the edge.
   * @private
   */
  private target_: string;

  /**
   * Creates an instance of GraphEdge.
   * 
   * @param {string} graphId - The identifier for the graph.
   * @param {string} [label=""] - The label of the edge.
   * @param {string} source - The source node identifier.
   * @param {string} target - The target node identifier.
   * @param {Record<any, any>} [attributes={}] - Additional attributes for the edge.
   */
  constructor(
    graphId: string,
    label: string = "",
    source: string,
    target: string,
    attributes: Record<any, any> = {}
  ) {
    this.id_ = uuidv4();  // Assign a random UUID
    this.label_ = label;
    this.graphId_ = graphId;
    this.attributes_ = attributes;
    this.source_ = source;
    this.target_ = target;
  }

  /**
   * Gets the unique identifier of the edge.
   * @returns {string} The unique identifier of the edge.
   */
  get id(): string {
    return this.id_;
  }

  /**
   * Gets the label of the edge.
   * @returns {string} The label of the edge.
   */
  get label(): string {
    return this.label_;
  }

  /**
   * Sets the label of the edge.
   * @param {string} value - The new label of the edge.
   */
  set label(value: string) {
    this.label_ = value;
  }

  /**
   * Gets the identifier of the graph to which this edge belongs.
   * @returns {string} The identifier of the graph.
   */
  get graphId(): string {
    return this.graphId_;
  }

  /**
   * Sets the identifier of the graph to which this edge belongs.
   * @param {string} value - The new identifier of the graph.
   */
  set graphId(value: string) {
    this.graphId_ = value;
  }

  /**
   * Gets the attributes of the edge.
   * @returns {Record<any, any>} The attributes of the edge.
   */
  get attributes(): Record<any, any> {
    return this.attributes_;
  }

  /**
   * Sets the attributes of the edge.
   * @param {Record<any, any>} value - The new attributes of the edge.
   */
  set attributes(value: Record<any, any>) {
    this.attributes_ = value;
  }

  /**
   * Gets the source node identifier of the edge.
   * @returns {string} The source node identifier.
   */
  get source(): string {
    return this.source_;
  }

  /**
   * Sets the source node identifier of the edge.
   * @param {string} value - The new source node identifier.
   */
  set source(value: string) {
    this.source_ = value;
  }

  /**
   * Gets the target node identifier of the edge.
   * @returns {string} The target node identifier.
   */
  get target(): string {
    return this.target_;
  }

  /**
   * Sets the target node identifier of the edge.
   * @param {string} value - The new target node identifier.
   */
  set target(value: string) {
    this.target_ = value;
  }
}
