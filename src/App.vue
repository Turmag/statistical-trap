<template>
    <Header />
    <Choice />
    <Game />
</template>

<script setup lang="ts">
import Header from '@/components/header/Header.vue';
import Choice from '@/components/Choice.vue';
import Game from '@/components/game/Game.vue';
import { useRoute } from 'vue-router';
import { mainStore } from '@/store/main';
import { watch } from 'vue';
import { useTheme } from '@/assets/js/theme';

const route = useRoute();
const store = mainStore();
useTheme();

watch(
    () => route.query.cardCount,
    value => {
        const val = Number(value);
        if (val > 2 && val < 21) {
            store.resetGame();
            store.activeChoiceIndex = val;
        }

        setTimeout(() => store.isInitedWatch = true, 10);
    },
);
</script>
