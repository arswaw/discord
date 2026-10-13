import { reactive } from 'vue';

export const languageStore = reactive({
    'en': {
        greetings: "Hello",
        farewells: "Goodbye"
    },
    'es': {
        greetings: "Hola",
        farewells: "Adios"
    }
})
