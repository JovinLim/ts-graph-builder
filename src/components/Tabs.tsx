import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { useGraphManager } from "./GraphManagerContext";
import { Graph } from "@/graph-lib/core";

const Tabs = () => {
    const { graphs, currentGraph, setCurrentGraph } = useGraphManager();
    const [currentTab, setCurrentTab] = createSignal(currentGraph()?.id ? currentGraph()?.id : "");
    const [shownTabs, setShownTabs] = createSignal<string[]>([]);
  
    const handleTabClick = (graphId: string) => {
      setCurrentTab(graphId); // Update the current tab
      setCurrentGraph(graphs().find(g => g.id == graphId));
    };

    const closeTab = (graphId:string) => {

    }

    createEffect(() => {
      
    })

    return (
      <div class="tabs-bar">
        {graphs().map((graph:Graph) => (
          <div
            data-graphid={graph.id}
            class={`tab ${
              currentGraph()?.id == graph.id
                ? "bg-gray-300" // Slightly darker shade for active tab
                : "bg-transparent"
            } hover:bg-gray-100`}
            onClick={() => handleTabClick(graph.id)}
          >
            {graph.label || "Untitled Graph"}
            <button class='font-base' onclick={() => closeTab(graph.id)}>x</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default Tabs;