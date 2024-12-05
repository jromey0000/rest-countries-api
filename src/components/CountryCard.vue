<script lang="ts" setup>
  import { RouterLink } from 'vue-router';
  defineProps<{
    name: string;
    population: number;
    region: string;
    capital: string | undefined;
    flag: string;
  }>();
</script>

<template>
  <div class="card">
    <RouterLink :to="`/country/${name.toLowerCase()}`"
      ><img :src="flag" :alt="name"
    /></RouterLink>
    <div class="content">
      <span class="name"
        ><RouterLink :to="`/country/${name.toLowerCase()}`">{{
          name
        }}</RouterLink></span
      >
      <span class="population"><span>Population:</span> {{ population }}</span>
      <span class="region"><span>Region:</span> {{ region }}</span>
      <span class="capital"><span>Capital:</span> {{ capital }}</span>
    </div>
  </div>
</template>

<style>
  .card {
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    overflow: hidden;
    padding: 0;
    margin-bottom: 24px;

    & img {
      width: 100%;
      height: 14vw;
      object-fit: cover;
      box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    }

    & .content > span {
      display: block;

      & > span {
        font-weight: bold;
      }
    }

    & .content {
      padding: 8px;
    }

    .name {
      font-size: 20px;
      font-weight: bold;
      & a {
        color: #000;
      }
    }
  }
</style>
