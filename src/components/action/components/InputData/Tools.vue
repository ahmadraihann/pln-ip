<script setup lang="ts">
import { Select, Input, Icon } from "@/components";
import { ref } from "vue";

const emit = defineEmits(["save", "cancel"]);

const dataTools = [
  {
    label: "Seling Belt",
    value: "Seling Belt",
  },
  {
    label: "Eyebolt",
    value: "Eyebolt",
  },
  {
    label: "Chain Block",
    value: "Chain Block",
  },
];

const dataUnitTools = [
  {
    label: "PCS",
    value: "PCS",
  },
];

const modelTools = ref({
  tools: "",
  input: "",
  unit: "",
});

const resultSaved = ref<{ id: number; result: string }[]>([]);

const add = () => {
  if (
    modelTools.value.tools !== "" &&
    modelTools.value.input !== "" &&
    modelTools.value.unit !== ""
  ) {
    resultSaved.value.push({
      id: resultSaved.value.length + 1,
      result:
        modelTools.value.tools +
        " " +
        modelTools.value.input +
        " " +
        modelTools.value.unit,
    });
    modelTools.value.tools = "";
    modelTools.value.input = "";
    modelTools.value.unit = "";
  }
};

const handleDelete = (id: number) => {
  resultSaved.value = resultSaved.value.filter((item) => item.id !== id);
};

const cancel = () => {
  emit("cancel");
};

const save = () => {
  emit("save");
};
</script>

<template>
  <div class="bp-tab-content-container">
    <div class="bp-tab-content-header">
      <Select
        id="select-tools"
        v-model="modelTools.tools"
        :options="dataTools"
        size="sm"
        options_label="label"
        options_value="value"
      />
      <div class="w-[70px]">
        <Input id="input-tools" size="sm" v-model="modelTools.input" />
      </div>
      <div class="w-[100px]">
        <Select
          id="select-unit-tools"
          v-model="modelTools.unit"
          size="sm"
          :options="dataUnitTools"
          options_label="label"
          options_value="value"
        />
      </div>
      <button class="bp-trigger" @click="add">Add</button>
    </div>
    <div class="bp-tab-content-body">
      <p class="bp-tab-content-body-title">List Tools</p>
      <div class="bp-tab-content-body-list">
        <div
          v-for="(item, key) in resultSaved"
          :key="key"
          class="w-full flex justify-between items-center gap-6"
        >
          <p>{{ key + 1 }}. {{ item.result }}</p>
          <Icon
            name="trash"
            class="mr-2 cursor-pointer text-neutral-500 hover:text-neutral-950"
            @click="handleDelete(item.id)"
          />
        </div>
      </div>
    </div>
    <div class="bp-tab-content-action">
      <button class="bp-trigger" @click="cancel">Cancel</button>
      <button class="bp-trigger" @click="save">Save</button>
    </div>
  </div>
</template>

<style lang="sass"></style>
