<template>
    <header :class="$style.header">
        <h1>Статистическая «ловушка»</h1>
        <Switch />
    </header>
</template>

<script setup lang="ts">
import Switch from '@/components/header/Switch.vue';
</script>

<style lang="scss" module>
    .header {
        display: flex;
        gap: 16px;
    }
</style>
