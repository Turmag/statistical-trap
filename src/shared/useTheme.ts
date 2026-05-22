import {
    onMounted,
    ref,
    watch,
    watchEffect,
} from 'vue';
import { useMainStore } from '@/stores/useMain.store';

export function useTheme() {
    const mainStore = useMainStore();
    const matches = ref(true);

    const setDarkMode = () => {
        document.body.classList.add('dark');
        mainStore.isDarkMode = true;
    };

    const setLightMode = () => {
        document.body.classList.remove('dark');
        mainStore.isDarkMode = false;
    };

    watchEffect(onInvalidate => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        if (media.matches !== matches.value) matches.value = media.matches;

        const onChange = () => matches.value = media.matches;
        media.addEventListener('change', onChange);

        onInvalidate(() => media.removeEventListener('change', onChange));
    });

    watch(
        () => matches.value,
        value => {
            if (!mainStore.isSavedDarkMode) value ? setDarkMode() : setLightMode();
        },
    );

    onMounted(() => {
        let isDarkMode = String(localStorage.getItem('statisticalTrapDarkMode'));

        if (!['false', 'true'].includes(isDarkMode)) {
            isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches.toString();
        } else {
            store.isSavedDarkMode = true;
        }

        if (isDarkMode === 'true') setDarkMode();
    });
}
