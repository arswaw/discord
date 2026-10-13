import { ref } from 'vue';
import TestChildComponent from "./TestChildComponent.js"

const message = ref('')
const delayedMessage = ref('')

setTimeout(() => {
    delayedMessage.value = 'This is delayed slot content.'
}, 2000)

function amongUs() {
    console.info('sus event', delayedMessage)
    message.value = 'Two Way Data Binding'
}

export default {
    setup() {
        return { amongUs, message, delayedMessage }
    },
    props: ['text', 'ids'],
    components: {
        TestChildComponent
    },
    template: `
        <h3>{{text}}</h3>
        <li v-for="id in ids">
            {{id}}
        </li>
        <slot></slot><br>
        <input placeholder="v-model example" v-model="message" />
        {{message}}
        <TestChildComponent
            text="This is a child component."
            @some-event.once="amongUs">
            <template v-slot:delayedMessage>
                {{delayedMessage}}
            </template>
        </TestChildComponent>
    `
}
