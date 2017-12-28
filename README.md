# DataFire - News Headlines

Send yourself an e-mail with the latest items from a few RSS feeds.

[Run this project on DataFire.io](https://app.datafire.io/projects?baseRepo=https:%2F%2Fgithub.com%2FDataFire-flows%2Fheadlines)

## Manual Setup

If you want to run this project yourself (rather than on DataFire.io), you'll need to create a Gmail client:

* Visit [Google Dev Console](https://console.developers.google.com),
* Click "Enable API"
* Choose Gmail
* Go to "Credentials" -> "Create Credentials" -> "OAuth Client ID"

Then run:
```
git clone https://github.com/DataFire/headlines
cd headlines
npm install

datafire authenticate google_gmail --alias google_gmail
# Follow the command-line prompts

datafire run ./headlines.js
```

## Run on a schedule
To run this action every day, run:

```
datafire serve --tasks &
```

You can also change the schedule by editing DataFire.yml
