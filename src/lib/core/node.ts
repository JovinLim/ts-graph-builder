import {v4 as uuidv4} from 'uuid';
import { GraphEdge } from '.';

export class GraphNode {
    private id_: string;
    private label_: string;
    private graphId_: string;
    private attributes_: Record<any, any>;
    private subnodes_: GraphNode[];
    private edges_: GraphEdge[];
  
    constructor(graphId: string, label: string = "", attributes: Record<any, any> = {}, subnodes: GraphNode[] = [], edges: GraphEdge[] = []) {
      this.id_ = uuidv4();  // Assign a random UUID
      this.label_ = label;
      this.graphId_ = graphId;  
      this.attributes_ = attributes;
      this.subnodes_ = subnodes;
      this.edges_ = edges;
    }
  
    // Getters and Setters
    get id(): string {
      return this.id_;
    }
  
    get label(): string {
      return this.label_;
    }
  
    set label(value: string) {
      this.label_ = value;
    }
  
    get graphId(): string {
      return this.graphId_;
    }
  
    set graphId(value: string) {
      this.graphId_ = value;
    }
  
    get attributes(): Record<any, any> {
      return this.attributes_;
    }
  
    set attributes(value: Record<any, any>) {
      this.attributes_ = value;
    }
  
    get subnodes(): GraphNode[] {
      return this.subnodes_;
    }
  
    set subnodes(value: GraphNode[]) {
      this.subnodes_ = value;
    }
  
    get edges(): GraphEdge[] {
      return this.edges_;
    }
  
    set edges(value: GraphEdge[]) {
      this.edges_ = value;
    }
}