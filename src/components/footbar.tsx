import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { appWindow } from '@tauri-apps/api/window';
import { actionContext } from '~/store';
import { RefreshButton } from './refresh-button';
import { OperationButton } from './operation-button';
import { Palette } from '~/icons/palette';

export const Footbar = component$(() => {
  const action = useContext(actionContext)

  useVisibleTask$(() => {
    action.value.close = $(() => {
      appWindow.close()
    })
  })

  return (
    <div class="flex flex-row items-end mt-2 px-1">
      <button class="flex flex-row justify-start basis-1/4" title="Change Theme" onClick$={action.value.changeTheme}>
        <Palette />
      </button>
      <OperationButton />
      <RefreshButton />
  </div>
  )
})
