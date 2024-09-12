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
import { createSignal } from "solid-js";
import { useGraphManager } from "./GraphManagerContext";
import { Graph, GraphEdge, GraphNode, parseGraphJSON } from "@/lib/core";
import FileUploadBox from "./FileUploadBox";
import { debugUtils } from "./Utility";
import { uploadedFile } from "./shared";

const CreateGraph = () => {
    const {graphs, setGraphs, currentGraph, setCurrentGraph, debug} = useGraphManager();
    const [isOpen, setIsOpen] = createSignal(true);

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
            });
        }
        setGraphs([...graphs(), graph]);
        setCurrentGraph(graph);
        setIsOpen(false);

        // Debug
        console.log(nodes_[0]);
        console.log(edges_[0]);
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
					<Button onclick={onCreateGraph} type="submit">Save Graph</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default CreateGraph;