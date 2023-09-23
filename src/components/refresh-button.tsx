import { Status, WorkType } from "~/config"
import { component$, useContext } from "@builder.io/qwik"
import { actionContext, statusContext, workTypeContext } from "~/store"
import { BsArrowClockwise } from "@qwikest/icons/bootstrap"

export const RefreshButton = component$(() => {
  const status = useContext(statusContext)
  const workType = useContext(workTypeContext)
  const action = useContext(actionContext)

  return (
    <button class="cursor-pointer" onClick$={action.value.reset}>
    {
      status.value === Status.Pause || workType.value === WorkType.Break ? <BsArrowClockwise /> : ""
    }
    </button>
  )
})