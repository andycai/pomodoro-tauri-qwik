import { countContext } from "~/store";
import { convertMinuteString, convertSecondString } from "../utils";
import { component$, useContext } from "@builder.io/qwik";

export const TimeCounter = component$(() => {
  const count = useContext(countContext);

  return (
    <div class="flex flex-col items-center font-black" data-tauri-drag-region>
      <h1 class="text-7xl" data-tauri-drag-region>{convertMinuteString(count.value)}</h1>
      <h4 class="text-7xl" data-tauri-drag-region>{convertSecondString(count.value)}</h4>
    </div>
  )
})