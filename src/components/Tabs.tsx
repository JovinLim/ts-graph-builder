import { createSignal, onCleanup, onMount } from "solid-js";
import { useGraphManager } from "./GraphManagerContext";
import { Graph } from "@/lib/core";

const Tabs = () => {
    const { graphs, currentGraph, setCurrentGraph } = useGraphManager();
    const [currentTab, setCurrentTab] = createSignal(currentGraph()?.id ? currentGraph()?.id : "");
  
    const handleTabClick = (graphId: string) => {
      setCurrentTab(graphId); // Update the current tab
      setCurrentGraph(graphs().find(g => g.id == graphId));
    };

    return (
      <div class="tabs-bar">
        {graphs().map((graph:Graph) => (
          <button
            data-graphid={graph.id}
            class={`tab ${
              currentGraph()?.id == graph.id
                ? "bg-gray-300" // Slightly darker shade for active tab
                : "bg-transparent"
            } hover:bg-gray-100`}
            onClick={() => handleTabClick(graph.id)}
          >
            {graph.label || "Untitled Graph"}
            <p class='font-base'>x</p>
          </button>
        ))}
      </div>
    );
  };
  
  export default Tabs;