import { $, component$, useComputed$, useContextProvider, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { type Statics, actionContext, countContext, staticsContext, statusContext, workTypeContext } from "~/store";
import { DefaultBreakDuration, DefaultWorkDuration, Keys, Status, Tasks, WorkType, dataJsonURL, diAudioPaths, endAudioPaths } from "~/config";
import { getIntDefault, initItem, saveItem } from "~/store/local";
import { appWindow } from "@tauri-apps/api/window"
import { ClassContainer, TextColors } from "~/style";
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
  const statics = useStore<Statics>({
    daykey: Keys.today(),
    today: 0,
    total: 0
  })

  const action = useSignal({
    initData: $((td: number, tt: number, c: number) => {
      console.log("initData", td, tt, c)
      count.value = c
      statics.today = td
      statics.total = tt
    }),
    updateToday: $((c: number) => {
      statics.today = c
    }),
    updateDaykey: $((key: string) => {
      statics.daykey = key
    }),
    countdown: $(() => {
      if (count.value === 0) {
        status.value = Status.Idle
        if (workType.value === WorkType.Work) {
          statics.today++
          statics.total++
          workType.value = WorkType.Break
          count.value = getIntDefault(Keys.defaultBreakDuration, DefaultBreakDuration)
          // 当天数量本地保存
          if (statics.daykey === Keys.today()) { // 当天
            saveItem(Keys.today(), statics.today.toString())
          } else {
            statics.daykey = Keys.today()
            statics.today = 1 // 隔天更新
          }
          // 总数本地保存
          saveItem(Keys.total(Tasks.default), statics.total.toString())
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
    })
  })

  useContextProvider(countContext, count)
  useContextProvider(statusContext, status)
  useContextProvider(workTypeContext, workType)
  useContextProvider(staticsContext, statics)
  useContextProvider(actionContext, action)

  const className = useComputed$(() => {
    const index = Math.floor(statics.today / 4)
    const arr = TextColors[workType.value]??TextColors[1]
    const color = arr[index]??arr[4]
    return ClassContainer + color 
  })

  useVisibleTask$(async () => {
    action.value.close = $(() => {
      appWindow.close()
    })

    action.value.initData(
      getIntDefault(Keys.today(), 0),
      getIntDefault(Keys.total(Tasks.default), 0),
      getIntDefault(Keys.defaultWorkDuration, DefaultWorkDuration)
    )

    const resourcePath = await resolveResource(dataJsonURL)
    const data = JSON.parse(await readTextFile(resourcePath))
    initItem(Keys.defaultWorkDuration, data.defaultWorkDuration.toString())
    initItem(Keys.defaultBreakDuration, data.defaultBreakDuration.toString())

    for (const v of diAudioPaths) {
      // console.log("path: ", v)
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
