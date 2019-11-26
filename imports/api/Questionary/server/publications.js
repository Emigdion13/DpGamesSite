// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Questionary } from '../questionary.js';


Meteor.publish('questionary.all', function () {
    return Questionary.find();
});
