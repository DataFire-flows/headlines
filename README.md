# DataFire - News Headlines
> This is a reference project for [DataFire](/DataFire/DataFire)

Send yourself an e-mail with the latest items from a few RSS feeds.

To use this flow, first create a GMail client in the
[Google Dev Console](https://console.developers.google.com)
by clicking "Enable API", choosing GMail, then "Credentials" -> "Create Credentials" -> "OAuth Client ID"

```
git clone https://github.com/DataFire/headlines
cd headlines
npm install

datafire integrate gmail cnn npr nytimes
datafire authenticate gmail --generate_token
# Follow the command-line prompts

datafire run headlines
```

## Serverless
Runs every day by default. You can change this in `serverless.yml`

```
serverless deploy -v
```
