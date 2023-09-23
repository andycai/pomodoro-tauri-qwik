import { $, component$, useContext, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { BsXCircle, BsVolumeMute, BsVolumeUp } from '@qwikest/icons/bootstrap';
import { appWindow } from '@tauri-apps/api/window';
import { Status } from '~/config';
import { actionContext, staticsContext, statusContext } from '~/store';
import { changeAudio, playAudio } from '~/utils';

export const Appbar = component$(() => {
  const action = useContext(actionContext)
  const status = useContext(statusContext)
  const musicOff = useSignal(false)

  useVisibleTask$(() => {
    action.value.close = $(() => {
      appWindow.close()
    })
  })

  const closeWindow = $(() => {
    action.value.close()  
  })

  const statics = useContext(staticsContext)

  const onClick = $(() => {
    if (status.value === Status.Tick) {
      musicOff.value = !changeAudio()
      playAudio(!musicOff.value)
    }
  })


  return (
    <div class="flex flex-row justify-between space-x-1 pt-1 px-1 text-sm">
      <button title="Change Audio or Mute" onClick$={onClick}>
        {
          musicOff.value ? <BsVolumeMute /> : <BsVolumeUp />
        }
      </button>
      <span class="text-xs" >{statics.total}/{statics.today}</span>
      <button onClick$={closeWindow}>
        <BsXCircle />
      </button>
    </div>
  )
})
