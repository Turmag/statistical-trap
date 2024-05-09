import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
    return {
        plugins: [vue(), Components({ resolvers: [IconsResolver({ prefix: '' })] }), Icons({ autoInstall: true })],
        base: '/statistical-trap/',
        resolve: { alias: { '@': path.resolve(__dirname, './src') } },
        css: { modules: { generateScopedName: mode === 'development' ? '' : '[hash:base64:8]' } },
    };
});
