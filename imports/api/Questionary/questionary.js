// Definition of the questionary collection
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Schemas = {};

Schemas.SchemaQuestionary = new SimpleSchema({

    first_impression: {
        type: String,
        label: "First Impresion",
        max: 500,
        optional: true,
    },
    test_device: {
        type: String,
        label: "Test Device",
        max: 50,
        min: 1,
        required: true,
    },
    game_improvement: {
        type: String,
        label: "Improve About Game",
        max: 400,
        min: 1,
        optional: true,
    },
    Rate_Legions: {
        type: String,
        label: "Rate Legions",
        max: 7,
        min: 1,
    },
    aspect_game: {
        type: String,
        label: "Aspect of the game",
        max: 400,
        optional: true,
    },
    tutorials_clear: {
        type: String,
        label: "App Behavior",
        max: 8,
        min: 1,
    },
    evaluate_items: {
        type: String,
        label: "Evaluate Items",
        max: 400,
        optional: true,
    },
    future_content: {
        type: String,
        label: "Future contect",
        max: 400,
        optional: true,
    },
    app_behave: {
        type: String,
        label: "App Behavior",
        max: 7,
        min: 1,
    },
    glitchy_content: {
        type: String,
        label: "Glitch content",
        max: 1000,
        optional: true,
    },
    notification: {
        type: String,
        label: "notification",
        max: 500,
        optional: true,
    },
    Connectivity: {
        type: String,
        label: "Connectivity",
        max: 500,
        optional: true,
    },
    userID: {
        type: String,
        label: "User ID",
        max: 100,
        min: 1,
    },
    DateCreated: {
        type: Date,
        autoValue: new Date(),
        min: 1,
    },
}, { tracker: Tracker }).newContext();
Questionary_ = new Mongo.Collection('questionary');
//Questionary_.attachSchema(Schemas.SchemaQuestionary);
Questionary_.UsedSchema = Schemas.SchemaQuestionary;

export const Questionary = Questionary_;