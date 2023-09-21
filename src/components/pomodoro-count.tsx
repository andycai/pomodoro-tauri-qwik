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

    return (
      <div class={className}>
        {
          workType.value === WorkType.Work ? <BsBatteryCharging style={{ fontSize: 14 }} onClick$={onClick} /> : <BsCupHot style={{ fontSize: 12 }} onClick$={onClick} />
        }
        <span class="text-xs ml-1 pt-0" >{statics.total}/{statics.today}</span>
      </div>
    )

})