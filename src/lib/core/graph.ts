import {v4 as uuidv4} from 'uuid';
import { GraphEdge, GraphNode } from '.';

export class Graph {
    private id_: string;
    private label_: string;
    private attributes_: Record<any, any>;
    private nodes_: GraphNode[];
    private edges_: GraphEdge[];
    

    constructor(label: string = "", attributes: Record<any, any> = {}, nodes: GraphNode[] = [], edges: GraphEdge[] = []) {
      this.id_ = uuidv4();  // Assign a random UUID
      this.label_ = label;  
      this.attributes_ = attributes;
      this.nodes_ = nodes;
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
  
    get attributes(): Record<any, any> {
      return this.attributes_;
    }
  
    set attributes(value: Record<any, any>) {
      this.attributes_ = value;
    }
  
    get nodes(): GraphNode[] {
      return this.nodes_;
    }
  
    set nodes(value: GraphNode[]) {
      this.nodes_ = value;
    }
  
    get edges(): GraphEdge[] {
      return this.edges_;
    }
  
    set edges(value: GraphEdge[]) {
      this.edges_ = value;
    }
}
  