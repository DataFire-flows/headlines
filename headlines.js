"use strict";

let btoa = require('btoa');
let datafire = require('datafire');
let makeEmail = require('./email');
let flow = module.exports = new datafire.Flow('Headlines', "Get headlines from several news sources in your inbox");

let gmail = datafire.Integration.new('google-gmail').as('default');
let cnn = datafire.Integration.new('cnn-rss');
let npr = datafire.Integration.new('npr-rss');
let nytimes = datafire.Integration.new('nytimes-rss');

const RSS_FEEDS = ['cnn', 'nytimes', 'npr'];
const MAX_ITEMS_PER_FEED = 8;

flow
  .step('cnn', {
    do: cnn.topStories(),
  })
  .step('nytimes', {
    do: nytimes.homePage(),
  })
  .step('npr', {
    do: npr.news(),
  })
  .step('user', {
    do: gmail.get('/{userId}/profile'),
    params: {userId: 'me'},
  })
  .step('send_email', {
    do: gmail.post('/{userId}/messages/send'),
    params: data => {
      let addr = data.user.emailAddress;
      let body = '';
      RSS_FEEDS.forEach(f => {
        let feed = data[f].feed;
        body += `<h1>${feed.title}</h1>`;
        let entries = feed.entries.slice(0, MAX_ITEMS_PER_FEED);
        entries.forEach(entry => {
          body += `<p><a href="${entry.link}">${entry.title}</a></p>`
        })
      })
      return {
        userId: 'me',
        body: {
          raw: makeEmail(addr, addr, 'News Headlines', body),
        }
      }
    }
  })
