<template>
    <UiFlex justify-content="center" gap="g8" width="wfull">
        <UiFlex
            v-if="mainStore.isGameFinished"
            justify-content="center"
            align-items="center"
            padding="p8"
            radius="r4"
            :class="$style.button"
            @click="resetGame"
        >
            Ещё раз?
        </UiFlex>
        <UiFlex
            v-else
            justify-content="center"
            align-items="center"
            padding="p8"
            radius="r4"
            :class="$style.button"
            @click="continueGame"
        >
            Продолжить
        </UiFlex>
    </UiFlex>
</template>

<script setup lang="ts">
import { UiFlex } from 'turmag-vue-components';
import { useMainStore } from '@/stores/useMain.store';
import { getRandom } from '@/shared/helpers';

const mainStore = useMainStore();

const continueGame = () => {
    let openedCardsIndexes: number[] = mainStore.openedCardsIndexes;

    if (mainStore.isFirstCardOpened) {
        const leftNumbers: number[] = [];
        for (let i = 1; i <= mainStore.activeChoiceIndex; i++) {
            if (!openedCardsIndexes.includes(i)) {
                leftNumbers.push(i);
            }
        }

        openedCardsIndexes = [...openedCardsIndexes, ...leftNumbers];

        const isWin = mainStore.activeCardNumber === mainStore.specialCardIndex;
        const isLost = !isWin;

        mainStore.$patch({
            isGameFinished: true,
            isLost,
            isWin,
        });
    } else {
        const leftNumbers: number[] = [];
        for (let i = 1; i <= mainStore.activeChoiceIndex; i++) {
            if (i !== mainStore.activeCardNumber && i !== mainStore.specialCardIndex) {
                leftNumbers.push(i);
            }
        }
        if (leftNumbers.length === mainStore.activeChoiceIndex - 1) {
            const randomIndex = getRandom(0, leftNumbers.length - 1);
            leftNumbers.splice(randomIndex, 1);
        }

        mainStore.$patch({ isFirstCardOpened: true });

        openedCardsIndexes = [...leftNumbers];
    }

    mainStore.$patch({ openedCardsIndexes });
};

const resetGame = () => mainStore.resetGame();
</script>

<style lang="scss" module>
    .button {
        box-sizing: border-box;
        min-width: 40px;
        height: 40px;
        margin-top: 20px;
        border: 1px solid;
        background-color: var(--background-color-default);
        font-size: 20px;
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: var(--background-color-button-hover);
        }

        &:active {
            background-color: var(--background-color-button-active);
        }
    }
</style>
