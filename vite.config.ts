import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@images": path.resolve(__dirname, "./src/assets/images"),
            "@styles": path.resolve(__dirname, "./src/assets/scss"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@constants": path.resolve(__dirname, "./src/constants"),
            "@modules": path.resolve(__dirname, "./src/modules"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
        },
    },
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
});
