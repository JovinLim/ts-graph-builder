import AlertManager from "@/components/AlertManager";
import { Button } from "@/components/ui/button";
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
    // Logic to create a new dataset, e.g., show a modal or redirect to a form
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
            <Button
              variant={"outline"}
              onClick={handleCreateDataset}
              class="border-2 h-16 font-semibold text-slate-800 text-lg"
            >
              Create Dataset
            </Button>
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
