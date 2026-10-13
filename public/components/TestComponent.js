import TestChildComponent from "./TestChildComponent.js"

function amongUs() {
    console.info('sus event')
}

export default {
    setup() {
        return { amongUs }
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
        <TestChildComponent 
            text="This is a child component."
            @some-event.once="amongUs"
        />
    `
}
