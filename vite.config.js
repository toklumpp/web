import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'de/.well-known',
                    dest: 'de',
                },
                {
                    src: '.well-known',
                    dest: '',
                },
                {
                    src: 'BingSiteAuth.xml',
                    dest: '',
                },
                {
                    src: 'robots.txt',
                    dest: '',
                },
                {
                    src: 'sitemap.xml',
                    dest: '',
                },
            ],
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                de: resolve(__dirname, 'de/index.html'),
            },
        },
    },
})
