import { Graph } from "@/lib/core";
import CardDemo from "./CardDemo";
import CreateGraph from "./CreateGraph";
import { useGraphManager } from "./GraphManagerContext";

export default function GraphCanvas() {
    const { graphs, currentGraph, setCurrentGraph } = useGraphManager(); // Access GraphManager from the context
  
    return (
      <div class="graph-viewer-container">
        {currentGraph() ? (
          // Render content when a graph is selected
          <div>
            {/* Content for the selected graph goes here */}
            <p class="text-gray-500 text-xl">Graph Selected: {(currentGraph() as Graph).label}</p>
            {/* Add more content related to the selected graph */}
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