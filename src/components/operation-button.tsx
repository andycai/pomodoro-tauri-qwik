import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik"
import { INTERVAL, Status } from "../config"
import { playAudio, playEndAudio } from "../utils"
import { actionContext, statusContext } from "~/store"
import { BsPlayCircle, BsPauseCircle } from "@qwikest/icons/bootstrap"

// let timeoutId: NodeJS.Timer | null

export default component$(() => {
  console.log("render Operaction")
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

  return (
    <>
      {
        (status.value == Status.Tick) ?  <BsPauseCircle class="cursor-pointer" style={{ fontSize: 20 }} onClick$={action.value.tick} /> : <BsPlayCircle class="cursor-pointer" style={{ fontSize: 20 }} onClick$={action.value.tick} />
      }
    </>
  )
})