import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import { router } from './router';
const pinia = createPinia();
import { vfmPlugin } from 'vue-final-modal';
import App from './App.vue';

const app = createApp(App);
app.use(vfmPlugin);
app.use(pinia);
app.use(router);
app.mount('#app');
