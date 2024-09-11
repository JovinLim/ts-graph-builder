import {v4 as uuidv4} from 'uuid';

export class GraphEdge {
    private id_: string;
    private label_: string;
    private graphId_: string;
    private attributes_: Record<any, any>;
    private source_: string;
    private target_: string;
  
    constructor(graphId: string, source: string, target: string, label: string = "", attributes: Record<any, any> = {}) {
      this.id_ = uuidv4();  // Assign a random UUID
      this.label_ = label;
      this.graphId_ = graphId;
      this.attributes_ = attributes;
      this.source_ = source;
      this.target_ = target;
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
  
    get source(): string {
      return this.source_;
    }
  
    set source(value: string) {
      this.source_ = value;
    }
  
    get target(): string {
      return this.target_;
    }
  
    set target(value: string) {
      this.target_ = value;
    }
}