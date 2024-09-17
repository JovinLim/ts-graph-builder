import { createSignal } from "solid-js";
import { useGraphManager } from "./GraphManagerContext";
import { Button } from "@/components/ui/button";
import { createAlert } from "./shared";
import { Graph } from "@/graph-lib/core";

const Toolbox = () => {
    const { graphs, currentGraph, setCurrentGraph } = useGraphManager();
    const [currentTool, setCurrentTool] = createSignal("");
    
    function autoEdge(){
        if (!currentGraph()){createAlert("No graph selected", "Please select a graph.");}

        const graph_ = currentGraph() as Graph;
        const edges = graph_.autoEdge();
        console.log(edges);
    }

    return (
      <div class="toolbox">
        <Button onclick={autoEdge} variant={'outline'}>Auto-Edges</Button>
      </div>
    );
  };
  
  export default Toolbox;