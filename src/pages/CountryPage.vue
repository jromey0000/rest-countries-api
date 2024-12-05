<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter, RouterLink } from 'vue-router';
  import { getCountries } from '../api/getCountries';
  import { CountryData } from './HomePage.vue';

  defineProps({
    name: String,
  });

  const route = useRoute();
  const router = useRouter();
  const country = ref();
  const borderCountryLinks = ref<{ abbreviation: string; link: string }[]>([]);

  async function fetchCountry(name: string) {
    try {
      const data = (await getCountries()) as CountryData[];

      const fetchedCountry = data.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );

      country.value = fetchedCountry || null;

      if (fetchedCountry?.borders) {
        borderCountryLinks.value = fetchedCountry.borders.map((border) => {
          const borderCountry = data.find(
            (c) => c.alpha3Code.toLowerCase() === border.toLowerCase()
          );
          return borderCountry
            ? {
                abbreviation: border,
                link: `/country/${borderCountry.name.toLowerCase()}`,
              }
            : { abbreviation: border, link: '' };
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const goBack = () => router.back();

  const getCountry = () => {
    const name = route.params.name as string;
    fetchCountry(name);
  };

  onMounted(() => getCountry());

  watch(() => route.params.name, getCountry);
</script>

<template>
  <div>
    <div class="nav-container">
      <button @click="goBack()">Back</button>
    </div>
    <div class="country-content-container">
      <div>
        <img :src="country?.flag" :alt="country?.name" class="country-flag" />
      </div>
      <div class="content">
        <div class="column-1">
          <div><span>Native name:</span>{{ country?.name }}</div>
          <div><span>Population:</span>{{ country?.population }}</div>
          <div><span>Region:</span>{{ country?.region }}</div>
          <div><span>Sub Region:</span>{{ country?.subregion }}</div>
          <div><span>Capital:</span>{{ country?.capital }}</div>
        </div>
        <div class="column-2">
          <div>
            <span>Top Level Domain:</span>
            <span v-for="domain in country?.topLevelDomain">{{ domain }}</span>
          </div>
          <div>
            <span>Currencies:</span>
            <span v-for="currency in country?.currencies">
              {{ currency.name }}</span
            >
          </div>
          <div>
            <span>Languages:</span>
            <span v-for="language in country?.languages">{{
              language.name
            }}</span>
          </div>
        </div>

        <div v-if="country?.borders?.length > 0" class="borders-container">
          <span>Borders:</span>
          <span v-for="border in borderCountryLinks">
            <RouterLink :to="border.link">
              <button>
                {{ border.abbreviation }}
              </button>
            </RouterLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .nav-container {
    padding: 24px;
  }
  .country-content-container {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 5;
    padding: 24px;

    & .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    & .content > div {
      display: block;
    }

    & .content div > span:first-child {
      font-weight: bold;
      margin-right: 5px;
    }
  }

  .country-flag {
    max-width: 500px;
  }

  .borders-container {
    grid-row: 2 / 3;
    grid-column: 1 / 3;
  }

  .borders-container span:not(:first-child) button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>
