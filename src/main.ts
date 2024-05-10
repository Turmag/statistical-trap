import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/style.scss';
import { router } from '@/router';
const pinia = createPinia();
import { vfmPlugin } from 'vue-final-modal';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import App from '@/App.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);
app.use(vfmPlugin);
app.use(FloatingVue);
app.use(pinia);
app.use(router);
app.mount('#app');
