# Relay Discord bot

The first Relay bot foundation. It starts a Discord bot and registers two starter slash commands:

- `/ping` — confirms that Relay is online.
- `/relay` — opens starter views for Security, Watchguard, Appeals, and Status.

## Local setup

1. Copy `.env.example` to `.env`.
2. Add the Discord application values to `.env`.
3. Run `npm install`.
4. Run `npm run register` to register commands.
5. Run `npm start`.

## Railway setup

Create a Railway service from this repository and set its root directory to `bot`. Add `DISCORD_TOKEN` and `DISCORD_CLIENT_ID` in Railway Variables. Add `DISCORD_GUILD_ID` too while testing in a single Discord server. Railway will run `npm start` automatically.

Never commit a real Discord token or put it in a message.
