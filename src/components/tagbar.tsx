import { component$ } from '@builder.io/qwik';

export const Tagbar = component$(() => {

  return (
    <div class="flex flex-row justify-center space-x-2 text-xs text-gray-500">
      <span>Work</span>
      <span>Study</span>
      <span>Rest</span>
    </div>
  )
})
