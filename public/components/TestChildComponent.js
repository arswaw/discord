import { inject, ref } from 'vue'
import { myInjectionKey } from 'injection-keys'

const open = ref(false)

export default {
    setup() {
        const test = inject(myInjectionKey)
        return { test, open }
    },
    emits: ['someEvent'],
    props: ['text', 'delayedMessage'],
    template: `
        <h2>{{text}}</h2>
        <button @click="$emit('someEvent')">Click Me</button>
        <h3>
            <slot name="delayedMessage"></slot>
        </h3>
        <h4>{{test}}</h4>
        <button @click="open = true">Open Modal</button>
        <Teleport to="body">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
        </Teleport>
    `
}
