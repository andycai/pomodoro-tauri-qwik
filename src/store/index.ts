import { type Signal, createContextId, type QRL } from "@builder.io/qwik";

export const delay = (time: number) => new Promise((res) => setTimeout(res, time));

export type State = {
  daykey: string
  today: number
  total: number
}

type Action = {
  initData: QRL<(today: number, total: number, count: number) => void>
  countdown: QRL<() => void>
  tick: QRL<() => void>
  reset: QRL<() => void>
  close: QRL<() => void>
  changeTheme: QRL<() => void>
}

export const countContext = createContextId<Signal<number>>("count_context")
export const statusContext = createContextId<Signal<number>>("status_context")
export const workTypeContext = createContextId<Signal<number>>("workType_context")
export const stateContext = createContextId<State>("state_context")
export const themeContext = createContextId<Signal<number>>("theme_context")
export const actionContext = createContextId<Action>("action_context")
