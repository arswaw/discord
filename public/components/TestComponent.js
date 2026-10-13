export default {
    props: ['text', 'ids'],
    template: `
        <h3>{{text}}</h3>
        <li v-for="id in ids">
            {{id}}
        </li>
    `
}
