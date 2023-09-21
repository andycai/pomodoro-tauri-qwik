import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik"
import { INTERVAL, Status } from "../config"
import { playAudio, playEndAudio } from "../utils"
import { actionContext, staticsContext, statusContext } from "~/store"
import { BsPlayCircle, BsPauseCircle } from "@qwikest/icons/bootstrap"

export const OperationButton = component$(() => {
  const status = useContext(statusContext)
  const action = useContext(actionContext)

  useVisibleTask$(({ track}) => {
    track(() => status.value)
    playAudio(status.value === Status.Tick)
    playEndAudio(status.value === Status.Idle)
  })

  useVisibleTask$(({ cleanup }) => {
    // track(() => status.value)
    const timeoutId = setInterval(() => {
      if (status.value === Status.Tick) {
        action.value.countdown()
      }
    }, INTERVAL)
    cleanup(() => clearInterval(timeoutId))
  })

  const className = "cursor-pointer"
  
  const statics = useContext(staticsContext)
  console.log("render Operaction", statics.today)

  return (
    <div>
      {
        (status.value == Status.Tick) ?  <BsPauseCircle class={className} onClick$={action.value.tick} /> : <BsPlayCircle class={className} onClick$={action.value.tick} />
      }
    </div>
  )
})