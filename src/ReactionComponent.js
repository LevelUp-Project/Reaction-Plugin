import {Component} from 'substance'
import {api} from 'writer'
import {UIToggle} from 'writer'
import {UIIconButton} from 'writer'

class ReactionComponent extends Component {

    /**
     * Constructor
     * @param args
     */
    constructor(...args) {
        super(...args)
    }

    /**
     * Method called when component is disposed and removed from DOM
     */
    dispose() {
        // Perfect place to remove eventlisteners etc
    }

    /**
     * Return the inital component state before rendering
     *
     * @returns {{Rstate: number}}
     */
    getInitialState() {
        //Variables loaded from the config in the Writer
        //To check press: CTRL+SHIFT+Y in the writer and click on "votereaction"
        
        let presetReactionsEnabled = api.getConfigValue("ocl.lvlup.reaction","reactionsenabled")
        let presetReactionString = api.getConfigValue("ocl.lvlup.reaction","reactionstring")
          
        let reactionObject = api.newsItem.getNewsPriority();
        
        if (typeof reactionObject.reactionsenabled === 'undefined' || reactionObject.reactionsenabled === "" || reactionObject.reactionsenabled === null) {
            
            if (typeof presetReactionsEnabled === 'undefined' || presetReactionsEnabled === "" || presetReactionsEnabled === null) {
                reactionObject.reactionsenabled = "false";
            } else {
                reactionObject.reactionsenabled = presetReactionsEnabled.toString();
            }
        }
        
        if (typeof reactionObject.reactionstring === 'undefined' || reactionObject.reactionstring === "" || reactionObject.reactionstring === null) {
            
            if (typeof presetReactionString === 'undefined' || presetReactionString === "" || presetReactionString === null) {                            
                reactionObject.reactionstring = JSON.stringify({ like: "1", dislike: "1", heart: "1", smile: "1", frown: "1" });
            } else {
                reactionObject.reactionstring = JSON.stringify(presetReactionString);
            }
            
        }
        const reactionJSON = JSON.parse(reactionObject.reactionstring);
        const reactionsEnabledInit = JSON.parse(reactionObject.reactionsenabled);
        api.newsItem.setNewsPriority("reaction", reactionObject);
               
        const ReactionToggled = "REACTIONMARK"
        const ReactionUntoggled = "REACTION"
        
        // The InitialState of the variables used by the writer plugin
        return {           
            //Reaktions Initialized: true if reactions are enabled, false if disabled
            reactionsEnabled: reactionsEnabledInit,
            //Binary string that represents if a reaction is on or off, 0 = OFF , 1 = ON
            //Variables used in calculations in a function.
            //String to display information in the buttons.
            reaction1Value: reactionJSON.like.toString(),
            reaction2Value: reactionJSON.dislike.toString(),
            reaction3Value: reactionJSON.heart.toString(),
            reaction4Value: reactionJSON.smile.toString(),
            reaction5Value: reactionJSON.frown.toString(),
            
            //Variables used to show the reaction interface
            reactionDiv: (reactionsEnabledInit === true) ? "" : "REACTIONHIDE",
            reactionString: (reactionsEnabledInit === true) ? "Reaktioner På" : "Reaktioner Av",
			
            //Variables used to show which reactions are selected
            reaction1Toggle: (reactionJSON.like.toString() === "1") ? ReactionToggled : ReactionUntoggled,
            reaction2Toggle: (reactionJSON.dislike.toString() === "1") ? ReactionToggled : ReactionUntoggled,
            reaction3Toggle: (reactionJSON.heart.toString() === "1") ? ReactionToggled : ReactionUntoggled,
            reaction4Toggle: (reactionJSON.smile.toString() === "1") ? ReactionToggled : ReactionUntoggled,
            reaction5Toggle: (reactionJSON.frown.toString() === "1") ? ReactionToggled : ReactionUntoggled,
			
        }                
    }

    /**
     * Do something after the first render
     */
    didMount() {
        console.log('VoteReaction plugin rendered')
    }

