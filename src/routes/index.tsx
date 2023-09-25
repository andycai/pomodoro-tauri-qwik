import { $, component$, useComputed$, useContextProvider, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { type State, actionContext, countContext, stateContext, statusContext, workTypeContext, themeContext } from "~/store";
import { DefaultBreakDuration, DefaultWorkDuration, Keys, MagicNumber, Status, Tasks, WorkType, dataJsonURL, diAudioPaths, endAudioPaths } from "~/config";
import { getIntDefault, initItem, saveItem } from "~/store/local";
import { appWindow } from "@tauri-apps/api/window"
import { ClassContainer, TextColors, themeNum } from "~/style";
import { addAudio, addEndAudio } from "~/utils";
import { convertFileSrc } from "@tauri-apps/api/tauri"
import { resolveResource } from "@tauri-apps/api/path"
import { readTextFile } from "@tauri-apps/api/fs"
import { TimeCounter } from "~/components/time-counter";
import { Appbar } from "~/components/appbar";
import { Footbar } from "~/components/footbar";

export default component$(() => {
  const count = useSignal(0)
  const status = useSignal(Status.Idle)
  const workType = useSignal(WorkType.Work)
  const theme = useSignal(0)
  const state = useStore<State>({
    daykey: Keys.today(),
    today: 0,
    total: 0
  })

  const action = {
    initData: $((td: number, tt: number, c: number) => {
      count.value = c
      state.today = td
      state.total = tt
      theme.value = Math.floor(td / MagicNumber)
    }),
    countdown: $(() => {
      if (count.value === 0) {
        status.value = Status.Idle
        if (workType.value === WorkType.Work) {
          state.today++
          state.total++
          workType.value = WorkType.Break
          count.value = getIntDefault(Keys.defaultBreakDuration, DefaultBreakDuration)
          if (state.today % MagicNumber === 0) {
            theme.value = (theme.value + 1) % themeNum
          }
          // 当天数量本地保存
          if (state.daykey === Keys.today()) { // 当天
            saveItem(Keys.today(), state.today.toString())
          } else {
            state.daykey = Keys.today()
            state.today = 1 // 隔天更新
          }
          // 总数本地保存
          saveItem(Keys.total(Tasks.default), state.total.toString())
        } else {
          workType.value = WorkType.Work
          count.value = getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration)
        }
        return
      }
      count.value--
    }),
    tick: $(() => {
      if (status.value !== Status.Tick) {
        status.value = Status.Tick
      } else {
        status.value = Status.Pause
      }
    }),
    reset: $(() => {
      count.value = getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration)
      status.value = Status.Idle
      workType.value = WorkType.Work
    }),
    close: $(()=>{
    }),
    changeTheme: $(() => {
      theme.value = (theme.value + 1) % themeNum
    })
  }

  useContextProvider(countContext, count)
  useContextProvider(statusContext, status)
  useContextProvider(workTypeContext, workType)
  useContextProvider(stateContext, state)
  useContextProvider(actionContext, action)
  useContextProvider(themeContext, theme)

  const className = useComputed$(() => {
    const arr = TextColors[workType.value]??TextColors[1]
    const color = arr[theme.value]??arr[0]
    return ClassContainer + color 
  })

  useVisibleTask$(async () => {
    action.close = $(() => {
      appWindow.close()
    })

    action.initData(
      getIntDefault(Keys.today(), 0),
      getIntDefault(Keys.total(Tasks.default), 0),
      getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration)
    )

    const resourcePath = await resolveResource(dataJsonURL)
    const data = JSON.parse(await readTextFile(resourcePath))
    initItem(Keys.defaultWorkDuration, data.defaultWorkDuration.toString())
    initItem(Keys.defaultBreakDuration, data.defaultBreakDuration.toString())

    for (const v of diAudioPaths) {
      const audioPath = await resolveResource(v)
      const audio = new Audio(convertFileSrc(audioPath))
      audio.loop = true
      addAudio(v, audio)
    }

    for (const v of endAudioPaths) {
      const audioPath = await resolveResource(v)
      addEndAudio(v, new Audio(convertFileSrc(audioPath)))
    }
  })

  return (
    <div class={className}>
      <Appbar />
      <TimeCounter />
      <Footbar />
    </div>
  )
})

export const head: DocumentHead = {
  title: "Welcome to Pomodoro",
  meta: [
    {
      name: "Pomodoro",
      content: "A simple pomodoro timer",
    },
  ],
}
