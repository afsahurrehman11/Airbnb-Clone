/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {

      "primary": "#E41D56",
      "gray-500": "#6B7280",
      "gray-600": "#4B5563",
      "gray-100": "#F3F4F6",
      "indigo-200": "#C3DAFE",
      "indigo-50": "#EEF2FF",
      "neutral-800": "#1F2937",
      "zinc-600": "#4B5563",
      "gray-50": "#F9FAFB",
      "gray-200": "#E5E7EB",
      "red-400": "#f87171",
      "gray-400": "#9ca3af",
      "gray-800": "#1f2937",
      "green-500": "#22c55e",
      "stone-100": "#f5f5f4",
      "red-600": "#DC2626",
    }
  },
  plugins: [],
}