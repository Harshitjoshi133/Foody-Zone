// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Foody-Zone/app/', // Base path for GitHub Pages with subfolder
  plugins: [react()]
});
