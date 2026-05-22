<template>
    <div :class="$style.btns">
        <div v-if="mainStore.isGameFinished" :class="$style.btn" @click="resetGame">
            Ещё раз?
        </div>
        <div v-else :class="$style.btn" @click="continueGame">
            Продолжить
        </div>
    </div>
</template>

<script setup lang="ts">
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
    .btns {
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;
    }

    .btn {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 40px;
        height: 40px;
        margin-top: 20px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid;
        background-color: var(--background-color);
        font-size: 20px;
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: var(--btn-hover-bg);
        }

        &:active {
            background-color: var(--btn-active-bg);
        }
    }
</style>
