import { createApp, ref, reactive, provide, defineAsyncComponent } from 'vue'
import { useMouse } from 'useMouse'
import i18nPlugin from 'i18nPlugin'
import { myInjectionKey } from 'injection-keys'
import NavBarComponent from 'NavBarComponent'
import LoadingComponent from 'LoadingComponent'
import PersistentComponent from 'PersistentComponent'
import ErrorComponent from 'ErrorComponent'
import { fetchConversation, fetchFolders, fetchList } from './discord-fetch.js'
import { router } from './router.js'

const conversations = await fetchList()
const folders = await fetchFolders()

const currentLanguage = ref('en')

const showTransition = ref(false)

function switchLanguage() {
    currentLanguage.value = currentLanguage.value === 'en' ? 'es' : 'en'
}

const store = reactive({
    selectedConversationName: '',
    selectedConversation: [],
    test: {
        "ids": [234, 266, 273]
    },
    providerText: "This content was provided from Vue provider.",
    nav: {
        links: [
            {
                display: "Home",
                link: "/home"
            },
            {
                display: "News",
                link: "/news"
            },
            {
                display: "Contact",
                link: "/contact"
            },
            {
                display: "About",
                link: "/about"
            }
        ]
    },
    increment() {
        this.count++
    }
})

async function showFolder(conversation, index) {
    const record = await fetchConversation(index)
    store.selectedConversationName = conversation
    store.selectedConversation = record
    console.info('folder clicked', record, conversation)
}

createApp({
    template: `
        <navbar :links="store.nav.links"></navbar>
        <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
        <RouterView />
        <dialog id="my-dialog">
            <button commandfor="my-dialog" command="close">Close</button>
            <p>{{store.selectedConversationName}}</p>
            <li v-for="conversation in store.selectedConversation">
                {{conversation.Contents}}
            </li>
        </dialog>
        <h1>{{ message }}</h1>
        <p highlight>This sentence is important!</p>
        <button @click="switchLanguage">Switch Languages</button>
        <h1>{{ $t(currentLanguage, 'greetings') }}</h1>
        <h1>{{ $t(currentLanguage, 'farewells') }}</h1>
        <button @click="showTransition = !showTransition">Toggle</button>
        <Transition>
            <p v-if="showTransition">hello</p>
        </Transition><br>
        <KeepAlive>
            <persistent :is="showTransition"></persistent>
        </KeepAlive>
        <Suspense>
            <test text="Comment Identifiers." :ids="store.test.ids">
                Mouse position is at: {{ x }}, {{ y }}
            </test>
        </Suspense>
        <div class="container">
            <li class="grid-item" v-for="(conversation, index) in conversations">
                <h3>{{conversation}}</h3>
                <button command="show-modal" commandfor="my-dialog" href="#"
                    @click="showFolder(conversation, index)">Open</button>
            </li>
        </div>
`,
    setup() {
        provide(myInjectionKey, store.providerText)
        const message = ref('Discord Conversations')
        const { x, y } = useMouse()
        return {
            message,
            conversations,
            folders,
            showFolder,
            store,
            x, y,
            switchLanguage,
            currentLanguage,
            showTransition
        }
    },
    directives: {
        highlight: {
            mounted: (el) => {
                el.classList.add('highlight')
            }
        }
    }
})
    .component('test', defineAsyncComponent({
        loader: () => import('./components/TestComponent.js'),
        loadingComponent: LoadingComponent,
        errorComponent: ErrorComponent,
        timeout: 3000
    }))
    .component('navbar', NavBarComponent)
    .component('persistent', PersistentComponent)
    .use(i18nPlugin)
    .use(router)
    .mount('#app')
