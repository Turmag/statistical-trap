import { defineStore } from 'pinia';

export const mainStore = defineStore('main', {
    state: () => {
        return {
            isInitedWatch: false,
            activeChoiceIndex: 3 as number,
            activeCardNumber: -1,
            openedCardsIndexes: [] as number[],
            isFirstCardOpened: false,
            isInitedCards: false,
            initedClasses: [],
            specialCardIndex: -1,
            isLost: false,
            isWin: false,
            isGameFinished: false,
        };
    },
    actions: {
        resetGame() {
            this.activeCardNumber = -1;
            this.isInitedCards = false;
            this.initedClasses = [];
            this.isFirstCardOpened = false;
            this.openedCardsIndexes = [];
            this.isLost = false;
            this.isWin = false;
            this.isGameFinished = false;
        },
    },
});
