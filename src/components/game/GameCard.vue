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
import allCardsClasses from '@/allCardsClasses.json';
import { useCssModule } from 'vue';
import { useMainStore } from '@/stores/useMain.store';
import { getRandom } from '@/shared/helpers';

interface IProps {
    isOpened?: boolean;
    number: number;
}

const props = withDefaults(defineProps<IProps>(), { isOpened: false });

const mainStore = useMainStore();
const $style = useCssModule();

let allCardsClassesArr = [...allCardsClasses];

let isSpecialCardChosen = false;
const specialCardClass = 'hearts_a';
let initedClasses = mainStore.initedClasses;

const cardWrapperClass = (index: number) => ({
    [$style.wrapper]: true,
    [$style.wrapperActive]: mainStore.activeCardNumber === index,
    [$style.wrapperAnimate]: mainStore.openedCardsIndexes.includes(index),
    [$style.wrapperLost]:
            mainStore.isLost && mainStore.activeCardNumber === index && !props.isOpened,
    [$style.wrapperOpened]: props.isOpened,
    [$style.wrapperRotate]: mainStore.openedCardsIndexes.includes(index),
    [$style.wrapperWin]:
            mainStore.isWin && mainStore.activeCardNumber === index || props.isOpened,
});

const initClass = (index: number) => {
    let classIndex = -1;
    if (!isSpecialCardChosen) {
        isSpecialCardChosen = getRandom(0, 1) === 1;
        if (index === mainStore.activeChoiceIndex) {
            isSpecialCardChosen = true;
        }

        if (isSpecialCardChosen) {
            mainStore.specialCardIndex = index;
            classIndex = allCardsClassesArr.indexOf(specialCardClass);
        }
    }

    if (classIndex === -1) {
        classIndex = getRandom(0, allCardsClassesArr.length - 1);
    }

    const className: string = allCardsClassesArr[classIndex];
    allCardsClassesArr.splice(classIndex, 1);

    if (!mainStore.isInitedCards) {
        initedClasses.push(className);
        if (index === mainStore.activeChoiceIndex) {
            mainStore.$patch({
                initedClasses,
                isInitedCards: true,
            });
        }
    }
};

const initClasses = () => {
    allCardsClassesArr = [...allCardsClasses];
    initedClasses = mainStore.initedClasses;
    isSpecialCardChosen = false;
    for (let i = 1; i <= mainStore.activeChoiceIndex; i++) {
        initClass(i);
    }
};

const cardInnerClass = (index: number) => {
    if (props.isOpened) return specialCardClass;
    if (!mainStore.initedClasses.length) initClasses();
    return mainStore.initedClasses[index - 1];
};

const setActive = (index: number) => {
    if (!mainStore.openedCardsIndexes.includes(index) && !props.isOpened) {
        mainStore.activeCardNumber = index;
    }
};
</script>

<style lang="scss" module>
    /* stylelint-disable no-descending-specificity */

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
