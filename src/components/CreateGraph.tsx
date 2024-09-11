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
import { Graph } from "@/lib/core";

const CreateGraph = () => {
    const {graphs, setGraphs, setCurrentGraph} = useGraphManager();
    const [isOpen, setIsOpen] = createSignal(false);

    function onCreateGraph() {
        const nameInput_ = document.getElementById('create-graph-name-input') as HTMLInputElement;
        const name_ = nameInput_.value ? nameInput_.value : "";
        const graph = new Graph(name_);
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
				<div class="grid gap-4 py-4">
					<TextFieldRoot class="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
						<TextFieldLabel class="text-right">Name</TextFieldLabel>
						<TextField id='create-graph-name-input' class="col-span-2 md:col-span-3" value={"test"}/>
					</TextFieldRoot>
				</div>
				<SheetFooter>
					<Button onclick={onCreateGraph} type="submit">Save Graph</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default CreateGraph;