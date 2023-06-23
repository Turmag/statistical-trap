<template>
    <div class="btns">
        <div v-if="store.isGameFinished" class="btn" @click="resetGame">Ещё раз?</div>
        <div v-else class="btn" @click="continueGame">Продолжить</div>
    </div>
</template>

<script setup lang="ts">
    import { getRandom } from '../../helpers/functions';
    import { mainStore } from '../../store/main';
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

            store.$patch({
                isFirstCardOpened: true,
            });

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

        store.$patch({
            openedCardsIndexes,
        });
    };

    const resetGame = () => {
        store.resetGame();
    };
</script>

<style lang="scss" scoped>
    .btns {
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
        height: 40px;
        margin-top: 20px;
        padding: 10px;
        border: 1px solid;
        background-color: #fff;
        border-radius: 5px;
        font-size: 20px;
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;

        &:hover {
            background-color: #a9f5b6;
        }

        &:active,
        &--active {
            background-color: #8cf8c9;
        }
    }
</style>
