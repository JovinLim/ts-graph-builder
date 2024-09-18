import type { DialogTriggerProps } from "@kobalte/core/dialog";
import { Button } from "@/components/ui/button";
import { createSignal } from "solid-js";
import { useGraphManager } from "./GraphManagerContext";
import { Graph, GraphEdge, GraphNode, parseGraphJSON } from "@/graph-lib/core";
import { uploadedFile } from "./shared";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Switch,
	SwitchControl,
	SwitchThumb,
} from "@/components/ui/switch";
import { For } from "solid-js";

const CreateGraphCard = () => {
    const {graphs, setGraphs, currentGraph, setCurrentGraph} = useGraphManager();
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
		<Card class="w-[400px]">
			<CardHeader>
				<CardTitle>Create Graph</CardTitle>
				<CardDescription>Enter your graph properties. Click save when you're done</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<div class=" flex items-center space-x-4 rounded-md border p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1"
						/>
					</svg>
					<div class="flex-1 space-y-1">
						<p class="text-sm font-medium leading-none">Push Notifications</p>
						<p class="text-sm text-muted-foreground">
							Send notifications to device.
						</p>
					</div>
					<Switch>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
			</CardContent>
			<CardFooter>
				<Button class="w-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m5 12l5 5L20 7"
						/>
					</svg>
					Create Graph
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CreateGraphCard;