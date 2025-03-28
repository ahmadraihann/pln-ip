<script setup lang="ts">
import type { AxiosError } from "axios";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

import { Table, Toast } from "@/components";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { IPagination } from "@/types/GlobalType";

import { ColumnsAddScopeDetailPart } from "../../constants/AddScope";
import type {
  PartInterface,
  ResponsePartInterface,
  UpdatePartInterface,
} from "../../types/PartType";
import FormQuantity from "../../components/FormQuantity.vue";
import { useTransactionStore } from "../../stores/TransactionStore";

const entitiesPart = ref<PartInterface[]>([]);

const transactionStore = useTransactionStore();
const route = useRoute();
const params = reactive({
  search: "",
  filter: `additional_scope_uuid,${route.params.id_scope}`,
  currentPage: 1,
  perPage: 10,
});
const total_item = ref(0);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const quantity = ref<any>(null);

//--- GET PART
const {
  data: dataPart,
  isFetching: isLoadingPart,
  refetch: refetchPart,
} = useQuery({
  queryKey: ["getAddScopePart"],
  queryFn: async () => {
    try {
      const { data } = await transactionStore.getPart(params);
      const response = data as IPagination<ResponsePartInterface[]>;

      total_item.value = response.total;

      const new_arr: PartInterface[] =
        response.data?.map((item) => {
          return {
            id: item.uuid,
            part: item.name,
            document: null,
            quantity: item.qty.toString(),
            unit: item.global_unit?.name,
            number_drawing: item.no_drawing,
            global_unit_uuid: item.global_unit_uuid,
            project_uuid: item.project_uuid,
            additional_scope_uuid: item.additional_scope_uuid,
            note: item.note,
            size: item?.size || "",
            location: item?.location || "",
          };
        }) || [];
      console.log("AAA", new_arr);
      entitiesPart.value = new_arr;

      return response;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err.response;
    }
  },
  refetchOnWindowFocus: false,
});
//--- END

//--- UPDATE PART
const { mutate: updatePart, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    payload,
    id,
  }: {
    payload: UpdatePartInterface;
    id: string;
  }) => {
    return await transactionStore.updatePart(payload, id);
  },
  onSuccess: async () => {
    refetchPart();
    quantity.value.modelOpenInputData = false;
    toastRef.value?.showToast({
      title: "Success",
      description: "Saved successfully",
      type: "success",
    });
  },
  onError: (error: any) => {
    console.log(error);
    toastRef.value?.showToast({
      title: "Error",
      description: error?.response?.data?.message || "Something went wrong",
      type: "error",
    });
  },
});
//--- END

const pagination = computed(() => {
  return {
    totalItems: total_item.value,
    itemsPerPage: params.perPage,
    currentPage: params.currentPage,
  };
});

const changePage = (e: number) => {
  params.currentPage = e;
  refetchPart();
};

const changeLimit = (e: string) => {
  params.perPage = parseInt(e);
  params.currentPage = 1;
  refetchPart();
};

const saveQuantity = (e: { quantity: string }, entity: PartInterface) => {
  updatePart({
    id: entity.id,
    payload: {
      name: entity.part,
      qty: parseFloat(e.quantity),
      noDrawing: entity.number_drawing,
      additional_scope_uuid: entity.additional_scope_uuid,
      global_unit_uuid: entity.global_unit_uuid,
      project_uuid: entity.project_uuid,
      note: entity.note,
    },
  });
};
</script>

<template>
  <Toast ref="toastRef" />
  <Table
    label-create="Part"
    :columns="ColumnsAddScopeDetailPart"
    :entities="entitiesPart"
    :loading="isLoadingPart"
    :pagination="pagination"
    :is-create="false"
    :is-action="false"
    @change-page="changePage"
    @change-limit="changeLimit"
  >
    <template #column_quantity="{ entity }">
      <div class="w-full flex justify-center">
        <FormQuantity
          ref="quantity"
          :value="entity.quantity || ''"
          :label="entity.part"
          :loading="isLoadingUpdate"
          @save="(e) => saveQuantity(e, entity)"
        />
      </div>
    </template>
    <template #column_unit="{ entity }">
      <div class="w-full flex justify-center">
        <div
          class="border border-neutral-50 rounded-lg px-2 min-w-[100px] text-base text-neutral-50 text-center"
        >
          {{ entity.unit }}
        </div>
      </div>
    </template>
  </Table>
</template>
