export interface Configuration {
  GUILD_ID: string;

  VOICE_CATEGORY_ID: string;

  TEXT_CHANNELS: {
    GENERAL_CHANNEL_ID: string;
    MODLOGS_CHANNEL_ID: string;
  };

  VOICE_CHANNELS: {
    LOBBY_CHANNEL_ID: string;
    AFK_CHANNEL_ID: string;
  };

  COLORED_ROLES: Record<string, string>;

  OWNER_USER_ID: string;

  BOT_USERS: {
    NOVA_USER_ID: string;
    OCTAVIA_USER_ID: string;
  };
}

let config: Configuration;
if (process.env.NODE_ENV === "production") {
  config = (await import("./makeshift.js")).default;
} else {
  console.log("Loaded configuration for development mode");
  config = (await import("./development.js")).default;
}

export default config;
