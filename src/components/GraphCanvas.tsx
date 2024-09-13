import { Graph } from "@/lib/core";
import CreateGraph from "./CreateGraphSheet";
import { useGraphManager } from "./GraphManagerContext";
import { createEffect } from "solid-js";
import * as d3 from 'd3';

export default function GraphCanvas() {
    const { graphs, currentGraph, setCurrentGraph } = useGraphManager(); // Access GraphManager from the context

    async function parseGraphJSON(jsonFile: File): Promise<{ nodes: any[]; edges: any[] }> {
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
    
        reader.readAsText(jsonFile); // Read the file as text
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

        // Set the viewBox to fit the bounding box
        // svg.attr("viewBox", `${x} ${y} ${bboxWidth} ${bboxHeight}`);
        
        // // Adjust zoom to fit the bounding box initially
        // const svgWidth = svg.node()?.clientWidth || 800; // Fallback to default width if not available
        // const svgHeight = svg.node()?.clientHeight || 600; // Fallback to default height if not available
        
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