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
import { useRouter } from 'vue-router';
import { useCssModule } from 'vue';
import { useMainStore } from '@/stores/useMain.store';

const mainStore = useMainStore();
const router = useRouter();
const $style = useCssModule();

const cardQuantityClass = (index: number) => ({
    [$style.quantity]: true,
    [$style.quantityActive]: mainStore.activeChoiceIndex === index,
    [$style.quantityAnimate]: mainStore.isInitedWatch,
});

const changeActiveChoiceIndex = (index: number) => {
    mainStore.resetGame();
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
        justify-content: center;
        align-items: center;
        width: 40px;
        min-width: 40px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid;
        background-color: var(--background-color);
        font-size: 20px;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: var(--btn-hover-bg);
        }

        &:active, &.quantityActive {
            background-color: var(--btn-active-bg);
        }
    }

    .quantityAnimate {
        transition: 0.3s ease;
    }
</style>
