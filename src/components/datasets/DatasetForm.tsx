import AlertManager from "@/components/AlertManager";
import { Button } from "@/components/ui/button";
import { onMount, createSignal } from "solid-js";
import { TextField, TextFieldLabel, TextFieldRoot } from "../ui/textfield";
import { debug } from "../Constants";
import { debugUtils } from "../Utility";

export default function DatasetForm() {
  const [databases, setDatabases] = createSignal([]);
  const [loading, setLoading] = createSignal(true); // Signal to manage loading state

  // Function to handle creating a new dataset
  const handleCreateDataset = () => {
    // Logic to create a new dataset, e.g., show a modal or redirect to a form
    console.log("Create a new dataset");

    // alert("Feature to create a new dataset will be implemented here.");
  };

  return (
    <div class="flex flex-col items-center border border-slate-200 rounded-lg gap-y-5">
        <p>Create Dataset</p>
        <TextFieldRoot class="flex flex-row items-center">
            <TextFieldLabel class="text-left w-1/5">Name</TextFieldLabel>
            <TextField id='create-dataset-name-input' class="w-4/5" value={debug() ? debugUtils.datasetName : ""}/>
        </TextFieldRoot>
    </div>
  );
}
