<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import eventBus from "@/utils/eventBus";
import { Breadcrumb } from "@/components";
import type { BreadcrumbType } from "@/components/navigations/Breadcrumb.vue";
import { convertToOriginalFormat } from "@/helpers/global";
import { useGlobalStore } from "@/stores/GlobalStore";

const imgUrl = new URL("@/assets/images/bg-ci-section.png", import.meta.url)
  .href;

const additionalScope = {
  ["inlet-section"]: [
    "Diaphragm Compressor Row 1 Upper",
    "Diaphragm Compressor Row 2 Upper",
    "Diaphragm Compressor Row 1 Lower",
    "Diaphragm Compressor Row 1 Lower",
  ],
  ["turbine-section"]: ["Turbine Blade Row 1", "Turbine Blade Row 2"],
  ["combustion-section"]: ["IGV Blade"],
  ["exhaust-section"]: [
    "Diaphragm Compressor Row 1 Upper",
    "Diaphragm Compressor Row 2 Upper",
  ],
  ["generator-section"]: [
    "Diaphragm Compressor Row 1 Upper",
    "Diaphragm Compressor Row 2 Upper",
    "Diaphragm Compressor Row 1 Lower",
    "Diaphragm Compressor Row 1 Lower",
  ],
  ["compressor-section"]: ["Diaphragm Compressor Row 1 Upper"],
};

const router = useRouter();
const route = useRoute();
const globalStore = useGlobalStore();
const {
  titleHeader,
  disabledNext,
  disabledBack,
  isFinish,
  isAddScope,
  isStepNavigation,
} = storeToRefs(globalStore);
const breadcrumb = ref<BreadcrumbType[]>([]);

const handleSave = () => {
  if (route.name === "main add scope squences section result") {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/${route.params.menu}/add-scope-squences/${route.params.section}/result/finish`
    );
  } else {
    router.push(`/${route.params.id}/create/unit/${route.params.scope}/result`);
  }
};

const handleBack = () => {
  if (route.name === "main add scope squences section result") {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/${route.params.menu}/add-scope-squences/${route.params.section}`
    );
  } else {
    router.push(
      `/${route.params.id}/create/unit/${route.params.scope}/add-scope/${route.params.section}`
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

  isFinish.value = true;
  isAddScope.value = false;
  disabledNext.value = false;
  disabledBack.value = false;
  isStepNavigation.value = false;

  eventBus.on("save", handleSave);
  eventBus.on("back", handleBack);
});

onUnmounted(() => {
  eventBus.off("save", handleSave);
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
    <div class="section-result">
      <div class="wrapper-result">
        <div class="result-arrow result-active">Combustion Inspection</div>
        <div class="result-arrow">Turbine Inspection</div>
        <div class="result-arrow">Major Inspection</div>
      </div>
      <div class="wrapper-result col-span-2">
        <div class="group-result">
          <div
            class="result-arrow"
            :class="{
              'result-active': route.params.section === 'exhaust-section',
            }"
          >
            Exhaust Section
          </div>
        </div>
        <div class="group-result">
          <div
            class="result-arrow"
            :class="{
              'result-active': route.params.section === 'turbine-section',
            }"
          >
            Turbine Section
          </div>
        </div>
        <div class="group-result">
          <div
            class="result-arrow"
            :class="{
              'result-active': route.params.section === 'combustion-section',
            }"
          >
            Combustion Section
          </div>
        </div>
        <div class="group-result">
          <div class="result-arrow">Inlet Section</div>
        </div>
        <div class="group-result">
          <div
            class="result-arrow"
            :class="{
              'result-active': route.params.section === 'inlet-section',
            }"
          >
            Inlet Section
          </div>
          <div
            class="result-arrow"
            :class="{
              'result-active': route.params.section === 'inlet-section',
            }"
          >
            Compressor Section
          </div>
        </div>
        <div class="group-result">
          <div
            class="result-arrow"
            :class="{
              'result-active': route.params.section === 'generator-section',
            }"
          >
            Generator Section
          </div>
        </div>
      </div>
      <div class="wrapper-result">
        <div class="additional-scope">Additional Scope</div>
        <div class="additional-scope-body">
          <div
            v-for="(item, key) in additionalScope[route.params.section as string]"
            :key="key"
            class="flex"
          >
            <span>{{ key + 1 }}. &nbsp;</span>
            <span>{{ item }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.section-result
  @apply grid grid-cols-4 gap-10 pt-[170px] px-[100px] w-full
  .wrapper-result
    @apply flex flex-col gap-4
    .group-result
      @apply grid grid-cols-2 gap-10
    .result-arrow
      @apply bg-buttonGray flex items-center justify-start text-base font-bold text-neutral-50 py-1.5 pl-4 w-[250px] border-0
      clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0 100%, 0 0)
    .result-active
      @apply bg-cyan-500
    .additional-scope
      @apply bg-cyan-500 flex items-center justify-center text-base font-bold text-neutral-50 py-1.5 pl-4 w-[250px] border-0 rounded
    .additional-scope-body
      @apply rounded bg-neutral-300 text-base text-neutral-950 px-4 py-2 w-full
</style>
