<template>
    <div :class="$style.cards">
        <GameCard v-for="card in mainStore.activeChoiceIndex" :key="card" :number="card" />
    </div>
</template>

<script setup lang="ts">
import GameCard from '@/components/game/GameCard.vue';
import { useMainStore } from '@/stores/useMain.store';

const mainStore = useMainStore();
</script>

<style lang="scss" module>
    .cards {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
        margin-top: 30px;
    }
</style>
