export default {
    props: ['links'],
    template: `
    <nav>
        <li v-for="link in links">
            <a><RouterLink :to="link.link">{{link.display}}</RouterLink></a>
        </li>
    </nav>
    `
}
