import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { BsXCircle } from '@qwikest/icons/bootstrap';
import { appWindow } from '@tauri-apps/api/window';
import { actionContext } from '~/store';
import RefreshButton from './refresh-button';
import PomodoroCount from './pomodoro-count';

export const Appbar = component$(() => {
  const action = useContext(actionContext)

  useVisibleTask$(() => {
    action.value.close = $(() => {
      appWindow.close()
    })
  })

  const closeWindow = $(() => {
    action.value.close()  
  })

  return (
    <div class="flex flex-row justify-between">
      <div class="ml-1 mt-1">
        <PomodoroCount />
      </div>
      <div class="flex flex-row justify-end mt-1 space-x-1 mr-1">
        <RefreshButton />
        <BsXCircle class="cursor-pointer text-xs" onClick$={closeWindow} />
      </div>
    </div>
  )
})
