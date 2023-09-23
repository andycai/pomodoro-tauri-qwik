import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { appWindow } from '@tauri-apps/api/window';
import { actionContext } from '~/store';
import { RefreshButton } from './refresh-button';
import { OperationButton } from './operation-button';
import { BsPalette } from "@qwikest/icons/bootstrap"

export const Footbar = component$(() => {
  const action = useContext(actionContext)

  useVisibleTask$(() => {
    action.value.close = $(() => {
      appWindow.close()
    })
  })

  return (
    <div class="flex flex-row items-end mt-1 px-1 text-2xl">
      <button class="flex flex-row justify-start text-sm basis-1/4" title="Change Theme" onClick$={action.value.changeTheme}>
        <BsPalette />
      </button>
      <OperationButton />
      <RefreshButton />
  </div>
  )
})
