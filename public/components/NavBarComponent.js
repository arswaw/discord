export default {
    props: ['links'],
    template: `
    <nav>
        <li v-for="link in links">
            <a :href="link.link">{{link.display}}</a>
        </li>
    </nav>
    `
}
