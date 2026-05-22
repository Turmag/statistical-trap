<template>
    <div :class="$style.switchWrapper">
        <div :class="$style.switch">
            <label :class="$style.label">
                <input
                    :class="$style.input"
                    type="checkbox"
                    :checked="!mainStore.isDarkMode"
                    @change="toggle"
                >
                <span :class="$style.slider" />
            </label>
        </div>
        <mdi-refresh
            v-if="mainStore.isSavedDarkMode"
            v-tooltip="'Вернуться к системной теме'"
            :class="$style.refresh"
            @click="resetStorageDarkMode"
        />
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/useMain.store';

const mainStore = useMainStore();

const toggle = () => {
    const bodyClass = document.body.classList;
    bodyClass.contains('dark') ? bodyClass.remove('dark') : bodyClass.add('dark');
    mainStore.isDarkMode = bodyClass.contains('dark');
    localStorage.setItem('statisticalTrapDarkMode', String(mainStore.isDarkMode));
    mainStore.isSavedDarkMode = true;
};

const resetStorageDarkMode = () => {
    delete localStorage.statisticalTrapDarkMode;
    mainStore.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    mainStore.isDarkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    mainStore.isSavedDarkMode = false;
};
</script>

<style lang="scss" module>
    .switchWrapper {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .switch {
        position: relative;
        display: flex;
        align-items: center;
        width: 44px;
    }

    .label {
        display: block;
        width: 100%;
        height: 22px;
        border-radius: 50px;
        background-color: var(--color);
        cursor: pointer;
        user-select: none;
    }

    .input {
        position: absolute;
        display: none;
    }

    .slider {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50px;
        transition: 0.3s;
    }

    .slider::before {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        box-shadow: inset 4px -1px 0 0 var(--background-color);
        background-color: var(--color);
        transition: 0.3s;
    }

    input:checked ~ .slider::before {
        background-color: var(--background-color);
        transform: translateX(22px);
        box-shadow: none;
    }

    .refresh {
        outline: none;
        cursor: pointer;
        user-select: none;
    }
</style>
