<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import eventBus from "@/utils/eventBus";
import { Breadcrumb } from "@/components";
import { useGlobalStore } from "@/stores/GlobalStore";
import { convertToOriginalFormat } from "@/helpers/global";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";

const imgUrl = new URL("@/assets/images/bg-ci-section.png", import.meta.url)
  .href;

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const { titleHeader, disabledNext, disabledBack, isFinish, isStepNavigation } =
  storeToRefs(globalStore);
const breadcrumb = ref<BreadcrumbType[]>([]);

const handleNext = () => {
  if (route.name === "main add scope squences section") {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/${route.params.menu}/add-scope-squences/${route.params.section}/result`
    );
  } else {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/add-scope/${route.params.section}/result`
    );
  }
};

const handleBack = () => {
  if (route.name === "main add scope squences section") {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/${route.params.menu}/add-scope-squences`
    );
  } else {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/add-scope`
    );
  }
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
    {
      name: "Add Scope",
      as_link: false,
      url: "",
    },
  ];
  titleHeader.value = convertToOriginalFormat(route.params.section as string);

  disabledNext.value = false;
  disabledBack.value = false;
  isFinish.value = false;
  isStepNavigation.value = false;

  eventBus.on("next", handleNext);
  eventBus.on("back", handleBack);
});

onUnmounted(() => {
  eventBus.off("next", handleNext);
  eventBus.off("back", handleBack);
});
</script>

<template>
  <div
    class="w-full min-h-screen"
    :style="{
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="scope-breadcrumb">
      <Breadcrumb :items="breadcrumb" />
    </div>
  </div>
</template>
