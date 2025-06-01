
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Define environment variables that will be available in the app
  define: {
    // You can set default values here, but they can be overridden by VITE_ env vars
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:5000'),
  },
}));
