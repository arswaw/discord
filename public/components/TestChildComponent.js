import { inject } from 'vue'
import { myInjectionKey } from 'injection-keys'

export default {
    setup() {
        const test = inject(myInjectionKey)
        return { test }
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
    `
}
