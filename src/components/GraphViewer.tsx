import { Graph, GraphEdge, GraphNode } from "@/lib/core";
import { useGraphManager } from "./GraphManagerContext";
import CardDemo from "./CardDemo";
import CreateGraph from "./CreateGraphSheet";
import { onMount } from "solid-js";

export default function GraphViewer() {
    const {currentGraph, debug, setGraphs, setCurrentGraph, graphs} = useGraphManager();

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

    onMount(async () => {
      if (debug()) {
        // Fetch the file from the /public folder
        try {
        // const response = await fetch("/test_geometry.json"); // Fetch the file from the public folder
        const response = await fetch("/test_unitgraph.json"); // Fetch the file from the public folder
        if (!response.ok) {
          throw new Error("Failed to fetch the file");
        }
      
        const blob = await response.blob(); // Convert response to Blob
        const file = new File([blob], "test_geometry.json", { type: blob.type }); // Create a File object from Blob
        const graph = new Graph("debug");
        const nodes_ = [] as GraphNode[];
        const edges_ = [] as GraphEdge[];

        if (file){
            await parseGraphJSON(file as File).then(result => {
                const { nodes, edges } = result
                const nodeKeys = Object.keys(nodes);
                const edgeKeys = Object.keys(edges);

                for (let n=0; n<nodeKeys.length; n++){
                    const nodeKey = nodeKeys[n];
                    const nodeData = nodes[nodeKey as keyof typeof nodes];
                    nodes_.push(new GraphNode(graph.id, nodeKey, nodeData));
                }

                for (let e=0; e<edgeKeys.length; e++){
                    const edgeKey = edgeKeys[e];
                    const edgeData = edges[edgeKey as keyof typeof edges];
                    const edgeAttr = {'cat':edgeData.cat}
                    edges_.push(new GraphEdge(graph.id, edgeKey, edgeData.source, edgeData.target, edgeAttr));
                }

                graph.nodes = nodes_;
                graph.edges = edges_;


        // Debug
        console.log(nodes_[0]);
        console.log(edges_[0]);
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