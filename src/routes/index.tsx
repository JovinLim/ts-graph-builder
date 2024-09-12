import AlertManager from "@/components/AlertManager";
import GraphCanvas from "@/components/GraphCanvas";
import { GraphManagerProvider } from "@/components/GraphManagerContext";
import GraphViewer from "@/components/GraphViewer";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <GraphManagerProvider>
        <AlertManager/>
      <main class='flex flex-col h-screen'>
        <Tabs/>
        <div class="flex flex-row h-[95%] text-gray-700 items-center justify-center">
          {/* Left section for Graph Viewer */}
          <div class="flex w-1/2 h-full border-r border-gray-200 p-4 items-center justify-center">
            <GraphViewer />
          </div>
          
          {/* Right section for Graph Geometry */}
          <div class="flex w-1/2 h-full p-4 items-center justify-center">
            <GraphCanvas />
          </div>
        </div>
      </main>
    </GraphManagerProvider>
  );
}