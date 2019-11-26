import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


import './login.html';

Template.login.onCreated(function bodyOnCreated() {
    Meteor.logout();
    this.state = new ReactiveDict({ errorTitle: "", errorMessage: "", message: ""});
});

Template.login.helpers({
    getErrors(){
        const inst = Template.instance();
        return {
            errorTitle: inst.state.get('errorTitle'),
            errorMessage: inst.state.get('errorMessage'),
        }
    },
});

Template.login.onRendered(function(){
    var M = require("materialize-css");
    M.updateTextFields();

    var ModalElems = document.querySelectorAll('.modal');
    var ModalInstances = M.Modal.init(ModalElems, {dismissible : true});
});

Template.login.events({
    'submit #loginForm'(event, instance) {
        let Email = event.target.Email.value;
        let Password = event.target.Password.value;

        event.target.Password.value = "";

        event.preventDefault();

        instance.state.set({ errorTitle: "", errorMessage: "", message: "" });

        Meteor.call("loginCustom", Email, Password , function (error, result) {

            if (error) {
                if (typeof error.reason === 'undefined') {
                    instance.state.set({ errorTitle: "Error", errorMessage: "Email and/or password were not found or are wrong, please try again"});
                    var instanceModal = M.Modal.getInstance(document.querySelector('#modalMessage'));
                    instanceModal.open();
                    
                } else {
                    instance.state.set({ errorTitle: "Error", errorMessage: "Username and/or password is/are wrong, please try again or recover your password" });
                    var instanceModal = M.Modal.getInstance(document.querySelector('#modalMessage'));
                    instanceModal.open();
                }
            } else {
                if (result){
                    Meteor.loginWithPassword(Email.toLowerCase().trim(), Password, function(){
                        FlowRouter.go("/review/");
                    });
                }
            }
            
        });
    },
});