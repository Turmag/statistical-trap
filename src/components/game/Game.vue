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
        <GameCards />
        <GameButtons v-if="mainStore.activeCardNumber !== -1" />
        <Modal />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import GameButtons from '@/components/game/GameButtons.vue';
import GameCards from '@/components/game/GameCards.vue';
import Modal from '@/components/Modal.vue';
import { useMainStore } from '@/stores/useMain.store';
import { useModalStore } from '@/stores/useModal.store';

const mainStore = useMainStore();
const modalStore = useModalStore();

const message = computed(() => mainStore.isWin
    ? 'Вы победили'
    : mainStore.isLost
        ? 'Вы проиграли'
        : mainStore.isFirstCardOpened
            ? 'Вы можете изменить свой выбор'
            : 'Выберите карту');

const showModal = () => modalStore.isShowModal = true;
</script>

<style lang="scss" scoped>
    .game {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-top: 20px;
        font-size: 20px;

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
