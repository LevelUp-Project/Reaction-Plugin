import './css/index.scss'
import {ReactionComponent} from './ReactionComponent'

export default {
    name: 'reaction',
    id: 'ocl.lvlup.reaction',
    // The configurator is called by the writer when it wants the
    // plugin to initalize itself and its different parts.
    configure: (configurator, pluginconfigurator) => {
        // Add plugin to main sidebar (can be overriden in plugin configurator)
        configurator.addToSidebar('Reaktioner', pluginconfigurator, ReactionComponent)
        // Add translations for the plugin
    }
}
