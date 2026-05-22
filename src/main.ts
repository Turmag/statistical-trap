import '@/style.scss';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const pinia = createPinia();
import '@/assets/scss/card.scss';
import { vfmPlugin } from 'vue-final-modal';
import App from '@/App.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);
app.use(vfmPlugin);
app.use(pinia);
app.use(router);
app.mount('#app');
