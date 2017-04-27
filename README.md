# DataFire - News Headlines
> This is a reference project for [DataFire](https://github.com/DataFire/DataFire)

Send yourself an e-mail with the latest items from a few RSS feeds.

To use this action, first create a Gmail client in the
[Google Dev Console](https://console.developers.google.com)
by clicking "Enable API", choosing Gmail, then "Credentials" -> "Create Credentials" -> "OAuth Client ID"

```
git clone https://github.com/DataFire/headlines
cd headlines
npm install

datafire authenticate google_gmail --alias gmail_user
# Follow the command-line prompts

datafire run ./headlines.js
```

## Run on a schedule
To run this action every day, run:

```
datafire serve --tasks &
```

You can also change the schedule by editing DataFire.yml
