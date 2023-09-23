import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { BsBatteryCharging, BsCupHot, BsXCircle } from '@qwikest/icons/bootstrap';
import { appWindow } from '@tauri-apps/api/window';
import { actionContext, staticsContext, workTypeContext } from '~/store';
import { changeAudio, playAudio } from '~/utils';
import { WorkType } from '~/config';

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

  const workType = useContext(workTypeContext)
  const statics = useContext(staticsContext)

  const onClick = $(() => {
    playAudio(changeAudio())
  })


  return (
    <div class="flex flex-row justify-between space-x-1 pt-1 px-1 text-sm">
      <button onClick$={onClick}>
        {
          workType.value === WorkType.Work ? <BsBatteryCharging /> : <BsCupHot />
        }
      </button>
      <span class="text-xs" >{statics.total}/{statics.today}</span>
      <button onClick$={closeWindow}>
        <BsXCircle />
      </button>
    </div>
  )
})
