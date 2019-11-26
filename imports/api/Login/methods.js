import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { HTTP } from 'meteor/http';
import { Accounts } from 'meteor/accounts-base';
//import { Random } from 'meteor/random';
import { APILoginURL } from  '../../sensitive/sensitive.js';

Meteor.methods({
    'loginCustom'(email,password) {
        this.unblock();
        const _email = email.toLowerCase().trim();

        loginSchema = new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            },
            password: {
                type: String,
                min: 1
            }
        }, { tracker: Tracker }).newContext();

            
        loginSchema.validate({
            email: _email,
            password
        });

        if (!loginSchema.isValid()){
            throw new Meteor.Error(loginSchema.validationErrors());
        }

        const CallOptions = {
            params: {
                email: _email,
                password : password,
                devicetoken: "",
            },
        };

        let id = "";

        try {
            const CallResponde = HTTP.post(APILoginURL, CallOptions);
            if (CallResponde.content === "null"){
                throw new Meteor.Error("Error-mine", "Not found", "Username and/or password is/are wrong, please try again or recover your password");
            }

            id = CallResponde.data.Id;

        } catch (e){
            if (e.error === "undefined"){
                console.log(e);
            } else if (!e.error.includes("Error-mine")){
                console.log(e);
            }
            throw e;
        }

        let user = Accounts.findUserByEmail(_email);
        //let _Password = Random.hexString(20);

        if (typeof user === 'undefined'){
            user = Accounts.createUser({ email: _email, password: password});
            if (typeof user === 'undefined'){
                throw new Meteor.Error("Error-mine", "Failed Validation", "Failed to validate user, please contact Paradigm Games");
            }
            user = Accounts.findUserByEmail(_email);
        }else {
            Accounts.setPassword(user._id, password);
        }
    
        return true;        
    },
});
