// app/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Foody-zone/', // Base path for GitHub Pages
  plugins: [react()]
});