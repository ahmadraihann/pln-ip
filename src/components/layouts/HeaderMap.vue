<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth/stores/AuthStore";

const imgUrl = new URL("@/assets/images/logo.png", import.meta.url).href;

const authStore = useAuthStore();
const router = useRouter();

const toHome = () => {
  router.push("/");
};

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="pln-header-maps">
    <img :src="imgUrl" @click="toHome" />
    <div class="menu-bar">
      <div class="menu-wrapper">
        <div class="user-info">
          <p>User : superadmin@gmail.com</p>
        </div>
        <button class="menu-button">UBH</button>
        <button class="menu-button active">Location</button>
        <button class="menu-button" @click="router.push('/user-history')">
          User History
        </button>
        <button class="menu-button">Report</button>
        <button class="sign-out-button" @click="logout">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.pln-header-maps
  @apply w-full h-full flex justify-between
  img
    @apply h-[50px] pl-4 pt-4
  .menu-bar
    @apply h-full flex flex-col gap-2
    .menu-wrapper
      @apply flex text-sm text-neutral-50
      .user-info
        @apply w-[300px] py-2 bg-buttonGray mr-[-22px] text-center
        clip-path: polygon(7.5% 0, 100% 0, 92.5% 100%, 0% 100%)
      .menu-button
        @apply px-6 py-2 bg-buttonGray w-[150px] mr-[-22px]
        clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%)
        &:hover
          @apply bg-cyan-500
      .active
        @apply bg-cyan-500
      .sign-out-button
        @apply px-6 py-2 bg-red-500 w-[150px]
        clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%)
        &:hover
          @apply bg-red-700
</style>
