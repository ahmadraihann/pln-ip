<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "@/stores/GlobalStore";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import { convertToOriginalFormat } from "@/helpers/global";
import { Breadcrumb, Icon } from "@/components";
import eventBus from "@/utils/eventBus";
import {
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  VisuallyHidden,
} from "radix-vue";

import ButtonPart from "../components/ButtonPart.vue";

// VIDEO
import CI1 from "@/assets/videos/combustion-inspection/1-manhole-turbine-cylinder.mp4";
import CI2 from "@/assets/videos/combustion-inspection/2-flame-detector.mp4";
import CI3 from "@/assets/videos/combustion-inspection/3-flame-igniter.mp4";
import CI4 from "@/assets/videos/combustion-inspection/4-discavity-temperature.mp4";
import CI5 from "@/assets/videos/combustion-inspection/5-black-patch-temperature.mp4";
import CI6 from "@/assets/videos/combustion-inspection/6-fuel-branch-pipe.mp4";
import CI7 from "@/assets/videos/combustion-inspection/7-cross-flame-tube.mp4";
import CI8 from "@/assets/videos/combustion-inspection/8-top-hat.mp4";
import CI9 from "@/assets/videos/combustion-inspection/9-fuel-nozzle.mp4";
import CI10 from "@/assets/videos/combustion-inspection/10-combuster-basket.mp4";
import CI11 from "@/assets/videos/combustion-inspection/11-top-hat.mp4";
import CI12 from "@/assets/videos/combustion-inspection/12-u-support.mp4";
import CI13 from "@/assets/videos/combustion-inspection/13-bypass-elbow.mp4";
import CI14 from "@/assets/videos/combustion-inspection/14-transition-piece.mp4";
import CI15 from "@/assets/videos/combustion-inspection/15.mp4";
import CI16 from "@/assets/videos/combustion-inspection/16-transition-piece.mp4";
import CI17 from "@/assets/videos/combustion-inspection/17-u-support.mp4";
import CI18 from "@/assets/videos/combustion-inspection/18-bypass-elbow.mp4";
import CI19 from "@/assets/videos/combustion-inspection/19-top-hat.mp4";
import CI20 from "@/assets/videos/combustion-inspection/20-cross-flame-tube.mp4";
import CI21 from "@/assets/videos/combustion-inspection/21-flame-detector.mp4";
import CI22 from "@/assets/videos/combustion-inspection/22-manhole-turbine.mp4";
import CI23 from "@/assets/videos/combustion-inspection/23-discavity-temperature.mp4";
import CI24 from "@/assets/videos/combustion-inspection/24-black-patch-temperature.mp4";
import CI25 from "@/assets/videos/combustion-inspection/25-fuel-branch-pipe.mp4";
import CI26 from "@/assets/videos/combustion-inspection/26-flame-igniter.mp4";
import CI27 from "@/assets/videos/combustion-inspection/27.mp4";

