import AlertManager from "@/components/AlertManager";
import { debug } from "@/components/Constants";
import { Button } from "@/components/ui/button";
import { Form, FormContent, FormDescription, FormFooter, FormHeader, FormTitle, FormTrigger } from "@/components/ui/form";
import { TextField, TextFieldLabel, TextFieldRoot } from "@/components/ui/textfield";
import { debugUtils } from "@/components/Utility";
import { DialogTriggerProps } from "@kobalte/core/dialog";
import { onMount, createSignal } from "solid-js";

export default function Datasets() {
  const [databases, setDatabases] = createSignal([]);
  const [loading, setLoading] = createSignal(true); // Signal to manage loading state

  onMount(async () => {
    try {
      // Fetch the databases from the server
      const response = await fetch(`${import.meta.env.VITE_API_URL}/databases`);
      if (!response.ok) {
        throw new Error("Failed to fetch databases");
      }
      const data = await response.json();
      setDatabases(data.databases); // Update the state with the fetched databases
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  });

  // Function to handle creating a new dataset
  const handleCreateDataset = () => {
    // Logic to create a new dataset, e.g., show a modal or redirect to a Form
    console.log("Create a new dataset");

    // alert("Feature to create a new dataset will be implemented here.");
  };

  return (
    <main class="flex h-[95%] flex-col items-center justify-center">
      <AlertManager />
      
      {loading() ? (
        <p class='font-semibold text-slate-800 text-lg'>Loading...</p>
      ) : databases().length === 0 ? (
        <div class="flex flex-col w-1/5 items-center">
          {/* BANNER */}
          <div class="flex flex-col gap-y-8 p-5 items-center">
            <p class="font-bold text-slate-800 text-8xl">Grapher</p>
            <p class="font-medium text-slate-800 text-base">You don't have any datasets. Let's create one</p>
          </div>
          <div class="flex flex-col gap-y-5 w-full">
          <Form>
            <FormTrigger
              as={(props: DialogTriggerProps) => (
                <Button class="border-2 h-16 font-semibold text-slate-800 text-lg" variant="outline" {...props}>
                  Create graph
                </Button>
              )}
            />
            <FormContent class='w-1/4'>
              <FormHeader>
                <FormTitle>Create Dataset</FormTitle>
                <FormDescription>
                  Fill up some details about your dataset.
                </FormDescription>
              </FormHeader>
              <div class="grid gap-4 py-4 w-full">
                <TextFieldRoot class="flex flex-row items-center">
                  <TextFieldLabel class="text-left w-1/5">Name</TextFieldLabel>
                  <TextField id='create-dataset-name-input' class="w-4/5" value={debug() ? debugUtils.datasetName : ""}/>
                </TextFieldRoot>
                <TextFieldRoot class="flex flex-row items-center">
                  <TextFieldLabel class="text-left w-1/5">Description</TextFieldLabel>
                  <TextField id='create-dataset-name-input' class="w-4/5" placeholder="Type your description here..." value=""/>
                </TextFieldRoot>
              </div>
              <FormFooter class='flex items-center align-center'>
                <Button id="create-dataset-submit" onclick={handleCreateDataset} type="submit">Save Dataset</Button>
              </FormFooter>
            </FormContent>
          </Form>
          </div>
        </div>
      ) : (
        <div class="dataset-list">
          <h2>Datasets:</h2>
          <ul class="mt-4">
            {databases().map((db) => (
              <li key={db} class="py-2 px-4 border-b border-gray-300">
                {db}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
