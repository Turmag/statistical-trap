<template>
    <vue-final-modal v-model="store.isShowModal" classes="modal" content-class="modal__content">
        <div class="modal__close" @click="closeModal">
            <IconClose color="#111" width="20" height="20" />
        </div>
        <div class="modal__content-inner">
            <div class="modal__title">Что это такое?</div>
            <p>В этой игре нужно угадать, где находится приз. Если что, то призовая карта эта:</p>
            <div class="modal__center-wrapper">
                <Card :number="1" :isOpened="true" />
            </div>
            <p>
                Выберите карту и думайте, нужно ли менять её после выбора. Получится ли вам угадать
                карту?
            </p>
            <p>
                Дело всё в том, что это
                <a href="https://ru.wikipedia.org/wiki/Парадокс_Монти_Холла" target="_blank"
                    >парадокс Монти Холла</a
                >.
            </p>
            <p>
                Предлагается сделать выбор, а затем его изменить при очень интересном условии. А по
                всем вопросам и предложениям пишите
                <a href="https://t.me/Turmag" target="_blank">мне в Telegram</a>. Пробуйте и
                наслаждайтесь!
            </p>
            <div class="modal__center-wrapper">
                <div class="modal__btn" @click="closeModal">Ага</div>
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup>
    import Card from './game//Card.vue';
    import IconClose from '~icons/mdi/close';
    import { modalStore } from '../store/modal';
    const store = modalStore();

    const closeModal = () => {
        store.$patch({
            isShowModal: false,
        });
    };
</script>

<style lang="scss">
    .modal {
        display: flex;
        justify-content: center;
        align-items: center;

        &__close {
            position: absolute;
            right: 16px;
            top: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background-color: #ccc;
            border-radius: 50%;
            cursor: pointer;
            user-select: none;

            &:hover {
                background-color: #ddd;
            }

            &:active {
                background-color: #eee;
            }
        }

        &__title {
            font-size: 25px;
            font-weight: bold;
            text-align: center;
        }

        &__content {
            position: relative;
            width: 550px;
            min-height: 500px;
            max-height: 680px;
            padding: 60px 16px 16px 16px;
            overflow: hidden;
            background-color: #fff;
            color: #111;
            border-radius: 20px;
            box-shadow: 0 4px 32px rgb(0 0 0 / 10%);
        }

        &__content-inner {
            height: 100%;
            max-height: 670px;
            padding-right: 16px;
            overflow: auto;

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

        &__center-wrapper {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        &__btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 70px;
            height: 40px;
            padding: 10px;
            border: 1px solid;
            background-color: #fff;
            border-radius: 5px;
            font-size: 20px;
            transition: 0.3s ease;
            cursor: pointer;
            user-select: none;
            box-sizing: border-box;

            &:hover {
                background-color: #a9f5b6;
            }

            &:active,
            &--active {
                background-color: #8cf8c9;
            }
        }
    }
</style>
