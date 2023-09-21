import { changeAudio, playAudio } from "../utils"
import { WorkType } from "../config"
import { BsBatteryCharging, BsCupHot } from "@qwikest/icons/bootstrap"
import { $, component$, useContext } from "@builder.io/qwik"
import { staticsContext, workTypeContext } from "~/store"

export default component$(() => {
    const workType = useContext(workTypeContext)
    const statics = useContext(staticsContext)

    const className = "flex flex-row flex-none ml-1"
    console.log("render today count: ", statics.today, statics.total)

    const onClick = $(() => {
      playAudio(changeAudio())
    })

    const iconClass = "cursor-pointer text-sm"

    return (
      <div class={className}>
        {
          workType.value === WorkType.Work ? <BsBatteryCharging class={iconClass} onClick$={onClick} /> : <BsCupHot class={iconClass} onClick$={onClick} />
        }
        <span class="text-xs ml-1 pt-0" >{statics.total}/{statics.today}</span>
      </div>
    )

})