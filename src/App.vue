<template>
    <Header />
    <Choice />
    <Game />
</template>

<script setup lang="ts">
import { useTheme } from '@/shared/useTheme';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import Choice from '@/components/Choice.vue';
import Game from '@/components/game/Game.vue';
import Header from '@/components/header/Header.vue';
import { useMainStore } from '@/stores/useMain.store';

const route = useRoute();
const mainStore = useMainStore();
useTheme();

watch(
    () => route.query.cardCount,
    value => {
        const localValue = Number(value);
        if (localValue > 2 && localValue < 21) {
            mainStore.resetGame();
            mainStore.activeChoiceIndex = localValue;
        }

        setTimeout(() => mainStore.isInitedWatch = true, 10);
    },
);
</script>
