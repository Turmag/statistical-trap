import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainStore = defineStore('main', () => {
    const isDarkMode = ref(false);
    const isSavedDarkMode = ref(false);
    const isInitedWatch = ref(false);
    const activeChoiceIndex = ref(3);
    const activeCardNumber = ref(-1);
    const openedCardsIndexes = ref<number[]>([]);
    const isFirstCardOpened = ref(false);
    const isInitedCards = ref(false);
    const initedClasses = ref<string[]>([]);
    const specialCardIndex = ref(-1);
    const isLost = ref(false);
    const isWin = ref(false);
    const isGameFinished = ref(false);

    const resetGame = () => {
        activeCardNumber.value = -1;
        isInitedCards.value = false;
        initedClasses.value = [];
        isFirstCardOpened.value = false;
        openedCardsIndexes.value = [];
        isLost.value = false;
        isWin.value = false;
        isGameFinished.value = false;
    };

    return {
        isDarkMode,
        isSavedDarkMode,
        isInitedWatch,
        activeChoiceIndex,
        activeCardNumber,
        openedCardsIndexes,
        isFirstCardOpened,
        isInitedCards,
        initedClasses,
        specialCardIndex,
        isLost,
        isWin,
        isGameFinished,
        resetGame,
    };
});