    /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @returns {*}
     */
    render($$) {
        const el = $$('div') // Div that will hold all the graphical elements.
        
        const ReactionsForbidden = "Reaktioner Av";
        const ReactionsAllowed = "Reaktioner På"; 
        
        const ARButton = $$(UIToggle, {
            id: 'im-tm_case',
            label: this.getLabel(' ' + this.state.reactionString),
            checked: this.state.reactionsEnabled,
            onToggle: checked => {
                this.ToggleReaktionsEnabled()
                this.extendState({
                    reactionString: (this.state.reactionString === ReactionsForbidden) ? ReactionsAllowed : ReactionsForbidden
                })
            }
        }).ref('toggleCase')

        const R1Button = $$(UIIconButton, { // Toggles Reaction 1
            id: '1',
            label: this.getLabel(' ' + this.state.reaction1Value),
            icon: 'thumbs-o-up fa-2x',
            size: 'large',
        }).on('click', () => {
            this.extendState({
                reaction1Value: (this.state.reaction1Value === "1") ? "0" : "1",
            })
            this.UpdateData()
        })

        const R2Button = $$(UIIconButton, { // Toggles Reaction 2
            id: '2',
            label: this.getLabel(' ' + this.state.reaction2Value),
            icon: 'thumbs-o-down fa-2x',
            size: 'large',
        }).on('click', () => {
            this.extendState({
                reaction2Value: (this.state.reaction2Value === "1") ? "0" : "1",
            })
            this.UpdateData()
        })

        const R3Button = $$(UIIconButton, { // Toggles Reaction 3
            id: '3',
            label: this.getLabel(' ' + this.state.reaction3Value),
            icon: 'heart-o fa-2x',
            size: 'large',
        }).on('click', () => {
            this.extendState({
                reaction3Value: (this.state.reaction3Value === "1") ? "0" : "1",
            })
            this.UpdateData()
        })

        const R4Button = $$(UIIconButton, { // Toggles Reaction 4
            id: '4',
            label: this.getLabel(' ' + this.state.reaction4Value),
            icon: 'smile-o fa-2x',
            size: 'large',
        }).on('click', () => {
            this.extendState({
                reaction4Value: (this.state.reaction4Value === "1") ? "0" : "1",
            })
            this.UpdateData()
        })

        const R5Button = $$(UIIconButton, { // Toggles Reaction 5
            id: '5',
            label: this.getLabel(' ' + this.state.reaction5Value),
            icon: 'frown-o fa-2x',
            size: 'large',
        }).on('click', () => {
            this.extendState({
                reaction5Value: (this.state.reaction5Value === "1") ? "0" : "1",
            })
            this.UpdateData()
        })

        // Where all the different Buttons and elements are added to the Div
        el.append([
            
            $$('h2').append(this.getLabel('')),
            $$('h2').append(this.getLabel('Reaktioner')),
            $$('div').addClass('REACTIONPRESET').append(ARButton),
			
            $$('br').addClass('REACTIONCLEAR'),
			
            $$('div').addClass(this.state.reactionDiv).append([
                $$('h2').append(this.getLabel('Ändra Reaktioner')),
                $$('div').addClass(this.state.reaction1Toggle).append(R1Button),
                $$('div').addClass(this.state.reaction2Toggle).append(R2Button),
                $$('div').addClass(this.state.reaction3Toggle).append(R3Button),
                $$('div').addClass(this.state.reaction4Toggle).append(R4Button),
                $$('div').addClass(this.state.reaction5Toggle).append(R5Button),
            ]),
        ])
        return el
    }

    // This function manipulates the Updates the Reactionstring.
    UpdateData() {
		
        const ReactionToggled = "REACTIONMARK"
        const ReactionUntoggled = "REACTION"

        // First it gets the "NewsPriority" object where data can be stored
        let reactionObject = api.newsItem.getNewsPriority();
        const reactionJSON = JSON.parse(reactionObject.reactionstring);
        
        // Secondly it updates the variables with their new values and then saves the new NewsPriority object. (To check the data written press: CTRL+SHIFT+U in the writer)
        reactionJSON.like = this.state.reaction1Value;
        reactionJSON.dislike = this.state.reaction2Value; 
        reactionJSON.heart = this.state.reaction3Value;
        reactionJSON.smile = this.state.reaction4Value;
        reactionJSON.frown = this.state.reaction5Value; 
        
        reactionObject.reactionstring = JSON.stringify(reactionJSON);
        api.newsItem.setNewsPriority("reaction", reactionObject);
        
        this.extendState({
            reaction1Toggle: (this.state.reaction1Value === "1") ? ReactionToggled : ReactionUntoggled,
            reaction2Toggle: (this.state.reaction2Value === "1") ? ReactionToggled : ReactionUntoggled,
            reaction3Toggle: (this.state.reaction3Value === "1") ? ReactionToggled : ReactionUntoggled,
            reaction4Toggle: (this.state.reaction4Value === "1") ? ReactionToggled : ReactionUntoggled,
            reaction5Toggle: (this.state.reaction5Value === "1") ? ReactionToggled : ReactionUntoggled,
        })       
    }

    // This function toggles the state of the Reactionsenabled variable.
    ToggleReaktionsEnabled() {
        // First it changes the state on the Reactionsenabled boolean
        
        //ReactionsEnabled
        let rEnabled = !this.state.reactionsEnabled;

        // Second it gets the "NewsPriority" object where data can be stored
        let reactionObject = api.newsItem.getNewsPriority();

        // Third it updates the variables with their new values and then saves the new NewsPriority object.
        reactionObject.reactionsenabled = rEnabled;

        api.newsItem.setNewsPriority("votereaction", reactionObject);

        // Lastly Local State variables are also updated.
        this.extendState({
            reactionsEnabled: rEnabled,
            reactionDiv: (this.state.reactionDiv === "") ? "REACTIONHIDE" : "",
        })
    }	
}

export {ReactionComponent}
