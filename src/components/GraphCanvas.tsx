import { Graph, GraphEdge, GraphNode } from "@/graph-lib/core";
import CreateGraph from "./CreateGraphSheet";
import { useGraphManager } from "./GraphManagerContext";
import { createEffect, onMount } from "solid-js";
import * as d3 from 'd3';
import { debug } from "./Constants";

export default function GraphCanvas() {
    const { graphs, currentGraph, setCurrentGraph, setGraphs } = useGraphManager(); // Access GraphManager from the context

    async function parseGraphJSON(blob: Blob): Promise<{ nodes: any[]; edges: any[] }> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          try {
            const jsonData = JSON.parse(reader.result as string); // Parse the file content as JSON
    
            // Check if "nodes" and "edges" exist in the parsed data
            const nodes = jsonData.nodes ?? {}; // Extract "nodes" object or default to an empty object
            const edges = jsonData.edges ?? {}; // Extract "edges" object or default to an empty object
    
            // Check if conversion resulted in arrays
            if (!(nodes instanceof Object) || !(edges instanceof Object)) {
              throw new Error("Invalid JSON structure: 'nodes' or 'edges' is not an object");
            }
    
            resolve({ nodes, edges }); // Resolve the Promise with the nodes and edges arrays
          } catch (error) {
            console.error("Error parsing JSON:", error);
            reject(new Error("Failed to parse JSON file"));
          }
        };
    
        reader.onerror = () => {
          console.error("Error reading file:", reader.error);
          reject(new Error("Error reading file"));
        };
    
        reader.readAsText(blob); // Read the Blob as text
      });
    }

    createEffect(() => {
      const graph = currentGraph(); // Get the current graph
      const container = document.getElementById("graph-canvas");
  
      if (graph && container) {
        const svgElement = (graph as Graph).graphGeometryToSVG();
        container.innerHTML = ""; // Clear previous content
        container.appendChild(svgElement); // Append the generated SVG
  
        // After appending the SVG, adjust the zoom and viewBox to fit all elements
        adjustZoomToFit(container);
      }
    });

    const adjustZoomToFit = (container: HTMLElement) => {
      // Select the SVG with data-type="GraphGeometryGroup"
      const svg = d3.select<SVGSVGElement, unknown>('svg[data-type="GraphGeometryGroup"]');
      const g = svg.select<SVGGElement>("g");
      const parentWidth = container.clientWidth;
      const parentHeight = container.clientHeight;

      // Calculate the bounding box of the 'g' element
      const bbox = g.node()?.getBBox();
      if (bbox) {
        const { x, y, width: bboxWidth, height: bboxHeight } = bbox;
        
        var midX = x + (bboxWidth/2);
        var midY = y + (bboxHeight/2);

        if (bboxWidth == 0 || bboxHeight == 0) {return}
        
        // const scale = (0.75) / Math.min(svgWidth / bboxWidth, svgHeight / bboxHeight); // Calculate scale to fit
        const scale = (0.75) / Math.min(bboxWidth / parentWidth, bboxHeight / parentHeight); // Calculate scale to fit
        const translateX = parentWidth/2 - (scale*midX); // Centering translation
        const translateY = parentHeight/2 - (scale*midY); // Centering translation
  
        const zoom = d3.zoom<SVGSVGElement, unknown>()
          // .scaleExtent([0.5, 5]) // Scale extent for zooming
          .on("zoom", (event) => {
            g.attr("transform", event.transform);
          });
        svg.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scale)); // Apply initial zoom
        svg.call(zoom); // Reapply zoom behavior to allow future interactions
      }
    };

    onMount(async () => {
      if (debug()) {
        // Fetch the file from the /public folder
        try {
          const response = await fetch("/test_geometry.json");
          // const response = await fetch("/test_unitgraph.json");
          if (!response.ok) {
            throw new Error("Failed to fetch the file");
          }
    
          const blob = await response.blob(); // Convert response to Blob
    
          const graph = new Graph("debug");
          const nodes_ = [] as GraphNode[];
          const edges_ = [] as GraphEdge[];
    
          if (blob) {
            await parseGraphJSON(blob).then((result) => {
              const { nodes, edges } = result;
              const nodeKeys = Object.keys(nodes);
              const edgeKeys = Object.keys(edges);
    
              for (let n = 0; n < nodeKeys.length; n++) {
                const nodeKey = nodeKeys[n];
                const nodeData = nodes[nodeKey as keyof typeof nodes];
                nodes_.push(new GraphNode(graph.id, nodeKey, nodeData));
              }
              graph.nodes = nodes_;
    
              // If you want to parse the edges, uncomment this part:
              /*
              for (let e = 0; e < edgeKeys.length; e++) {
                const edgeKey = edgeKeys[e];
                const edgeData = edges[edgeKey as keyof typeof edges];
                const edgeAttr = { cat: edgeData.cat };
                edges_.push(new GraphEdge(graph.id, edgeKey, edgeData.source, edgeData.target, edgeAttr));
              }
              graph.edges = edges_;
              */
            });
          }
    
          setGraphs([...graphs(), graph]);
          setCurrentGraph(graph);
        } catch (error) {
          console.error("Error fetching or setting file:", error);
        }
      }
    });

    return (
      <div class="flex w-full h-full items-center justify-center">
        {currentGraph() ? (
          <div id="graph-canvas" class="graph-svg-container" style="overflow: hidden; width: 100%; height: 100%;"></div>
        ) : (
          // Render placeholder text when no graph is selected
          <div class="graph-viewer-btn-container">
            <p class="text-gray-500 text-2xl">Graph Canvas</p>
            <p class="text-gray-500 text-xl">No graph chosen</p>
            <CreateGraph />
            {/* <CardDemo/> */}
          </div>
        )}
      </div>
    );
}