import type { DialogTriggerProps } from "@kobalte/core/dialog";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "@/components/ui/textfield";
import { Button } from "@/components/ui/button";
import { createSignal, onMount, Show } from "solid-js";
import { useGraphManager } from "./GraphManagerContext";
import { Graph, GraphEdge, GraphNode } from "@/lib/core";
import FileUploadBox from "./FileUploadBox";
import { debugUtils } from "./Utility";
import { setUploadedFile, uploadedFile } from "./shared";

export default function CreateGraphSheet() {
    const {graphs, setGraphs, currentGraph, setCurrentGraph, debug} = useGraphManager();
    const [isOpen, setIsOpen] = createSignal(false);

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
	  
    async function onCreateGraph() {
        const nameInput_ = document.getElementById('create-graph-name-input') as HTMLInputElement;
        const name_ = nameInput_.value ? nameInput_.value : "";
        const graph = new Graph(name_);
        const nodes_ = [] as GraphNode[];
        const edges_ = [] as GraphEdge[];

        if (uploadedFile()){
            await parseGraphJSON(uploadedFile() as File).then(result => {
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
		setIsOpen(false);
    }

	return (
		<Sheet open={isOpen()} onOpenChange={setIsOpen}>
			<SheetTrigger
				as={(props: DialogTriggerProps) => (
					<Button variant="outline" {...props}>
						Create graph
					</Button>
				)}
			/>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create Graph</SheetTitle>
					<SheetDescription>
						Give your graph a name. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
				<div class="grid gap-4 py-4 w-full">
					<TextFieldRoot class="flex flex-row items-center">
						<TextFieldLabel class="text-left w-1/5">Name</TextFieldLabel>
						<TextField id='create-graph-name-input' class="w-4/5" value={debug() ? debugUtils.graphName : ""}/>
					</TextFieldRoot>
                    <FileUploadBox/>
				</div>
				<SheetFooter>
					<Button id="creategraph-submit" onclick={onCreateGraph} type="submit">Save Graph</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);

	// return (
	// 	<button onclick={() => {console.log('test')}} >test</button>
	// );
};