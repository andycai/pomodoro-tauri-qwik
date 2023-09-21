import { component$ } from '@builder.io/qwik';
import OperationButton from './operation-button';

export const Footbar = component$(() => {

  return (
    <div class="flex flex-row justify-center space-x-1 mt-1">
      <OperationButton />
    </div>
  )
})
