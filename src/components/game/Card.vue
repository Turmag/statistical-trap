<template>
    <div :class="cardWrapperClass(number)" @click="setActive(number)">
        <div :class="$style.card">
            <div :class="$style.cardInner" />
        </div>
        <div :class="$style.cardBack">
            <div :class="[$style.cardInner, cardInnerClass(number)]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getRandom } from '@/assets/js/helpers';
import allCardsClasses from '@/allCardsClasses.json';
import { mainStore } from '@/store/main';
import { useCssModule } from 'vue';

interface Props {
    number: number;
    isOpened?: boolean;
}

const props = withDefaults(defineProps<Props>(), { isOpened: false });

const store = mainStore();
const $style = useCssModule();

let allCardsClassesArr = allCardsClasses.slice();

let isSpecialCardChosen = false;
const specialCardClass = 'hearts_a';
let initedClasses = store.initedClasses;

const cardWrapperClass = (index: number) => {
    return {
        [$style.wrapper]: true,
        [$style.wrapperAnimate]: store.openedCardsIndexes.includes(index),
        [$style.wrapperRotate]: store.openedCardsIndexes.includes(index),
        [$style.wrapperActive]: store.activeCardNumber === index,
        [$style.wrapperWin]:
            (store.isWin && store.activeCardNumber === index) || props.isOpened,
        [$style.wrapperLost]:
            store.isLost && store.activeCardNumber === index && !props.isOpened,
        [$style.wrapperOpened]: props.isOpened,
    };
};

const initClass = (index: number) => {
    let classIndex = -1;
    if (!isSpecialCardChosen) {
        isSpecialCardChosen = getRandom(0, 1) === 1;
        if (index === store.activeChoiceIndex) {
            isSpecialCardChosen = true;
        }

        if (isSpecialCardChosen) {
            store.specialCardIndex = index;
            classIndex = allCardsClassesArr.indexOf(specialCardClass);
        }
    }

    if (classIndex === -1) {
        classIndex = getRandom(0, allCardsClassesArr.length - 1);
    }

    const className: string = allCardsClassesArr[classIndex];
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

const cardInnerClass = (index: number) => {
    if (props.isOpened) return specialCardClass;
    if (!store.initedClasses.length) initClasses();
    return store.initedClasses[index - 1];
};

const setActive = (index: number) => {
    if (!store.openedCardsIndexes.includes(index) && !props.isOpened) {
        store.activeCardNumber = index;
    }
};
</script>

<style lang="scss" module>
    .wrapper {
        position: relative;
        width: 200px;
        height: 291px;
        padding: 10px;
        border-radius: 10px;
    }

    .wrapperRotate {
        .card {
            transform: rotateY(180deg);
        }

        .cardBack {
            transform: rotateY(0);
        }
    }

    .wrapperAnimate {
        .card {
            transition: background-color 0.3s, transform 1s;
        }

        .cardBack {
            transition: background-color 0.3s, transform 1s;
        }
    }

    .wrapperOpened {
        .card {
            transform: rotateY(180deg);
        }

        .cardBack {
            transform: rotateY(0);
        }
    }

    .wrapperActive {
        .card, .cardBack {
            background-color: orange;
        }
    }

    .wrapperWin {
        .card, .cardBack {
            background-color: #8cf8c9;
        }
    }

    .wrapperLost {
        .card, .cardBack {
            background-color: #fc6f6f;
        }
    }

    .card {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 291px;
        padding: 10px;
        border-radius: 10px;
        border: solid 1px;
        background-color: #fff;
        transition: background-color 0.3s;
        cursor: pointer;
        backface-visibility: hidden;
        user-select: none;

        &:hover:not(.wrapperActive .card) {
            background-color: #ffe754;
        }

        &:active {
            background-color: orange;
        }
    }

    .cardInner {
        width: 200px;
        height: 291px;
        border-radius: 10px;
        background-image: url("@/assets/img/CardsCanvas.png");
    }

    .cardBack {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 291px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid;
        background: #fff;
        transform: rotateY(180deg);
        transition: background-color 0.3s;
        backface-visibility: hidden;
    }
</style>
