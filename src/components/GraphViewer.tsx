import { Graph, GraphEdge, GraphNode } from "@/lib/core";
import { useGraphManager } from "./GraphManagerContext";
import CardDemo from "./CardDemo";
import CreateGraph from "./CreateGraph";

export default function GraphViewer() {
    const {currentGraph} = useGraphManager();
  
    if (!currentGraph) {
      // If no graph is selected, show placeholder text
      return (
        <div class="graph-viewer-btn-container">
          <p class="text-gray-500 text-xl">No graph chosen</p>
        </div>
      );
    }

    return (
        <div class="graph-viewer-container">
          {currentGraph() ? (
            <div>
            <h2 class="text-xl font-base mb-4">Graph Viewer</h2>
            {/* Display nodes */}
            <ul>
                {(currentGraph() as Graph).nodes.map((node) => (
                <li>{node.label}</li>
                ))}
            </ul>

            {/* Display edges */}
            <ul>
                {(currentGraph() as Graph).edges.map((edge) => (
                <li>
                    {edge.source} - {edge.target}
                </li>
                ))}
            </ul>
            </div>
          ) : (
            // Render placeholder text when no graph is selected
            <div class="graph-viewer-btn-container">
              <p class="text-gray-500 text-xl">No graph chosen</p>
              <CreateGraph />
            </div>
          )}
        </div>
      );
}