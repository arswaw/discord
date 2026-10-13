export default {
    emits: ['someEvent'],
    props: ['text'],
    template: `
        <h2>{{text}}</h2>
        <button @click="$emit('someEvent')">Click Me</button>
    `
}
