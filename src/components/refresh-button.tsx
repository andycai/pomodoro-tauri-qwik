import { Status, WorkType } from "~/config"
import { component$, useContext } from "@builder.io/qwik"
import { actionContext, statusContext, workTypeContext } from "~/store"
import { BsArrowClockwise } from "@qwikest/icons/bootstrap"

export default component$(() => {
    console.log("render refresh")
    const status = useContext(statusContext)
    const workType = useContext(workTypeContext)
    const action = useContext(actionContext)

    return (
      <>
      {
        status.value === Status.Pause || workType.value === WorkType.Break ? <BsArrowClockwise style={{ fontSize: 12 }} class="cursor-pointer" onClick$={action.value.reset} /> : ""
      }
      </>
    )
})