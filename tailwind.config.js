/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                luxury: {
                    ...require("daisyui/src/theming/themes")["luxury"],
                    "primary": "#5c6b73",
                    "secondary": "#9ca3af",
                    "accent": "#6b7280",
                },
            },
        ],
    },
}
