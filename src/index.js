import ReactionPackage from './ReactionPackage'
import {registerPlugin} from 'writer'

(() => {
    // Register the plugin with the Writer when registerPlugin() is available
    if (registerPlugin) {
        registerPlugin(ReactionPackage)
    } else {
        console.error('Register method not yet available')
    }
})()
