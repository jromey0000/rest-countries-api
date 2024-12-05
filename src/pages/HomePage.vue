<script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue';
  import { getCountries } from '../api/getCountries';
  import CountryCard from '../components/CountryCard.vue';

  const REGIONS_DATA = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  export interface CountryData {
    alpha2Code: string;
    alpha3Code: string;
    altSpellings: string[];
    area: number;
    borders: string[];
    callingCodes: string[];
    capital: string | undefined;
    cioc: string;
    currencies: Currency[];
    demonym: string;
    flag: string;
    flags: Flags;
    independent: boolean;
    languages: Language[];
    latlng: number[];
    name: string;
    nativeName: string;
    numericCode: string;
    population: number;
    region: string;
    regionalBlocs: RegionalBloc[];
    subregion: string;
    timezones: string[];
    topLevelDomain: string[];
    translations: Translations;
  }

  interface Flags {
    svg: string;
    png: string;
  }

  export interface Currency {
    code: string;
    name: string;
    symbol: string;
  }

  interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }

  interface Translations {
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    hu: string;
  }

  interface RegionalBloc {
    acronym: string;
    name: string;
  }

  const countryData = ref<CountryData[] | null | undefined>(null);
  const regionsList = ref(REGIONS_DATA);
  const searchInputFilter = ref('');
  const regionSelectFilter = ref('');

  // filter country on search input and selected region
  const filteredCountryData = computed(() => {
    return countryData?.value?.filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(searchInputFilter.value.toLowerCase());

      const matchesRegion = regionSelectFilter.value
        ? country.region.toLowerCase() ===
          regionSelectFilter.value.toLowerCase()
        : true; // No filter on region if selection is empty

      return matchesSearch && matchesRegion;
    });
  });

  async function fetchCountries() {
    try {
      const data = (await getCountries()) as CountryData[];
      countryData.value = data;
    } catch (err) {
      console.log(err);
    }
  }

  onMounted(() => {
    // fetch countries when componennt mounts
    fetchCountries();
  });
</script>

<template>
  <div class="home-container">
    <div class="filters-container">
      <input
        type="text"
        placeholder="Search for a country..."
        v-model="searchInputFilter" />
      <select v-model="regionSelectFilter">
        <option value="">Filter by region</option>
        <option v-for="region in regionsList" :value="region" :key="region">
          {{ region }}
        </option>
      </select>
    </div>
    <div class="card-container">
      <div v-if="filteredCountryData?.length === 0">
        No countries found matching your criteria.
      </div>
      <CountryCard
        v-for="country in filteredCountryData"
        :key="country.name"
        :name="country.name"
        :population="country.population"
        :region="country.region"
        :capital="country.capital"
        :flag="country.flag" />
    </div>
  </div>
</template>

<style>
  .card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    padding: 48px;
  }
</style>
