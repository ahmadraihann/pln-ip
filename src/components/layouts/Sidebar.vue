<script setup lang="ts">
import { Menus } from "@/constants/Menus";
import { Icon } from "@/components";
import { RouterLink, useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const selected_menu = ref<number | null>(null);

const openChildren = (e: { id: number; name: string; url: string }) => {
  selected_menu.value = e.id;
};
</script>

<template>
  <div class="sidebar-main">
    <p class="sidebar-main--title">MAIN MENU</p>
    <div class="sidebar-main--menus">
      <div v-for="(item, key) in Menus" :key="key" class="flex flex-col gap-2">
        <RouterLink
          v-if="!item.children"
          :to="
            item.url === '/'
              ? `/${route.params?.id}/create/unit/${route.params?.scope}`
              : `/${route.params?.id}/create/unit/${route.params?.scope}/${route?.params?.menu}${item.url}`
          "
          :class="
            item.url === '/'
              ? ''
              : route.path.includes(item.url)
              ? 'menu-active'
              : ''
          "
          class="menu-item"
          @click="selected_menu = null"
        >
          <Icon :name="item.icon" class="menu-icon" />
          <p class="menu-title">{{ item.name }}</p>
        </RouterLink>
        <div v-else class="flex flex-col gap-2" @click="openChildren(item)">
          <div
            class="menu-item"
            :class="
              selected_menu === item.id || route.path.includes('add-scope')
                ? 'menu-active'
                : ''
            "
          >
            <Icon :name="item.icon" class="menu-icon" />
            <p class="menu-title">{{ item.name }}</p>
          </div>
          <div
            v-if="selected_menu === item.id || route.path.includes('add-scope')"
            class="pl-5 flex flex-col gap-2"
          >
            <RouterLink
              v-for="(element, index) in item.children"
              :key="index"
              :to="
                item.url === '/'
                  ? `/${route.params?.id}/create/unit/${route.params?.scope}`
                  : `/${route.params?.id}/create/unit/${route.params?.scope}/${route?.params?.menu}${element.url}`
              "
              :class="
                item.url === '/'
                  ? ''
                  : route.path.includes(element.url)
                  ? 'menu-active'
                  : ''
              "
              class="menu-item"
            >
              <p class="menu-title">{{ element.name }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.sidebar-main
  @apply w-[240px] z-[2] fixed top-[80px] bottom-[10px] left-[10px] bg-blue-900 rounded-lg px-6 py-4
  &--title
    @apply text-lg font-bold text-neutral-50
  &--menus
    @apply flex flex-col gap-2 mt-6
    .menu-active
      .menu-icon
        @apply text-cyan-500 #{!important}
      .menu-title
        @apply text-cyan-500 #{!important}
    .menu-item
      @apply flex items-center gap-1 cursor-pointer w-full
      .menu-icon
        @apply text-neutral-50 text-base
      .menu-title
        @apply text-neutral-50 text-base font-bold
      &:hover
        .menu-icon
          @apply text-cyan-500
        .menu-title
          @apply text-cyan-500
</style>
