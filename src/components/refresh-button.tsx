import { Status, WorkType } from "~/config"
import { component$, useContext } from "@builder.io/qwik"
import { actionContext, statusContext, workTypeContext } from "~/store"
import { Refresh } from "~/icons/refresh"

export const RefreshButton = component$(() => {
  const status = useContext(statusContext)
  const workType = useContext(workTypeContext)
  const action = useContext(actionContext)

  return (
    <button class="flex flex-row justify-end basis-1/4" title="Reset" onClick$={action.reset}>
    {
      status.value === Status.Pause || workType.value === WorkType.Break ? <Refresh width={16} height={16} /> : ""
    }
    </button>
  )
})