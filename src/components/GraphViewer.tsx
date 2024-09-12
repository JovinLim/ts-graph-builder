import { Graph, GraphEdge, GraphNode } from "@/lib/core";
import { useGraphManager } from "./GraphManagerContext";
import CardDemo from "./CardDemo";
import CreateGraph from "./CreateGraph";

export default function GraphViewer() {
    const {currentGraph} = useGraphManager();

    return (
        <div class="graph-viewer-container">
          {currentGraph() ? (
            <div>
                {(currentGraph() as Graph).graphToD3()}
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
}