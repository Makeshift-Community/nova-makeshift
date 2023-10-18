export default interface Configuration {
  GUILD_ID: string;

  CATEGORY_VOICE_ID: string;

  TEXT_CHANNELS: {
    GENERAL_ID: string;
    MODLOGS_ID: string;
  };

  VOICE_CHANNELS: {
    LOBBY_ID: string;
    AFK_CHANNEL_ID: string;
  };

  COLORED_ROLES: Record<string, string>;

  OWNER_USER_ID: string;

  BOT_USERS: {
    NOVA_ID: string;
    OCTAVIA_ID: string;
  };
}
