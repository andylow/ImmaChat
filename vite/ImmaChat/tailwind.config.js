/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,vue}"],
    theme: {
        extend: {
            fontFamily: {
                title: ["Qwigley", "cursive"],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["dark", "winter"],
    },
};