const videos = [
  {
    id: 0,
    video: CI1,
    duration: 5500,
    name: "Manhole Turbine Cylinder",
    top: 235,
    left: 545,
  },
  {
    id: 1,
    video: CI2,
    duration: 5500,
    name: "Flame Detector",
    top: 222,
    left: 685,
  },
  {
    id: 2,
    video: CI3,
    duration: 7500,
    name: "Flame Igniter",
    top: 235,
    left: 525,
  },
  {
    id: 3,
    video: CI4,
    duration: 4500,
    name: "Discavity Temperature",
    top: 210,
    left: 440,
  },
  {
    id: 4,
    video: CI5,
    duration: 5500,
    name: "Black Patch Temperature",
    top: 238,
    left: 420,
  },
  {
    id: 5,
    video: CI6,
    duration: 3500,
    name: "Fuel Branch Pipe",
    top: 238,
    left: 420,
  },
  {
    id: 6,
    video: CI7,
    duration: 7500,
    name: "Cross Flame Tube",
    top: 235,
    left: 370,
  },
  { id: 7, video: CI8, duration: 5500, name: "Top Hat", top: 235, left: 505 },
  {
    id: 8,
    video: CI9,
    duration: 4500,
    name: "Fuel Nozzle",
    top: 235,
    left: 715,
  },
  {
    id: 9,
    video: CI10,
    duration: 4500,
    name: "Combuster Basket",
    top: 235,
    left: 660,
  },
  { id: 10, video: CI11, duration: 1500, name: "Top Hat", top: 240, left: 540 },
  {
    id: 11,
    video: CI12,
    duration: 3500,
    name: "U-Support",
    top: 235,
    left: 785,
  },
  {
    id: 12,
    video: CI13,
    duration: 3500,
    name: "Bypass Elbow",
    top: 235,
    left: 515,
  },
  {
    id: 13,
    video: CI14,
    duration: 3500,
    name: "Transition Piece",
    top: 237,
    left: 615,
  },
  { id: 14, video: CI15, duration: 3500, name: "", top: 0, left: 0 },
  {
    id: 15,
    video: CI16,
    duration: 2500,
    name: "Transition Piece",
    top: 237,
    left: 615,
  },
  {
    id: 16,
    video: CI17,
    duration: 2500,
    name: "U-Support",
    top: 237,
    left: 630,
  },
  {
    id: 17,
    video: CI18,
    duration: 5500,
    name: "Bypass Elbow",
    top: 235,
    left: 790,
  },
  { id: 18, video: CI19, duration: 5500, name: "Top Hat", top: 233, left: 685 },
  {
    id: 19,
    video: CI20,
    duration: 4500,
    name: "Cross Flame Tube",
    top: 237,
    left: 580,
  },
  {
    id: 20,
    video: CI21,
    duration: 5500,
    name: "Flame Detector",
    top: 237,
    left: 785,
  },
  {
    id: 21,
    video: CI22,
    duration: 8500,
    name: "Manhole Turbine",
    top: 235,
    left: 615,
  },
  {
    id: 22,
    video: CI23,
    duration: 5500,
    name: "Discavity Temperature",
    top: 230,
    left: 630,
  },
  {
    id: 23,
    video: CI24,
    duration: 3500,
    name: "Black Patch Temperature",
    top: 238,
    left: 420,
  },
  {
    id: 24,
    video: CI25,
    duration: 5500,
    name: "Fuel Branch Pipe",
    top: 237,
    left: 420,
  },
  {
    id: 25,
    video: CI26,
    duration: 4500,
    name: "Flame Igniter",
    top: 236,
    left: 525,
  },
  { id: 26, video: CI27, duration: 4500, name: "", top: 0, left: 0 },
];

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const {
  titleHeader,
  disabledBack,
  disabledNext,
  isFinish,
  isAddScope,
  isStepNavigation,
} = storeToRefs(globalStore);

const breadcrumb = ref<BreadcrumbType[]>([]);
const currentVideoIndex = ref(0);
const videoRef = ref<HTMLVideoElement | null>(null);
const isButtonVisible = ref(false);
const openStep = ref(false);
const isReversing = ref(false);
let reverseInterval: number | null = null;

const videoState = ref({
  isTransitioning: false,
});

const handleVideoEnd = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoParam = urlParams.get("video") || "1";
  const toParam = urlParams.get("to");

  if (toParam) {
    if (currentVideoIndex.value < parseInt(toParam) - 1) {
      isButtonVisible.value = true;
      disabledNext.value = false;
      disabledBack.value = false;
      setTimeout(() => {
        const nextVideo = currentVideoIndex.value + 1;
        currentVideoIndex.value = nextVideo;
        isButtonVisible.value = false;
        disabledNext.value = true;
        disabledBack.value = true;

        const url = new URL(window.location.href);
        url.search = `?video=${parseInt(videoParam) + 1}&to=${toParam}`;
        window.history.replaceState({}, "", url);
      }, 500);
    } else if (currentVideoIndex.value > parseInt(toParam) - 1) {
      isButtonVisible.value = true;
      disabledNext.value = false;
      disabledBack.value = false;
      setTimeout(() => {
        isButtonVisible.value = false;
        disabledNext.value = true;
        disabledBack.value = true;
        if (videoRef.value) {
          reverseInterval = setInterval(reverseVideo, 100);
        }
      }, 500);
    } else if (currentVideoIndex.value === parseInt(toParam) - 1) {
      isButtonVisible.value = true;
      disabledNext.value = false;
      disabledBack.value = false;

      const { to, video, ...updatedQuery } = route.query;
      router.replace({
        path: route.path,
        query: { video: currentVideoIndex.value + 1, ...updatedQuery },
      });
    }
  } else {
    isButtonVisible.value = true;
    disabledNext.value = false;
    disabledBack.value = false;
  }
};

