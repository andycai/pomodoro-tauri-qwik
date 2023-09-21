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

  console.log("render today count", statics.today)

  const onClick = $(() => {
    playAudio(changeAudio())
  })

  const className = "flex flex-row flex-none"
  const iconClass = "cursor-pointer"

  return (
    <>
      <div class="flex flex-row justify-between space-x-1 pt-1 px-1 text-sm">
        <div class={className}>
          {
            workType.value === WorkType.Work ? <BsBatteryCharging class={iconClass} onClick$={onClick} /> : <BsCupHot class={iconClass} onClick$={onClick} />
          }
        </div>
        <span class="text-xs" >{statics.total}/{statics.today}</span>
        <BsXCircle class="cursor-pointer" onClick$={closeWindow} />
      </div>
    </>
  )
})
