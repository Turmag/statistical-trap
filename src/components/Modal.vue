<template>
    <vue-final-modal v-model="store.isShowModal" :classes="$style.modal" :content-class="$style.content">
        <div :class="$style.close" @click="closeModal">
            <mdi-close color="#111" width="20" height="20" />
        </div>
        <div :class="$style.inner">
            <div :class="$style.title">
                Что это такое?
            </div>
            <p>В этой игре нужно угадать, где находится приз. Если что, то призовая карта эта:</p>
            <div :class="$style.centerWrapper">
                <Card :number="1" :is-opened="true" />
            </div>
            <p>
                Выберите карту и думайте, нужно ли менять её после выбора. Получится ли вам угадать
                карту?
            </p>
            <p>
                Дело всё в том, что это
                <a
                    href="https://ru.wikipedia.org/wiki/Парадокс_Монти_Холла"
                    target="_blank"
                >
                    парадокс Монти Холла
                </a>.
            </p>
            <p>
                Предлагается сделать выбор, а затем его изменить при очень интересном условии. А по
                всем вопросам и предложениям пишите
                <a href="https://t.me/Turmag" target="_blank">
                    мне в Telegram
                </a>. Пробуйте и
                наслаждайтесь!
            </p>
            <div :class="$style.centerWrapper">
                <div :class="$style.btn" @click="closeModal">
                    Ага
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup lang="ts">
import Card from '@/components/game/Card.vue';
import { modalStore } from '@/store/modal';

const store = modalStore();
const closeModal = () => store.isShowModal = false;
</script>

<style lang="scss" module>
    .modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #ccc;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: #ddd;
        }

        &:active {
            background-color: #eee;
        }
    }

    .title {
        text-align: center;
        font-size: 25px;
        font-weight: bold;
    }

    .content {
        position: relative;
        overflow: hidden;
        width: 550px;
        min-height: 500px;
        max-height: 680px;
        padding: 60px 16px 16px;
        border-radius: 20px;
        background-color: #fff;
        color: #111;
        box-shadow: 0 4px 32px rgb(0 0 0 / 10%);
    }

    .inner {
        overflow: auto;
        height: 100%;
        max-height: 670px;
        padding-right: 16px;

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            background: #ccc;
        }

        &::-webkit-scrollbar-track {
            border-radius: 8px;
            background: #fff;
        }
    }

    .centerWrapper {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .btn {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 70px;
        height: 40px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid;
        background-color: #fff;
        font-size: 20px;
        transition: 0.3s ease;
        cursor: pointer;
        user-select: none;

        &:hover {
            background-color: #a9f5b6;
        }

        &:active {
            background-color: #8cf8c9;
        }
    }
</style>