const initializeVideo = async (index: number, startAtEnd = false) => {
  videoState.value.isTransitioning = true;
  isButtonVisible.value = false;
  disabledNext.value = true;
  disabledBack.value = true;

  if (videoRef.value) {
    videoRef.value.pause();
  }

  currentVideoIndex.value = index;
  isFinish.value = index === videos.length - 1;
  isAddScope.value = index === videos.length - 1;

  await new Promise((resolve) => {
    if (videoRef.value) {
      videoRef.value.onloadedmetadata = () => {
        if (startAtEnd && videoRef.value) {
          videoRef.value.currentTime = videoRef.value.duration - 0.1;
          isButtonVisible.value = true;
          disabledNext.value = false;
          disabledBack.value = false;
        } else {
          videoRef.value?.play();
        }
        resolve(null);
      };
    }
  });

  videoState.value.isTransitioning = false;
};

const updateURLParameter = (index: number, startAtEnd = false) => {
  const url = new URL(window.location.href);
  url.searchParams.set("video", (index + 1).toString());
  if (startAtEnd) {
    url.searchParams.set("start", "end");
  } else {
    url.searchParams.delete("start");
  }
  window.history.replaceState({}, "", url);
};

const reverseVideo = () => {
  if (!videoRef.value || videoRef.value.currentTime <= 0) {
    if (reverseInterval) {
      clearInterval(reverseInterval);
      reverseInterval = null;
    }
    isReversing.value = false;

    const prevIndex = currentVideoIndex.value - 1;

    if (prevIndex < 0) {
      router.push(
        `/${route.params.id}/create/unit/${route.params.scope}/ci/scope`
      );
      return;
    }

    currentVideoIndex.value = prevIndex;
    updateURLParameter(prevIndex, true);
    initializeVideo(prevIndex, true);
    return;
  }

  videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 0.1);
};

const handleBack = async () => {
  if (videoState.value.isTransitioning) return;

  isReversing.value = true;
  videoState.value.isTransitioning = true;
  isButtonVisible.value = false;
  disabledNext.value = true;
  disabledBack.value = true;

  if (videoRef.value) {
    reverseInterval = setInterval(reverseVideo, 100);
  }
};

const handleNext = async () => {
  if (
    videoState.value.isTransitioning ||
    currentVideoIndex.value >= videos.length - 1
  )
    return;

  const nextIndex = currentVideoIndex.value + 1;
  updateURLParameter(nextIndex);
  await initializeVideo(nextIndex);
};

const handleJumpStep = async (index: number) => {
  if (videoRef.value) {
    if (videoRef.value.currentTime === videoRef.value.duration) {
      const urlParams = new URLSearchParams(window.location.search);
      const videoParam = urlParams.get("video") || "1";
      const video = parseInt(videoParam, 10);

      if (index === video) {
        return;
      }

      const { path } = route;

      disabledNext.value = true;
      disabledBack.value = true;
      isButtonVisible.value = false;

      if (index > video) {
        const updatedQuery = { video: video + 1, to: index };
        router.push({ path, query: updatedQuery });
        const nextIndex = currentVideoIndex.value + 1;
        currentVideoIndex.value = nextIndex;
        await initializeVideo(nextIndex);
      } else {
        const updatedQuery = { video: video, to: index };
        router.push({ path, query: updatedQuery });
        if (videoRef.value) {
          reverseInterval = setInterval(reverseVideo, 100);
        }
      }

      openStep.value = false;
    }
  }
};

const handleAddScope = () => {
  router.push(
    `/${route.params.id}/create/unit/${route.params.scope}/add-scope`
  );
};

const handleSave = () => {
  router.push(`/${route.params.id}/create/unit/${route.params.scope}/result`);
};

const handleStepNavigation = () => {
  openStep.value = true;
};

const handleCloseStep = () => {
  openStep.value = false;
};

