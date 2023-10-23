import { ONE_MINUTE, diAudioPaths, endAudioPaths } from "./config";

export const convertMinuteString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE) < 10 ? "0" : ""}${Math.floor(count / ONE_MINUTE)}`)
}

export const convertSecondString = (count: number) : string => {
  return (`${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`)
}

export const convertTimeString = (count: number) : string => {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`)
}

const audioObjs = new Map();
const endAudioObjs = new Map();

let currentAudioIndex = 0
const currentEndAudioIndex = 0
let _isMute = false

export const addAudio = (path: string, audio: HTMLAudioElement) => {
  audioObjs.set(path, audio)
}

export const playAudio = (isPlay: boolean): void => {
  for (const audio of audioObjs.values()) {
    audio.currentTime = 0 
    audio.pause()
  }
  if (isPlay && !_isMute) {
    const index = currentAudioIndex > diAudioPaths.length - 1 ? 0 : currentAudioIndex
    audioObjs.get(diAudioPaths[index])?.play() 
  }
}

export const isMute = () => {
  return _isMute;
}

export const changeAudio = () => {
  if (_isMute) { // 当前已静音
      _isMute = false 
  } else {
    if (currentAudioIndex + 1 == diAudioPaths.length) {
      _isMute = true
      return;
    }
  }
  currentAudioIndex++
  currentAudioIndex = currentAudioIndex % (diAudioPaths.length)
}

export const addEndAudio = (path: string, audio: HTMLAudioElement) => {
  endAudioObjs.set(path, audio)
}

export const playEndAudio = (isPlay: boolean): void => {
  for (const audio of endAudioObjs.values()) {
    audio.currentTime = 0 
    audio.pause()
  }
  if (isPlay && !_isMute) {
    const index = currentEndAudioIndex > endAudioPaths.length - 1 ? 0 : currentEndAudioIndex
    endAudioObjs.get(endAudioPaths[index])?.play() 
  }
}