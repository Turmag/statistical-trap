<template>
    <div :class="$style.btns">
        <div v-if="store.isGameFinished" :class="$style.btn" @click="resetGame">
            Ещё раз?
        </div>
        <div v-else :class="$style.btn" @click="continueGame">
            Продолжить
        </div>
    </div>
</template>

<script setup lang="ts">
import { getRandom } from '@/assets/js/helpers';
import { mainStore } from '@/store/main';
const store = mainStore();

const continueGame = () => {
    let openedCardsIndexes: number[] = store.openedCardsIndexes;

    if (!store.isFirstCardOpened) {
        const leftNumbers: number[] = [];
        for (let i = 1; i <= store.activeChoiceIndex; i++) {
            if (i !== store.activeCardNumber && i !== store.specialCardIndex) {
                leftNumbers.push(i);
            }
        }
        if (leftNumbers.length === store.activeChoiceIndex - 1) {
            const randomIndex = getRandom(0, leftNumbers.length - 1);
            leftNumbers.splice(randomIndex, 1);
        }

        store.$patch({ isFirstCardOpened: true });

        openedCardsIndexes = [...leftNumbers];
    } else {
        const leftNumbers: number[] = [];
        for (let i = 1; i <= store.activeChoiceIndex; i++) {
            if (!openedCardsIndexes.includes(i)) {
                leftNumbers.push(i);
            }
        }

        openedCardsIndexes = [...openedCardsIndexes, ...leftNumbers];

        const isWin = store.activeCardNumber === store.specialCardIndex;
        const isLost = !isWin;

        store.$patch({
            isGameFinished: true,
            isWin,
            isLost,
        });
    }

    store.$patch({ openedCardsIndexes });
};

const resetGame = () => store.resetGame();
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
        align-items: center;
        justify-content: center;
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
