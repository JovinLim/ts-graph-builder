import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "@/components/Nav";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <div class='flex flex-col h-screen w-screen'>
          <Nav />
          <Suspense fallback={<div class='items-center text-center font-medium font-2xl'>Loading...</div>}>{props.children}</Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
