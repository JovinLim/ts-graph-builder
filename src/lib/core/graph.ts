import {v4 as uuidv4} from 'uuid';
import { GraphEdge, GraphNode } from '.';
import * as d3 from "d3";
import { D3Edge, D3Node} from '../draw/graphd3';
import { JSX } from 'solid-js';
import { toElement } from '@/components/Utility';

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

    public autoEdge(tolerance:number = 100): GraphEdge[] {
      this.edges = [];
      const outEdges = [] as GraphEdge[];

      var edgeCount = 0;
      if (this.nodes.length === 0) {
        return outEdges; // Return an empty array if there are no nodes
      }
    

      const calculateBoundingBox = (cornerA: [number, number], cornerB: [number, number]) => {
        const x = Math.min(cornerA[0], cornerB[0]);
        const y = Math.min(cornerA[1], cornerB[1]);
        const width = Math.abs(cornerA[0] - cornerB[0]);
        const height = Math.abs(cornerA[1] - cornerB[1]);
        return { x, y, width, height };
      };

      const nodesBoundingBoxes = this.nodes.map((node) => {
        const boundingBox = calculateBoundingBox(node.attributes.cornerA, node.attributes.cornerB);
        return { id: node.id, label: node.label, boundingBox };
      });

      const processedNodeIds = [] as string[];
      // Iterate through each node and find aligned nodes
      for (let i = 0; i < nodesBoundingBoxes.length; i++) {
        const cNode = nodesBoundingBoxes[i];
        const cNodeBox = cNode.boundingBox;

        // Iterate through each other node to check alignment
        for (let j = 0; j < nodesBoundingBoxes.length; j++) {
          const oNode = nodesBoundingBoxes[j];
          const oNodeBox = oNode.boundingBox;

          // Skip creating an edge to itself
          if (cNode.id === oNode.id || processedNodeIds.includes(oNode.id)) {
            continue;
          }
          
          // console.log(cNode)
          // console.log(oNode)
          // console.log("")

          // Check if nodes are aligned horizontally and vertically within the tolerance
          const alignedHorizontal =
            (cNodeBox.x >= oNodeBox.x && oNodeBox.x + oNodeBox.width >= cNodeBox.x) ||
            (oNodeBox.x >= cNodeBox.x && cNodeBox.x + cNodeBox.width >= oNodeBox.x) ||
            Math.abs(oNodeBox.x + oNodeBox.width - cNodeBox.x) <= tolerance ||
            Math.abs(cNodeBox.x + cNodeBox.width - oNodeBox.x) <= tolerance;

          const alignedVertical =
            (cNodeBox.y >= oNodeBox.y && oNodeBox.y + oNodeBox.height >= cNodeBox.y) ||
            (oNodeBox.y >= cNodeBox.y && cNodeBox.y + cNodeBox.height >= oNodeBox.y) ||
            Math.abs(oNodeBox.y + oNodeBox.height - cNodeBox.y) <= tolerance ||
            Math.abs(cNodeBox.y + cNodeBox.height - oNodeBox.y) <= tolerance;

          // if (cNode.label = 'n9'){
          //   console.table(cNode)
          //   console.table(oNode)
          //   console.log("Horizontal check: ",(oNodeBox.x >= cNodeBox.x && cNodeBox.x + cNodeBox.width >= oNodeBox.x))
          //   // console.log(alignedVertical)
          //   console.log('')
          // }

          // If nodes are aligned both horizontally and vertically, create an edge
          if (alignedHorizontal && alignedVertical) {
            // Check if an edge already exists between the two nodes to avoid duplicate edges
            const existingEdge = this.edges_.find(
              (edge) =>
                (edge.source === cNode.id && edge.target === oNode.id) ||
                (edge.source === oNode.id && edge.target === cNode.id)
            );

            if (!existingEdge) {
              // Create an edge with cNode as source and oNode as target
              const fEdge = new GraphEdge(this.id, `e-${edgeCount}`, cNode.label, oNode.label, { 'cat': 'ACCESS' });
              outEdges.push(fEdge);
              edgeCount++;

              // Create another edge with the roles reversed (oNode as source, cNode as target)
              const rEdge = new GraphEdge(this.id, `e-${edgeCount}`, oNode.label, cNode.label, { 'cat': 'ACCESS' });
              outEdges.push(rEdge);
              edgeCount++;
            }
          }
        }

        processedNodeIds.push(cNode.id);
      }

      return outEdges;
    }

    public graphGeometryToSVG(): SVGSVGElement {
      const graph = this;
      // Create the main SVG element
      const svg = d3.create<SVGSVGElement>("svg")
        .attr("data-type", "GraphGeometryGroup")
        // .attr("viewBox", [0, 0, width, height])
        .attr("width", "100%")
        .attr("height", "100%");

      const g = svg.append<SVGGElement>("g")
        .attr("cursor", "grab");
  
      function dragged(this: SVGRectElement, event: d3.D3DragEvent<SVGElement, any, any>, d: any) {
        d3.select(this)
          .attr("x", d.x=event.x)
          .attr("y", d.y=event.y);
      }

      function dragStarted(this: SVGRectElement, event: d3.D3DragEvent<SVGElement, any, any>, d: any) {
        d.initialX = d.x; // Store initial x position
        d.initialY = d.y; // Store initial y position

        // FOR DEBUGGING 
        // const nodeId = d3.select(this).attr("data-nodeid");
        // const node = graph.nodes.find((node) => node.id === nodeId);
        // if (node) {
        //   // Log the initial state of the node
        //   // console.log("Drag Start - Node:", JSON.stringify(node));
        //   console.table(node.attributes)
        // }

      }

      function dragEnded(this: SVGRectElement, event: d3.D3DragEvent<SVGElement, any, any>, d: any) {
        const nodeId = d3.select(this).attr("data-nodeid");
        const node = graph.nodes.find((node) => node.id === nodeId);
        if (node) {
          // Update the node's attributes with the new position
          node.attributes.cornerA[0] = (d.x - d.initialX) + node.attributes.cornerA[0];
          node.attributes.cornerA[1] = (d.y - d.initialY) + node.attributes.cornerA[1];
          node.attributes.cornerB[0] = node.attributes.cornerA[0] + node.attributes.width;
          node.attributes.cornerB[1] = node.attributes.cornerA[1] + node.attributes.depth;
      
          // Recalculate the center of the node
          node.attributes.center[0] = (node.attributes.cornerA[0] + node.attributes.cornerB[0]) / 2;
          node.attributes.center[1] = (node.attributes.cornerA[1] + node.attributes.cornerB[1]) / 2;

          // FOR DEBUGGING
          // console.log("Drag End - Node:", JSON.stringify(node));
          // console.table(node.attributes)
        }
      }

      const drag = d3.drag<SVGRectElement, any>()
                    .on("start", function (event, d) { dragStarted.call(this, event, d); })
                    .on("drag", function (event, d) { dragged.call(this, event, d); })
                    .on("end", function (event, d) { dragEnded.call(this, event, d); });
  
      // Append node geometries to the group element
      this.nodes.forEach((node) => {
        const { center, cornerA, cornerB, id, label } = node.attributes;
        try {
          if (cornerA && cornerB) {
            const rectData = { x: Math.min(cornerA[0], cornerB[0]), y: Math.min(cornerA[1], cornerB[1]) };

            // Draw a rectangle based on cornerA and cornerB coordinates
            g.append("rect")
              .datum(rectData)
              .attr("x", rectData.x)
              .attr("y", rectData.y)
              .attr("width", Math.abs(cornerA[0] - cornerB[0]))
              .attr("height", Math.abs(cornerA[1] - cornerB[1]))
              .attr("fill", "#68b2a1")
              .attr("stroke", "black")
              .attr("stroke-width", 2)
              .attr("data-nodeid", node.id)
              .call(drag); // Apply the drag behavior
          }
        } catch (error) {
          console.error(`Error drawing node ${node.id}:`, error);
        }
      });

      // DEBUG RECT
      // g.append("rect")
      // .attr("x", 0)
      // .attr("y", 0)
      // .attr("width", 70)
      // .attr("height", 70)
      // .attr("fill", "#68b2a1")
      // .attr("stroke", "black")
      // .attr("stroke-width", 2)
      // .call(drag);

      // console.log(svg.node())
      return svg.node() as SVGSVGElement; // Return the SVG node to be appended to a div
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
  