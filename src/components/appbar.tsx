import { $, component$, useContext, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { appWindow } from '@tauri-apps/api/window';
import { Status } from '~/config';
import { Close } from '~/icons/close';
import { Volume } from '~/icons/volume';
import { VolumeMute } from '~/icons/volume-mute';
import { actionContext, stateContext, statusContext } from '~/store';
import { changeAudio, playAudio } from '~/utils';

export const Appbar = component$(() => {
  const action = useContext(actionContext)
  const status = useContext(statusContext)
  const musicOff = useSignal(false)

  useVisibleTask$(() => {
    action.close = $(() => {
      appWindow.close()
    })
  })

  const closeWindow = $(() => {
    action.close()  
  })

  const state = useContext(stateContext)

  const onClick = $(() => {
    if (status.value === Status.Tick) {
      musicOff.value = !changeAudio()
      playAudio(!musicOff.value)
    }
  })

  return (
    <div class="flex flex-row justify-between space-x-1 pt-1 px-1">
      <button title="Change Audio or Mute" onClick$={onClick}>
        {
          musicOff.value ? <VolumeMute width={16} height={16} /> : <Volume width={16} height={16} />
        }
      </button>
      <span class="text-xs" >{state.total}/{state.today}</span>
      <button title="Close Window" onClick$={closeWindow}>
        <Close />
      </button>
    </div>
  )
})
