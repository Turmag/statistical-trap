<template>
    <h1>Статистическая «ловушка»</h1>
    <Choice />
    <Game />
</template>

<script setup lang="ts">
    import Choice from '@/components/Choice.vue';
    import Game from '@/components/game/Game.vue';
    import { useRoute } from 'vue-router';
    import { mainStore } from '@/store/main';
    import { watch } from 'vue';
    const route = useRoute();
    const store = mainStore();

    watch(
        () => route.query.cardCount,
        val => {
            if (val > 2 && val < 21) {
                store.resetGame();
                store.$patch({
                    activeChoiceIndex: Number(val),
                });
            }

            setTimeout(() => {
                store.$patch({
                    isInitedWatch: true,
                });
            }, 10);
        }
    );
</script>
