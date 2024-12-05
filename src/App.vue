<script lang="ts" setup>
  import { ref } from 'vue';
  import SunIcon from './assets/sun.svg';

  const systemTheme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const darkModeThemeActive = ref(systemTheme || false);

  const toggleDarkMode = () =>
    (darkModeThemeActive.value = !darkModeThemeActive.value);
</script>

<template>
  <div class="app-parent" :class="{ 'dark-mode': darkModeThemeActive }">
    <header class="app-parent__header">
      <h1>Where in the world?</h1>
      <button @click="toggleDarkMode" class="theme-button"><SunIcon /></button>
    </header>

    <router-view />
  </div>
</template>

<style lang="scss">
  .app-parent__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    padding: 8px 16px;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

    & h1 {
      font-size: 24px;
    }
  }

  .filters-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 48px;

    & input,
    & select {
      height: 50px;
      width: 350px;
      padding: 8px;
      font-size: 16px;
      border-radius: 8px;
    }
  }

  .theme-button {
    padding: 0;
  }
</style>
