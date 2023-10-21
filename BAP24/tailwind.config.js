import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'primary-red': '#FF360D'
            },
            backgroundImage: {
                'hero-small': "url('/public/images/hero_sm.png')",
                'hero-large': "url('/public/images/hero_full.png')",
              }
        },
    },

    plugins: [forms],
    darkMode: 'false',
};
