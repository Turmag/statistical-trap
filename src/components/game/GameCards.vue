<template>
    <UiFlex
        justify-content="center"
        wrap="wrap"
        gap="g20"
        width="wfull"
        :class="$style.cards"
    >
        <GameCard v-for="card in mainStore.activeChoiceIndex" :key="card" :number="card" />
    </UiFlex>
</template>

<script setup lang="ts">
import { UiFlex } from 'turmag-vue-components';
import GameCard from '@/components/game/GameCard.vue';
import { useMainStore } from '@/stores/useMain.store';

const mainStore = useMainStore();
</script>

<style lang="scss" module>
    .cards {
        margin-top: 30px;
    }
</style>
