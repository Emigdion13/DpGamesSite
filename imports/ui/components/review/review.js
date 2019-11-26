import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
//import { Questionary } from '../../../api/Questionary/questionary.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './review.html';


Template.review.onCreated(function bodyOnCreated() {
    
    if (!Meteor.userId()){
        FlowRouter.go("/");
    }
    this.state = new ReactiveDict({ test_device: "", game_improvement: "", Rate_Legions : "", tutorials_clear: "", app_behave: "",
        messageMessage: "", messageTitle: ""
    });
    Meteor.subscribe('questionary.all');
});

Template.review.onRendered(function() {
    let M = require("materialize-css");

    let navs = document.querySelectorAll('.sidenav');
    let instancesNavs = M.Sidenav.init(navs, null);
    
    let anime = require("animejs");

    let textWrapper = document.querySelector('.ml11 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    let CharacterCountEnabler = document.querySelectorAll(".counter");
    M.CharacterCounter.init(CharacterCountEnabler, null);
    M.updateTextFields();

    let elems = document.querySelectorAll('select');
    let SelectElements = M.FormSelect.init(elems, null);

    anime.timeline({ loop: true })
        .add({
            targets: '.ml11 .line',
            scaleY: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700
        })
        .add({
            targets: '.ml11 .line',
            translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
            easing: "easeOutExpo",
            duration: 700,
            delay: 100
        }).add({
            targets: '.ml11 .letter',
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 600,
            offset: '-=775',
            delay: (el, i) => 34 * (i + 1)
        }).add({
            targets: '.ml11',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });


    let ModalElems = document.querySelectorAll('.modal');
    let ModalInstances = M.Modal.init(ModalElems, { dismissible: true });
});


Template.review.helpers({
    errorCollection(){
        const inst = Template.instance();
        return {
            test_device: inst.state.get('test_device'),
            game_improvement: inst.state.get('game_improvement'),
            Rate_Legions: inst.state.get('Rate_Legions'),
            tutorials_clear: inst.state.get('tutorials_clear'),
            app_behave: inst.state.get('app_behave'),
        };

    },
    getMessage() {
        const inst = Template.instance();
        return {
            messageTitle: inst.state.get('messageTitle'),
            messageMessage: inst.state.get('messageMessage'),
        }
    },
});


Template.review.events({
    'submit #review_form'(event, instance){
        event.preventDefault();

        instance.state.set({
            test_device: "", game_improvement: "", Rate_Legions: "", tutorials_clear: "", app_behave: "", 
            messageMessage: "", messageTitle: ""
        });

        let first_impression = event.target.first_impression.value;
        let test_device = event.target.test_device.value;
        let game_improvement = event.target.game_improvement.value;
        let Rate_Legions = event.target.Rate_Legions.value;
        let aspect_game = event.target.aspect_game.value;
        let tutorials_clear = event.target.tutorials_clear.value;
        let evaluate_items = event.target.evaluate_items.value;
        let future_content = event.target.future_content.value;
        let app_behave = event.target.app_behave.value;
        let glitchy_content = event.target.glitchy_content.value;
        let notification = event.target.notification.value;
        let Connectivity = event.target.Connectivity.value;

        Meteor.call("questionary.insert", first_impression, test_device, game_improvement, 
        Rate_Legions, aspect_game, tutorials_clear, evaluate_items, future_content, app_behave, 
        glitchy_content, notification, Connectivity, 
        function(error, result){
            if (error) {
                if (typeof error.reason === 'undefined'){
                    error.error.forEach(element => {
                        instance.state.set(element.name, 'This value is required, thank you.');
                    });
                }else {
                    console.log(error.reason);
                }
                return;
            } 

            if (result) {
                event.target.first_impression.select = "" ;
                event.target.test_device.value = "";
                event.target.game_improvement.value= "" ;
                event.target.Rate_Legions.value= "" ;
                event.target.aspect_game.value= "" ;
                event.target.tutorials_clear.value= "" ;
                event.target.evaluate_items.value= "" ;
                event.target.future_content.value= "" ;
                event.target.app_behave.value= "" ;
                event.target.glitchy_content.value= "" ;
                event.target.notification.value= "" ;
                event.target.Connectivity.value= "" ;

                let M = require("materialize-css");
                instance.state.set({ messageTitle: "Success", messageMessage: "Review sent, Thank you" });
                let instanceModal = M.Modal.getInstance(document.querySelector('#modalMessage'));
                instanceModal.open();
                M.updateTextFields();

                return;
            }
        });
    }
});

