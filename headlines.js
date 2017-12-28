"use strict";

let datafire = require('datafire');
let makeEmail = require('./email');
let gmail = require('@datafire/google_gmail').create(datafire.Project.main().accounts.google_gmail);
let cnn = require('@datafire/cnn_rss').create();
let npr = require('@datafire/npr_rss').create();
let nytimes = require('@datafire/nytimes_rss').create();

const MAX_ITEMS_PER_FEED = 8;

module.exports = new datafire.Action({
  handler: async (input, context) => {
    let rssFeeds = [
      await cnn.topStories(),
      await nytimes.homePage(),
      await npr.news(),
    ]
    let user = await gmail.users.getProfile({userId: 'me'}, context);
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
        raw: await gmail.buildMessage({
          to: user.emailAddress,
          from: user.emailAddress,
          subject: 'News Headlines',
          body: body,
        })
      }
    })
  }
})
