import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik"
import { INTERVAL, Status } from "../config"
import { playAudio, playEndAudio } from "../utils"
import { actionContext, statusContext } from "~/store"
import { Pause } from "~/icons/pause"
import { Play } from "~/icons/play"

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
        action.countdown()
      }
    }, INTERVAL)
    cleanup(() => clearInterval(timeoutId))
  })

  return (
    <button class="flex flex-row justify-center basis-1/2" title="Play or Pause" onClick$={action.tick} >
      {
        (status.value == Status.Tick) ?  <Pause width={22} height={22} /> : <Play width={22} height={22} />
      }
    </button>
  )
})