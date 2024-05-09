<template>
    <div :class="$style.choice">
        <div :class="$style.title">
            Количество карт:
        </div>
        <div :class="$style.wrapper">
            <div
                v-for="item in [...Array(21).keys()].slice(3)"
                :key="item"
                :class="cardQuantityClass(item)"
                @click="changeActiveChoiceIndex(item)"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';
import { useRouter } from 'vue-router';
import { mainStore } from '@/store/main';

const store = mainStore();
const router = useRouter();
const $style = useCssModule();

const cardQuantityClass = (index: number) => ({
    [$style.quantity]: true,
    [$style.quantityActive]: store.activeChoiceIndex === index,
    [$style.quantityAnimate]: store.isInitedWatch,
});

const changeActiveChoiceIndex = (index: number) => {
    store.resetGame();
    router.push({
        path: '/statistical-trap/',
        query: { cardCount: index }, 
    });
};
</script>

<style lang="scss" module>
    .choice {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .title {
        font-size: 25px;
        font-weight: bold;
    } 

    .wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .quantity {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        min-width: 40px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid;
        background-color: #fff;
        font-size: 20px;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: #a9f5b6;
        }

        &:active{
            background-color: #8cf8c9;
        }
    }

    .quantityActive {
        background-color: #8cf8c9;
    }

    .quantityAnimate {
        transition: 0.3s ease;
    }
</style>
