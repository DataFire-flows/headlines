"use strict";

let datafire = require('datafire');
let makeEmail = require('./email');
let gmail = require('@datafire/google_gmail').actions;
let cnn = require('@datafire/cnn_rss').actions;
let npr = require('@datafire/npr_rss').actions;
let nytimes = require('@datafire/nytimes_rss').actions;

const MAX_ITEMS_PER_FEED = 8;

module.exports = new datafire.Action({
  handler: (input, context) => {
    return datafire.flow(context)
      .then(_ => cnn.topStories())
      .then(cnn => nytimes.homePage())
      .then(nytimes => npr.news())
      .then(npr => gmail.users.getProfile({userId: 'me'}, context))
      .then(user => {
        let rssFeeds = [
          context.results.cnn,
          context.results.npr,
          context.results.nytimes,
        ];
        let body = '';
        rssFeeds.forEach(result => {
          let feed = result.feed;
          body += `<h1>${feed.title}</h1>`;
          let entries = feed.entries.slice(0, MAX_ITEMS_PER_FEED);
          entries.forEach(entry => {
            body += `<p><a href="${entry.link}">${entry.title}</a></p>`
          })
        });
        return gmail.users.messages.send({
          userId: 'me',
          body: {
            raw: makeEmail(user.emailAddress, user.emailAddress, 'News Headlines', body),
          }
        }, context)
      })
  }
})
