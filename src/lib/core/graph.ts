import {v4 as uuidv4} from 'uuid';
import { GraphEdge, GraphNode } from '.';
import * as d3 from "d3";
import { D3Edge, D3Node } from '../draw/graphd3';

export class Graph {
    private id_: string;
    private label_: string;
    private attributes_: Record<any, any>;
    private nodes_: GraphNode[];
    private edges_: GraphEdge[];
    

    constructor(label: string = "", attributes: Record<any, any> = {}, nodes: GraphNode[] = [], edges: GraphEdge[] = []) {
      this.id_ = uuidv4().toString();
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

    public graphToD3(): SVGSVGElement {
      // Convert nodes and edges to D3-compatible format
      const d3Nodes: D3Node[] = this.nodes.map((node) => ({
        id: node.id,
        label: node.label,
        graphId: node.graphId,
        attributes: node.attributes,
      }));
    
      const d3Edges: D3Edge[] = this.edges.map((edge) => {
        // Find source and target nodes by their IDs
        const sourceNode = d3Nodes.find((node) => node.label === edge.source);
        const targetNode = d3Nodes.find((node) => node.label === edge.target);
    
        if (!sourceNode || !targetNode) {
          console.error(`Error: Node not found for edge ${edge.id}. Source: ${edge.source}, Target: ${edge.target}`);
        }
    
        return {
          id: edge.id,
          label: edge.label,
          source: sourceNode!,
          target: targetNode!,
          attributes: edge.attributes,
        };
      });
      
      // Set up D3 graph
      const width = 800;
      const height = 600;
    
      // Create an SVG element
      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        // .attr("style", "border: 1px solid lightgray");
    
      // Create a simulation for positioning nodes
      const simulation = d3
        .forceSimulation<D3Node>(d3Nodes) // Correct type here
        .force("link", d3.forceLink<D3Node, D3Edge>(d3Edges).id((d) => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));
    
      // Draw edges (links)
      const link = svg
        .selectAll(".link")
        .data(d3Edges)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "#999")
        .style("stroke-width", 2)
        .on("click", (event, d) => {
          console.log("Edge properties:", d.attributes); // Log edge properties on click
        });
    
      // Draw nodes
      const node = svg
        .selectAll(".node")
        .data(d3Nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 10) // Set radius for the nodes
        .style("fill", "#69b3a2")
        .on("click", (event, d) => {
          console.log("Node properties:", d.attributes); // Log node properties on click
        });
    
      // Add labels to nodes
      svg
        .selectAll(".label")
        .data(d3Nodes)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text((d) => d.label);
    
      // Update simulation on each tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d) => (typeof d.source === "object" ? d.source.x! : 0))
          .attr("y1", (d) => (typeof d.source === "object" ? d.source.y! : 0))
          .attr("x2", (d) => (typeof d.target === "object" ? d.target.x! : 0))
          .attr("y2", (d) => (typeof d.target === "object" ? d.target.y! : 0));
    
        node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    
        svg
          .selectAll(".label")
          .attr("x", (d:any) => d.x! + 15)
          .attr("y", (d:any) => d.y! + 5);
      });
    
      return svg.node() as SVGSVGElement; // Return the SVG node to be appended to a div
    }
}
  