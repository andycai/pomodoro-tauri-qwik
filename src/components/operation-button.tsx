import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik"
import { INTERVAL, Status } from "../config"
import { playAudio, playEndAudio } from "../utils"
import { actionContext, statusContext } from "~/store"
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
    const timeoutId = setInterval(() => {
      if (status.value === Status.Tick) {
        action.value.countdown()
      }
    }, INTERVAL)
    cleanup(() => clearInterval(timeoutId))
  })

  return (
    <button class="flex flex-row justify-center basis-1/2" title="Play or Pause" onClick$={action.value.tick} >
      {
        (status.value == Status.Tick) ?  <BsPauseCircle /> : <BsPlayCircle />
      }
    </button>
  )
})