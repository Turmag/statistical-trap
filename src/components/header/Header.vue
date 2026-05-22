<template>
    <header :class="$style.header">
        <h1>Статистическая «ловушка»</h1>
        <HeaderSwitch />
    </header>
</template>

<script setup lang="ts">
import HeaderSwitch from '@/components/header/HeaderSwitch.vue';
</script>

<style lang="scss" module>
    .header {
        display: flex;
        gap: 16px;
    }
</style>
