<template>
    <div class="card-wrapper" :class="cardWrapperClass(number)" @click="setActive(number)">
        <div class="card">
            <div class="card__inner"></div>
        </div>
        <div class="card-back">
            <div class="card__inner" :class="cardInnerClass(number)"></div>
        </div>
    </div>
</template>

<script setup>
    import { getRandom } from '../../helpers/functions';
    import allCardsClasses from '../../../allCardsClasses.json';
    import { mainStore } from '../../store/main';
    const store = mainStore();
    const props = defineProps({
        number: {
            type: Number,
            default: 0,
        },
        isOpened: {
            type: Boolean,
            default: false,
        },
    });

    let allCardsClassesArr = allCardsClasses.slice();

    let isSpecialCardChosen = false;
    const specialCardClass = 'hearts_a';
    let initedClasses = store.initedClasses;

    const cardWrapperClass = index => {
        return {
            'card-wrapper--animate': store.openedCardsIndexes.includes(index),
            'card-wrapper--rotate': store.openedCardsIndexes.includes(index),
            'card-wrapper--active': store.activeCardNumber === index,
            'card-wrapper--win':
                (store.isWin && store.activeCardNumber === index) || props.isOpened,
            'card-wrapper--lost':
                store.isLost && store.activeCardNumber === index && !props.isOpened,
            'card-wrapper--opened': props.isOpened,
        };
    };

    const initClass = index => {
        let classIndex = -1;
        if (!isSpecialCardChosen) {
            isSpecialCardChosen = getRandom(0, 1) === 1;
            if (index === store.activeChoiceIndex) {
                isSpecialCardChosen = true;
            }

            if (isSpecialCardChosen) {
                store.$patch({
                    specialCardIndex: index,
                });
                classIndex = allCardsClassesArr.indexOf(specialCardClass);
            }
        }

        if (classIndex === -1) {
            classIndex = getRandom(0, allCardsClassesArr.length - 1);
        }

        let className = allCardsClassesArr[classIndex];
        allCardsClassesArr.splice(classIndex, 1);

        if (!store.isInitedCards) {
            initedClasses.push(className);
            if (index === store.activeChoiceIndex) {
                store.$patch({
                    isInitedCards: true,
                    initedClasses,
                });
            }
        }
    };

    const initClasses = () => {
        allCardsClassesArr = allCardsClasses.slice();
        initedClasses = store.initedClasses;
        isSpecialCardChosen = false;
        for (let i = 1; i <= store.activeChoiceIndex; i++) {
            initClass(i);
        }
    };

    const cardInnerClass = index => {
        if (props.isOpened) {
            return specialCardClass;
        }
        if (!store.initedClasses.length) {
            initClasses();
        }
        return store.initedClasses[index - 1];
    };

    const setActive = index => {
        if (!store.openedCardsIndexes.includes(index) && !props.isOpened) {
            store.$patch({
                activeCardNumber: index,
            });
        }
    };
</script>

<style lang="scss" scoped>
    .card-wrapper {
        position: relative;
        width: 200px;
        height: 291px;
        padding: 10px;
        border-radius: 10px;

        &--rotate {
            .card {
                transform: rotateY(180deg);
            }

            .card-back {
                transform: rotateY(0);
            }
        }

        &--animate {
            .card {
                transition: background-color 0.3s, transform 1s;
            }

            .card-back {
                transition: background-color 0.3s, transform 1s;
            }
        }

        &--opened {
            .card {
                transform: rotateY(180deg);
            }

            .card-back {
                transform: rotateY(0);
            }
        }

        &--active {
            .card,
            .card-back {
                background-color: orange;
            }
        }

        &--win {
            .card,
            .card-back {
                background-color: #8cf8c9;
            }
        }

        &--lost {
            .card,
            .card-back {
                background-color: #fc6f6f;
            }
        }
    }

    .card {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 291px;
        border: solid 1px;
        border-radius: 10px;
        background-color: #fff;
        padding: 10px;
        backface-visibility: hidden;
        transition: background-color 0.3s;
        cursor: pointer;
        user-select: none;

        &:hover:not(.card-wrapper--active .card) {
            background-color: #ffe754;
        }

        &:active {
            background-color: orange;
        }

        &__inner {
            width: 200px;
            height: 291px;
            border-radius: 10px;
            background-image: url(../../assets/img/CardsCanvas.png);
        }
    }

    .card-back {
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        width: 200px;
        height: 291px;
        padding: 10px;
        border: 1px solid;
        border-radius: 10px;
        transition: background-color 0.3s;
    }

    .spades_2,
    .spades_3,
    .spades_4,
    .spades_5,
    .spades_6,
    .spades_7,
    .spades_8,
    .spades_9,
    .spades_10,
    .spades_j,
    .spades_q,
    .spades_k,
    .spades_a {
        background-position-y: -291px;
    }
    .club_2,
    .club_3,
    .club_4,
    .club_5,
    .club_6,
    .club_7,
    .club_8,
    .club_9,
    .club_10,
    .club_j,
    .club_q,
    .club_k,
    .club_a {
        background-position-y: -582px;
    }
    .hearts_2,
    .hearts_3,
    .hearts_4,
    .hearts_5,
    .hearts_6,
    .hearts_7,
    .hearts_8,
    .hearts_9,
    .hearts_10,
    .hearts_j,
    .hearts_q,
    .hearts_k,
    .hearts_a {
        background-position-y: -873px;
    }
    .diamonds_2,
    .diamonds_3,
    .diamonds_4,
    .diamonds_5,
    .diamonds_6,
    .diamonds_7,
    .diamonds_8,
    .diamonds_9,
    .diamonds_10,
    .diamonds_j,
    .diamonds_q,
    .diamonds_k,
    .diamonds_a {
        background-position-y: -1164px;
    }
    .jokerBlack,
    .jokerRed {
        background-position-y: -1455px;
    }
    .spades_3,
    .club_3,
    .hearts_3,
    .diamonds_3,
    .jokerRed {
        background-position-x: -200px;
    }
    .spades_4,
    .club_4,
    .hearts_4,
    .diamonds_4 {
        background-position-x: -400px;
    }
    .spades_5,
    .club_5,
    .hearts_5,
    .diamonds_5 {
        background-position-x: -600px;
    }
    .spades_6,
    .club_6,
    .hearts_6,
    .diamonds_6 {
        background-position-x: -800px;
    }
    .spades_7,
    .club_7,
    .hearts_7,
    .diamonds_7 {
        background-position-x: -1000px;
    }
    .spades_8,
    .club_8,
    .hearts_8,
    .diamonds_8 {
        background-position-x: -1200px;
    }
    .spades_9,
    .club_9,
    .hearts_9,
    .diamonds_9 {
        background-position-x: -1400px;
    }
    .spades_10,
    .club_10,
    .hearts_10,
    .diamonds_10 {
        background-position-x: -1600px;
    }
    .spades_j,
    .club_j,
    .hearts_j,
    .diamonds_j {
        background-position-x: -1800px;
    }
    .spades_q,
    .club_q,
    .hearts_q,
    .diamonds_q {
        background-position-x: -2000px;
    }
    .spades_k,
    .club_k,
    .hearts_k,
    .diamonds_k {
        background-position-x: -2200px;
    }
    .spades_a,
    .club_a,
    .hearts_a,
    .diamonds_a {
        background-position-x: -2400px;
    }
</style>
