<script setup lang="ts">
import { ref, watch, type PropType } from "vue";
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "radix-vue";
import { Input, Icon } from "@/components";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["squences", "drawing"]);

const modelOpenInputData = ref(false);

const squences = () => {
  emit("squences");
};

const drawing = () => {
  emit("drawing");
};
</script>

<template>
  <PopoverRoot v-model:open="modelOpenInputData">
    <PopoverTrigger>
      <button class="button-dots">
        <Icon name="dots-horizontal" />
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent :side-offset="5" class="popover-content-dots">
        <button class="popover-content-dots--squences" @click="squences">
          Squences
        </button>
        <button class="popover-content-dots--drawing" @click="drawing">
          Drawing
        </button>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="sass">
.button-dots
  @apply text-[16px] text-neutral-50 cursor-pointer h-full flex items-center justify-center

.popover-content-dots
  @apply flex gap-2 rounded mx-4 px-3 py-4 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade
  > button
    @apply bg-buttonGray rounded-lg px-2 min-w-[100px] text-base text-neutral-50 hover:bg-neutral-500
</style>
