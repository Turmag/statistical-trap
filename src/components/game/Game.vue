<template>
    <UiFlex direction="col" gap="g8" width="wfull">
        <UiFlex
            justify-content="center"
            align-items="center"
            gap="g8"
            width="wfull"
            :class="$style.titleWrapper"
        >
            <UiText size="fs24">
                Поле игры
            </UiText>
            <carbon-help
                width="25"
                height="25"
                :class="$style.icon"
                @click="showModal"
            />
        </UiFlex>
        <UiFlex align-items="center" gap="g8" width="wfull">
            <UiText size="fs24">
                {{ message }}
            </UiText>
        </UiFlex>
        <GameCards />
        <GameButtons v-if="mainStore.activeCardNumber !== -1" />
        <Modal />
    </UiFlex>
</template>

<script setup lang="ts">
import { UiFlex, UiText } from 'turmag-vue-components';
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

<style lang="scss" module>
    .titleWrapper {
        margin-top: 20px;
    }

    .icon {
        cursor: pointer;
        user-select: none;
    }
</style>
