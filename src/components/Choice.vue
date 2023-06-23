<template>
    <div class="choice">
        <div class="choice__title">Количество карт:</div>
        <div class="choice__card-quantity-wrapper">
            <div
                class="choice__card-quantity"
                :class="cardQuantityClass(item)"
                v-for="item in [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
                :key="item"
                @click="changeActiveChoiceIndex(item)"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { mainStore } from '../store/main';
    import { router } from '../router';
    const store = mainStore();

    const cardQuantityClass = index => ({
        'choice__card-quantity--active': store.activeChoiceIndex === index,
        'choice__card-quantity--animate': store.isInitedWatch,
    });

    const changeActiveChoiceIndex = index => {
        store.resetGame();
        router.push({ path: '/statistical-trap/', query: { cardCount: index } });
    };
</script>

<style lang="scss" scoped>
    .choice {
        display: flex;
        flex-direction: column;
        gap: 10px;

        &__title {
            font-size: 25px;
            font-weight: bold;
        }

        &__card-quantity-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        &__card-quantity {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            min-width: 40px;
            height: 40px;
            border: 1px solid;
            background-color: #fff;
            border-radius: 5px;
            font-size: 20px;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: #a9f5b6;
            }

            &:active,
            &--active {
                background-color: #8cf8c9;
            }

            &--animate {
                transition: 0.3s ease;
            }
        }
    }
</style>
