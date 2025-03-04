<script setup lang="ts">
import { ref } from "vue";
import type { AxiosError } from "axios";

import { Loading, Table } from "@/components";
import { useQuery } from "@tanstack/vue-query";

import type { ResultsInterface } from "../types/ResultsType";
import { ColumnsResults } from "../constants/ResultsConstant";
import { useMainStore } from "../stores/MainStore";

const Data = ref<ResultsInterface[]>([
  {
    id: 1,
    uuid: "scope",
    manpower: "Scope",
  },
  {
    id: 2,
    uuid: "consumable_material",
    manpower: "Consumable Material",
  },
  {
    id: 3,
    uuid: "part_list",
    manpower: "Part List",
  },
  {
    id: 4,
    uuid: "manpower",
    manpower: "Manpower",
  },
]);

const mainStore = useMainStore();
const is_loading = ref<string | null>(null);

//--- DOWNLOAD SCOPE
const { refetch: refetchDownloadScope } = useQuery({
  queryKey: ["downloadResultScope"],
  queryFn: async () => {
    try {
      await mainStore.getDownloadResultScope();
      is_loading.value = null;

      return true;
    } catch (error: any) {
      const err = error as AxiosError;
      is_loading.value = null;

      throw err.response;
    }
  },
  enabled: false,
  refetchOnWindowFocus: false,
});
//--- END

//--- DOWNLOAD CONSMAT
const { refetch: refetchDownloadConsMat } = useQuery({
  queryKey: ["downloadResultConsMat"],
  queryFn: async () => {
    try {
      await mainStore.getDownloadResultConsMat();
      is_loading.value = null;

      return true;
    } catch (error: any) {
      const err = error as AxiosError;
      is_loading.value = null;

      throw err.response;
    }
  },
  enabled: false,
  refetchOnWindowFocus: false,
});
//--- END

//--- DOWNLOAD PART
const { refetch: refetchDownloadPart } = useQuery({
  queryKey: ["downloadResultPart"],
  queryFn: async () => {
    try {
      await mainStore.getDownloadResultPart();
      is_loading.value = null;

      return true;
    } catch (error: any) {
      const err = error as AxiosError;
      is_loading.value = null;

      throw err.response;
    }
  },
  enabled: false,
  refetchOnWindowFocus: false,
});
//--- END

//--- DOWNLOAD MANPOWER
const { refetch: refetchDownloadManpower } = useQuery({
  queryKey: ["downloadResultManpower"],
  queryFn: async () => {
    try {
      await mainStore.getDownloadResultManpower();
      is_loading.value = null;

      return true;
    } catch (error: any) {
      const err = error as AxiosError;
      is_loading.value = null;

      throw err.response;
    }
  },
  enabled: false,
  refetchOnWindowFocus: false,
});
//--- END

const handleDownload = (item: ResultsInterface) => {
  is_loading.value = item.uuid;

  switch (item.uuid) {
    case "scope":
      refetchDownloadScope();
      break;

    case "consumable_material":
      refetchDownloadConsMat();
      break;

    case "part_list":
      refetchDownloadPart();
      break;

    case "manpower":
      refetchDownloadManpower();
      break;
  }
};
</script>

<template>
  <p class="text-center w-full font-bold text-2xl text-blue-900 mb-10">
    REPORT
  </p>
  <Table
    label-create="Manpower"
    :is-create="false"
    :is-search="false"
    :is-action="false"
    :columns="ColumnsResults"
    :entities="Data"
    :is-pagination="false"
  >
    <template #column_download="{ entity }">
      <div class="flex justify-center">
        <button class="button-download" @click="handleDownload(entity)">
          <Loading v-if="is_loading === entity.uuid" width="10" height="10" />
          Download
        </button>
      </div>
    </template>
    <!-- <template #column_note="{ entity }">
      <p class="v-table-body-text">{{ entity.note || "None" }}</p>
    </template> -->
  </Table>
</template>

<style lang="sass">
.button-download
  @apply flex items-center justify-center py-1 gap-2 bg-transparent border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 hover:bg-cyan-500
</style>
