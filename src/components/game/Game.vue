<template>
    <div class="game">
        <div class="game__title game__title--center">
            <div class="game__title-text">
                Поле игры
            </div>
            <carbon-help
                class="game__title-icon"
                width="25"
                height="25"
                @click="showModal"
            />
        </div>
        <div class="game__title game__title--left">
            <div class="game__title-text" v-text="message" />
        </div>
        <Cards />
        <Btns v-if="store.activeCardNumber !== -1" />
        <Modal />
    </div>
</template>

<script setup lang="ts">
import Cards from '@/components/game/Cards.vue';
import Btns from '@/components/game/Btns.vue';
import Modal from '@/components/Modal.vue';
import { computed } from 'vue';
import { mainStore } from '@/store/main';
import { modalStore } from '@/store/modal';

const store = mainStore();
const storeModal = modalStore();

const message = computed(() => {
    const text = store.isWin
        ? 'Вы победили'
        : store.isLost
            ? 'Вы проиграли'
            : store.isFirstCardOpened
                ? 'Вы можете изменить свой выбор'
                : 'Выберите карту';
    return text;
});

const showModal = () => storeModal.isShowModal = true;
</script>

<style lang="scss" scoped>
    .game {
        display: flex;
        width: 100%;
        margin-top: 20px;
        font-size: 20px;
        flex-direction: column;
        gap: 10px;

        &__title {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;

            &--center {
                justify-content: center;
            }
        }

        &__title-text {
            font-size: 25px;
        }

        &__title-icon {
            cursor: pointer;
        }
    }
</style>
