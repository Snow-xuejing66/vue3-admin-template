import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const files = require.context('./modules', false, /\.js$/)

const modules = {}

files.keys().forEach(key => {
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default createStore({
	modules,
	plugins: [createPersistedState()]
})
