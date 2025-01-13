<script setup lang="ts" generic="T">
import { ref, type PropType, type VNode } from "vue";
import { CreateRow, Input, Modal, Icon } from "@/components";

export interface TableColumnType {
  key: string;
  label: string;
  align: "left" | "center" | "right";
  sort: boolean;
  width?: string | number;
}

const props = defineProps({
  columns: {
    type: Array as PropType<TableColumnType[]>,
    default: () => {
      return [];
    },
  },
  entities: {
    type: Array as PropType<T[]>,
    default: () => {
      return [];
    },
  },
  isAction: {
    type: Boolean,
    default: true,
  },
  rowClickable: {
    type: Boolean,
    default: false,
  },
  labelCreate: {
    type: String,
    default: "",
  },
  isCreate: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  "search",
  "update:modelSearch",
  "rowClick",
  "changePage",
  "changeLimit",
  "create",
  "delete",
]);

const open_create = ref(false);

const styleWidthHeader = (width: string | number | undefined) => {
  if (width !== undefined) {
    return {
      width:
        typeof width === "number"
          ? `${width}px`
          : `${width.replace("px", "")}px`,
    };
  }
};

const styleTitle = (align: string) => {
  if (align === undefined) {
    return {
      justifyContent: "center",
    };
  } else {
    return {
      justifyContent:
        align === "left"
          ? "flex-start"
          : align === "right"
          ? "flex-end"
          : "center",
    };
  }
};

const rowClick = (item: any, index: number) => {
  if (props.rowClickable) {
    emit("rowClick", { entity: item, index: index });
  }
};

const getValueByKey = (obj: any, key: string) => {
  return key?.split(".")?.reduce((o, k) => (o ? o[k] : undefined), obj) || "-";
};

defineSlots<{
  [key: `column_${string}`]: (props: { entity: T; index: number }) => VNode;
  [key: `header_${string}`]: (props: {
    header: TableColumnType | null;
  }) => VNode;
}>();
</script>

<template>
  <div class="v-table">
    <div class="v-table--head">
      <div class="v-table-search">
        <Input
          rounded="full"
          size="sm"
          placeholder="Search"
          prefix_icon="search"
        />
      </div>
      <CreateRow
        v-if="isCreate"
        :label="labelCreate"
        @save="(e) => $emit('create', e)"
      />
    </div>
    <div class="v-table--body">
      <div class="v-table-wrapper">
        <table>
          <thead>
            <tr>
              <th
                v-for="(column, index) in columns"
                :key="index"
                :style="styleWidthHeader(column.width)"
              >
                <div class="v-table-th-group" :style="styleTitle(column.align)">
                  <slot :name="`header_${column.key}`" :header="column">
                    <p class="v-table-th-text">{{ column.label }}</p>
                  </slot>
                </div>
              </th>
              <th v-if="isAction">
                <slot name="header_action" :header="null" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entity, index) in entities"
              :key="`entity.${index}`"
              :class="[{ 'row-clickable': rowClickable }, 'row-table']"
              @click="rowClick(entity, index)"
            >
              <td
                v-for="(column, id) in columns"
                :key="`column.${index.toString() + id.toString()}`"
              >
                <div class="v-table-body">
                  <slot
                    :name="`column_${column.key}`"
                    :entity="entity"
                    :index="index"
                  >
                    <div :style="styleTitle(column.align)">
                      <p
                        class="v-table-body-text"
                        :title="(entity as any)?.[column.key]"
                      >
                        {{ getValueByKey(entity, column.key) || "-" }}
                      </p>
                    </div>
                  </slot>
                </div>
              </td>
              <td v-if="isAction" :class="`w-[5%]`">
                <div class="v-table-body">
                  <slot name="column_action" :entity="entity" :index="index">
                    <Icon
                      name="trash"
                      class="table-delete"
                      @click="() => $emit('delete', entity)"
                    />
                  </slot>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.v-table
  @apply flex flex-col gap-6
  &--head
    @apply flex justify-between items-center gap-5
    .v-table-search
      @apply max-w-[350px]
  &--body
    .v-table-wrapper
      @apply overflow-x-auto
      > table
        @apply w-full border-separate border-spacing-y-1
        thead
          tr
            th
              .v-table-th-group
                .v-table-th-text
                  @apply text-base font-bold text-blue-900
        tbody
          tr
            td
              @apply bg-[rgb(47,85,151,0.6)] px-3 py-1.5
              .v-table-body
                .v-table-body-text
                  @apply text-base text-neutral-50
              &:first-child
                @apply rounded-l-lg
              &:last-child
                @apply rounded-r-lg
              .table-delete
                @apply text-neutral-50 cursor-pointer w-fit
</style>