watch(openStep, (value) => {
  if (value) {
    isStepNavigation.value = false;
  } else {
    isStepNavigation.value = true;
  }
});

const initializeFromURL = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoParam = urlParams.get("video") || "1";
  const startParam = urlParams.get("start");
  const index = Math.max(
    0,
    Math.min(parseInt(videoParam, 10) - 1, videos.length - 1)
  );

  await initializeVideo(index, startParam === "end");
};

onMounted(() => {
  breadcrumb.value = [
    {
      name: "UBP Priok",
      as_link: false,
      url: "",
    },
    {
      name: convertToOriginalFormat(route.params.scope as string),
      as_link: false,
      url: "",
    },
    {
      name: "Scope Overhaul",
      as_link: false,
      url: "",
    },
    {
      name: "CI",
      as_link: false,
      url: "",
    },
  ];

  titleHeader.value = "Combustion Inspection";

  disabledNext.value = true;
  disabledBack.value = true;
  isStepNavigation.value = true;

  initializeFromURL();

  window.addEventListener("popstate", initializeFromURL);
  eventBus.on("next", handleNext);
  eventBus.on("back", handleBack);
  eventBus.on("save", handleSave);
  eventBus.on("addScope", handleAddScope);
  eventBus.on("stepNavigation", handleStepNavigation);

  // if (videoRef.value) {
  //   videoRef.value.addEventListener("timeupdate", handleVideoTimeUpdate);
  // }
});

onUnmounted(() => {
  window.removeEventListener("popstate", initializeFromURL);
  eventBus.off("next", handleNext);
  eventBus.off("back", handleBack);
  eventBus.off("save", handleSave);
  eventBus.off("addScope", handleAddScope);
  eventBus.off("stepNavigation", handleStepNavigation);

  // if (videoRef.value) {
  //   videoRef.value.removeEventListener("timeupdate", handleVideoTimeUpdate);
  // }
});
</script>

<template>
  <div class="scope-container">
    <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div>
    <div class="scope-video-container">
      <video
        ref="videoRef"
        :src="videos[currentVideoIndex].video"
        @ended="handleVideoEnd"
        autoplay
        muted
        playsinline
        class="scope-video"
      ></video>
      <div v-for="(item, key) in videos" :key="key">
        <div
          v-if="
            isButtonVisible && currentVideoIndex === key && item.name !== ''
          "
          class="absolute"
          :style="{ top: `${item.top}px`, left: `${item.left}px` }"
        >
          <ButtonPart :text="item.name" />
        </div>
      </div>
    </div>
  </div>

  <DialogRoot v-model:open="openStep">
    <DialogPortal>
      <DialogContent
        class="v-drawer-content"
        @interact-outside="() => (openStep = false)"
      >
        <VisuallyHidden>
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <div class="p-4">
          <div class="flex justify-start">
            <Icon
              name="double-arrow-right"
              class="text-[24px] text-neutral-50 cursor-pointer hover:text-cyan-500"
              @click="handleCloseStep"
            />
          </div>
          <p class="mt-6 text-2xl text-neutral-50 font-bold">
            Inspection Sequences:
          </p>
          <ul class="mt-2 max-h-[calc(100vh-220px)] overflow-y-auto">
            <p class="text-neutral-50 text-lg font-bold mt-1">Disassembly</p>
            <li
              v-for="(item, key) in videos.slice(0, 14)"
              :key="item.id"
              class="list-disc list-inside mt-1"
              :class="{ hidden: item.name === '' }"
              @click="handleJumpStep(item.id + 1)"
            >
              <a class="text-neutral-50 hover:text-cyan-500 cursor-pointer">
                {{ item.name }}
              </a>
            </li>

            <p class="text-neutral-50 text-lg font-bold mt-2">Assembly</p>
            <li
              v-for="(item, key) in videos.slice(15, 27)"
              :key="item.id"
              class="list-disc list-inside mt-1"
              :class="{ hidden: item.name === '' }"
              @click="handleJumpStep(item.id + 1)"
            >
              <a class="text-neutral-50 hover:text-cyan-500 cursor-pointer">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="sass" scoped>
.wrapper-bid
  @apply absolute top-[120px] left-10 z-[100]
</style>
