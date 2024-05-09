<template>
    <div :class="$style.cards">
        <Card v-for="card in store.activeChoiceIndex" :key="card" :number="card" />
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/game/Card.vue';

import { mainStore } from '@/store/main';
const store = mainStore();
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
