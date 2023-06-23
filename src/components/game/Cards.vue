<template>
    <div class="cards">
        <Card v-for="card in store.activeChoiceIndex" :key="card" :number="card" />
    </div>
</template>

<script setup>
    import Card from './Card.vue';

    import { mainStore } from '../../store/main';
    const store = mainStore();
</script>

<style lang="scss" scoped>
    .cards {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
        margin-top: 30px;
    }
</style>
