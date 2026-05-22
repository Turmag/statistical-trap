<template>
    <UiFlex align-items="center" gap="g8">
        <UiFlex position="relative" align-items="center" :class="$style.switch">
            <label :class="$style.label">
                <input
                    :class="$style.input"
                    type="checkbox"
                    :checked="!isDarkMode"
                    @change="toggle"
                >
                <span :class="$style.slider" />
            </label>
        </UiFlex>
        <UiTooltipWrapper v-if="isSavedDarkMode">
            <template #trigger>
                <mdi-refresh
                    :class="$style.refresh"
                    @click="resetStorageDarkMode"
                />
            </template>

            <UiTooltipContent>
                Вернуться к системной теме
            </UiTooltipContent>
        </UiTooltipWrapper>
    </UiFlex>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import {
    UiFlex,
    UiTooltipContent,
    UiTooltipWrapper,
} from 'turmag-vue-components';
import { useMainStore } from '@/stores/useMain.store';

const mainStore = useMainStore();

const isDarkMode = useStorage(mainStore.darkModeName, false);
const isSavedDarkMode = useStorage(mainStore.savedDarkModeName, false);

const toggle = () => {
    const bodyClass = document.body.classList;
    bodyClass.contains('dark') ? bodyClass.remove('dark') : bodyClass.add('dark');
    isDarkMode.value = bodyClass.contains('dark');
    isSavedDarkMode.value = true;
};

const resetStorageDarkMode = () => {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode.value ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    isSavedDarkMode.value = false;
};
</script>

<style lang="scss" module>
    .switch {
        width: 44px;
    }

    .label {
        display: block;
        width: 100%;
        height: 22px;
        border-radius: 50px;
        background-color: var(--color-text-default);
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
        box-shadow: inset 4px -1px 0 0 var(--background-color-default);
        background-color: var(--color-text-default);
        transition: 0.3s;
    }

    input:checked ~ .slider::before {
        background-color: var(--background-color-default);
        transform: translateX(22px);
        box-shadow: none;
    }

    .refresh {
        outline: none;
        cursor: pointer;
        user-select: none;
    }
</style>
