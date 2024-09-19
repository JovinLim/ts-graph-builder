import { useLocation } from "@solidjs/router";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "font-bold" : "";
  return (
    <nav class="flex flex-row bg-white h-[5%] w-full border-b border-slate-200 gap-x-10">
      <div class='flex items-center align-center py-2 px-4'><p class='flex text-xl font-bold text-slate-700 text-center items-center'>Grapher</p></div>
      <ul class="flex flex-row items-center p-3 gap-x-5">
        <li class={`${active("/")}`}>
          <a href="/" class='text-selected font-semibold p-2'>Datasets</a>
        </li>
        <li class={`${active("/editor")}`}>
          <a href="/editor" class='text-unselected font-semibold p-2'>Editor</a>
        </li>
      </ul>
    </nav>
  );
}
