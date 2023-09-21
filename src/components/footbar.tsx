import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { appWindow } from '@tauri-apps/api/window';
import { actionContext } from '~/store';
import { RefreshButton } from './refresh-button';
import { OperationButton } from './operation-button';

export const Footbar = component$(() => {
  const action = useContext(actionContext)

  useVisibleTask$(() => {
    action.value.close = $(() => {
      appWindow.close()
    })
  })

  return (
    <>
      <div class="flex flex-row justify-center space-x-1 pt-1 px-1 text-xl">
        <RefreshButton />
        <OperationButton />
      </div>
    </>
  )
})
