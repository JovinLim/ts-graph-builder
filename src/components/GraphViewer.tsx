import { Graph, GraphEdge, GraphNode } from "@/lib/graph-core";
import { useGraphManager } from "./GraphManagerContext";
import CardDemo from "./CardDemo";
import CreateGraph from "./CreateGraphSheet";
import { onMount } from "solid-js";

export default function GraphViewer() {
    const {currentGraph, setGraphs, setCurrentGraph, graphs} = useGraphManager();

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

    return (
        <div class="flex w-full h-full items-center justify-center">
          {currentGraph() ? (
            <div>
                {/* {(currentGraph() as Graph).graphToD3()} */}
            </div>
          ) : (
            // Render placeholder text when no graph is selected
            <div class="graph-viewer-btn-container">
              <p class="text-gray-500 text-2xl">Graph Viewer</p>
              <p class="text-gray-500 text-xl">No graph chosen</p>
              <CreateGraph />
            </div>
          )}
        </div>
      );

      // return (
      //   <button onclick={() => {console.log('test')}} >test</button>
      // );
}