/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

const request = require('request');

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Tech Stock Courses';
const HELP_MESSAGE = 'You can say tell me the current tech stock courses, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetCourses');
    },
    'GetCourses': function () {

        Promise.all([Apple, Microsoft, Amazon, Facebook, Google]).then(values => {
            var speechOutput = "";
           
            values.forEach(element => {
                speechOutput += element + "<break time='1s'/>";
            });
         
         
            this.response.cardRenderer(SKILL_NAME, speechOutput);
            this.response.speak(speechOutput);
            this.emit(':responseReady');

        });

     
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


var Apple = new Promise((resolve, reject) => {
    getStockCourse("aapl", "Apple", (response) => {
        resolve(response);
    });
});

var Microsoft = new Promise((resolve, reject) => {
    getStockCourse("msft", "Microsoft", (response) => {
        resolve(response);
    });
});

var Amazon = new Promise((resolve, reject) => {
    getStockCourse("amzn", "Amazon", (response) => {
        resolve(response);
    });
});

var Google = new Promise((resolve, reject) => {
    getStockCourse("goog", "Google", (response) => {
        resolve(response);
    });
});

var Facebook = new Promise((resolve, reject) => {
    getStockCourse("fb", "Facebook", (response) => {
        resolve(response);
    });
});




function getStockCourse(stockSymbol, stockName, callback){
    var url = "https://api.iextrading.com/1.0/stock/" + stockSymbol +"/batch?types=quote";
    request.get(url, (error, response, body) => {
        let json = JSON.parse(body);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the body

        var course = json.quote.latestPrice;          
        callback(speech = "The " + stockName + " Stock is at " + course + " Dollars. ");
    });
}
