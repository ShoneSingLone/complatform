/* http://www.javashuo.com/article/p-hykaiaac-k.html */
export default {
    root: true,
    globals: {
        __APP_VERSION: true,
        __URL_API_VERSION: true,
        __URL_BASE: true,
        __URL_API_BASE: true,
        __URL_WS_BASE: true,
        __URL_STATIC_DIR: true,
        TEMPLATE_PLACEHOLDER: true,
        APP_ROOT_URL: true,
        ROOT_URL: true,
        APP_ENTRY_NAME: true,
        URL_PREFIX: true,
        defineProps: true,
        defineEmits: true
    },
    env: {
        browser: true,
        node: true
    },
    extends: [
        /* https://eslint.vuejs.org/user-guide/#bundle-configurations */
        "plugin:vue/vue3-recommended",
        /* https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/ */
        "prettier"
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    rules: {
        /* "linebreak-style": [ "error", "unix" ], */
        // "vue/no-multiple-template-root": "off",
        // "vue/no-mutating-props": "off",
        "vue/require-default-prop": "off",
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true
            }
        ],
        "comma-dangle": [
            "error",
            {
                objects: "only-multiline",
                arrays: "never",
                imports: "never",
                exports: "never",
                functions: "never"
            }
        ],
        semi: ["error", "always"],
        "no-undef": "error",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    }
};
