# The Nova Discord bot

This is the main bot for the Makeshift community Discord.

## Features

Nova does the following:

- Commands (see [below](#commands) for a list)
- Responds with a random yes or no answer when asked a question starting with <!-- markdownlint-disable-line MD038 -->`Nova, `.
  Basically a heavily biased version of the [Magic 8 Ball](https://en.wikipedia.org/wiki/Magic_8_Ball).  
  ![A screenshot of a Discord conversation. NKN1396 asks "Nova, am I a weeb?". Nova responds with "No.". NKN1396 then states "Spot on.".](docs/Magic%208%20Ball.png)
- Sends a "sarcasm" disclaimer when ending a message with `/s`  
  ![A screenshot of a Discord conversation. NKN1396 writes "You should definitely buy a high-roller credit bundle", ending the same message with a slash followed by the letter S. Nova responds with "That was sarcasm".](docs/Sarcasm%20disclaimer.png)
- Makes sure there's always an empty voice channel available
- Sends a random greeting prompt upon joining  
  ![A screenshot of a Discord conversation. Nova writes "Welcome to the Makeshift community Discord, member. State your favorite movie, NOW!" The member gets mentioned, but their name is censored out."](docs/Greeting.png)
- Assigns a random colored role upon joining

## Commands

- `/link` provides a quick link for various Warframe-related websites.
- `/wiki` searches the Wiki for the provided prompt and returns the first search result.
- `/rule` cites the specified community rule.

## Logging user activity

Joining, leaving and renaming yourself on the Discord server results in a message being sent in the `#modlogs` channel.
See [this repository](https://github.com/Makeshift-Community/nova-logs) for more information.
