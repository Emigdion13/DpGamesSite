// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Questionary } from './questionary';

Meteor.methods({
    'questionary.insert'(first_impression, test_device, game_improvement, Rate_Legions, 
        aspect_game, tutorials_clear, evaluate_items, future_content, app_behave, glitchy_content, 
        notification, Connectivity) {
        //check(url, String);
        //check(title, String);
        userID = Meteor.userId();
        if (typeof userID === 'undefined'){
            return false;
        }
        DateCreated = new Date();

        Questionary.UsedSchema.validate({
            first_impression, 
            test_device, 
            game_improvement, 
            Rate_Legions, 
            aspect_game, 
            tutorials_clear, 
            evaluate_items, 
            future_content, 
            app_behave, 
            glitchy_content, 
            notification, 
            Connectivity,
            userID,
            DateCreated
        });

        if (!Questionary.UsedSchema.isValid()){
            throw new Meteor.Error(Questionary.UsedSchema.validationErrors());
        }
        
        return Questionary.insert({
            first_impression,
            test_device,
            game_improvement,
            Rate_Legions,
            aspect_game,
            tutorials_clear,
            evaluate_items,
            future_content,
            app_behave,
            glitchy_content,
            notification,
            Connectivity,
            userID,
            DateCreated
        });
    },
});
