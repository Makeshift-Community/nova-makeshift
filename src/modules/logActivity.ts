// Internal dependencies
import COMMON_CONFIG from "../resources/common.js";
const { DATABASE_ENCRYPTION_PUBLIC_KEY } = COMMON_CONFIG;
import CONFIG from "../resources/configuration.js";
const { GUILD_ID } = CONFIG;

// External dependencies
import { Sequelize, DataTypes } from "sequelize";
import {
  publicEncrypt,
  randomBytes,
  createHash,
  createPublicKey,
} from "node:crypto";
import { Message, VoiceState } from "discord.js";
import { RSA_PKCS1_OAEP_PADDING } from "node:constants";

// Configuration
const SALT_BITS = 512;
const SALT_LENGTH = SALT_BITS / 8;
const DATABASE_ADDRESS = "./cache/database.sqlite3";

const keyObject = createPublicKey(DATABASE_ENCRYPTION_PUBLIC_KEY);
const key = {
  key: keyObject,
  padding: RSA_PKCS1_OAEP_PADDING,
};

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DATABASE_ADDRESS,
  logging: false,
});

let connectionEstablished = false;
try {
  await sequelize.authenticate();
  connectionEstablished = true;
} catch (error) {
  console.error(
    "Unable to connect to the database. Logging has been disabled.",
  );
  console.error(error);
}

// Create models
const LoggedMessageModel = sequelize.define(
  "LoggedMessage",
  {
    messageId: DataTypes.BLOB,
    authorId: DataTypes.BLOB,
    date: DataTypes.BLOB,
    salt: DataTypes.BLOB,
  },
  {
    timestamps: false,
  },
);
await LoggedMessageModel.sync().catch(console.error);

const LoggedVoiceStateModel = sequelize.define(
  "LoggedVoiceState",
  {
    userId: DataTypes.BLOB,
    oldChannelId: DataTypes.BLOB,
    newChannelId: DataTypes.BLOB,
    date: DataTypes.BLOB,
    salt: DataTypes.BLOB,
  },
  {
    timestamps: false,
  },
);
await LoggedVoiceStateModel.sync().catch(console.error);

const BotStatusModel = sequelize.define("BotStatus", {
  event: DataTypes.STRING,
  date: DataTypes.DATE,
});
await BotStatusModel.sync().catch(console.error);

// Write bot status to database
const loggedBotStatus = {
  event: "process started",
  date: new Date(),
};
await BotStatusModel.create(loggedBotStatus).catch(console.error);

function encryptWithSalt(secret: Buffer, salt: Buffer): Buffer {
  const saltedSecret = Buffer.concat([salt, secret]);
  const encryptedSecret = publicEncrypt(key, saltedSecret);
  return encryptedSecret;
}

function hash(secret: Buffer): Buffer {
  const hash = createHash("SHA3-512");
  hash.update(secret);
  const hashedSecret = hash.digest();
  return hashedSecret;
}

export async function logMessageActivity(message: Message) {
  // Step 0: Check if database connection was established
  if (!connectionEstablished) {
    return;
  }

  // Step 1: Check if message was issued on Makeshift guild
  if (message.guild?.id !== GUILD_ID) {
    return;
  }

  // Step 2: Prepare data
  const messageId = Buffer.from(message.id);
  const authorId = Buffer.from(message.author.id);
  const date = Buffer.from(message.createdAt.toISOString());

  // Step 3: Generate a cryptographically strong, random salt
  const salt = randomBytes(SALT_LENGTH);

  // Step 4: Hash author id
  /**
   * Hashing the author id is not necessary, but it is a good practice to
   * prevent the attacker from guessing the author id. This can be done
   * because the list of users is finite and known.
   */
  const hashedAuthor = hash(authorId);

  // Step 5: Encrypt data
  const encryptedMessageId = encryptWithSalt(messageId, salt);
  const encryptedAuthorId = encryptWithSalt(hashedAuthor, salt);
  const encryptedDate = encryptWithSalt(date, salt);
  /**
   * Important: It is absolutely crucial that the salt is encrypted as well,
   * otherwise, the attacker can simply use the salt and guess the message id,
   * author, and date.
   */
  const encryptedSalt = publicEncrypt(DATABASE_ENCRYPTION_PUBLIC_KEY, salt);

  // Step 6: Store encrypted data
  const loggedMessage = {
    messageId: encryptedMessageId,
    authorId: encryptedAuthorId,
    date: encryptedDate,
    salt: encryptedSalt,
  };
  await LoggedMessageModel.create(loggedMessage)
    .catch(console.error)
    .then(() => {
      console.log("M\r");
    });
}

export async function logVoiceActivity(
  oldState: VoiceState,
  newState: VoiceState,
) {
  // Step 0: Check if database connection was established
  if (!connectionEstablished) {
    return;
  }

  // Step 1: Check if message was issued on Makeshift guild
  if (newState.guild.id !== GUILD_ID) {
    return;
  }
  if (newState.member === null) {
    return;
  }

  // Step 2: Prepare data
  const userId = Buffer.from(newState.member.id);
  const oldChannelId = Buffer.from(oldState.channelId ?? "null");
  const newChannelId = Buffer.from(newState.channelId ?? "null");
  const date = Buffer.from(new Date().toISOString());

  // Step 3: Generate a cryptographically strong, random salt
  const salt = randomBytes(SALT_LENGTH);

  // Step 4: Hash member id
  /**
   * Hashing the member id is not necessary, but it is a good practice to
   * prevent the attacker from guessing the member id. This can be done
   * because the list of users is finite and known.
   */
  const hashedMember = hash(userId);

  // Step 5: Encrypt data
  const encryptedUserId = encryptWithSalt(hashedMember, salt);
  const encryptedOldChannelId = encryptWithSalt(oldChannelId, salt);
  const encryptedNewChannelId = encryptWithSalt(newChannelId, salt);
  const encryptedDate = encryptWithSalt(date, salt);
  /**
   * Important: It is absolutely crucial that the salt is encrypted as well,
   * otherwise, the attacker can simply use the salt and guess the message id,
   * author, and date.
   */
  const encryptedSalt = publicEncrypt(DATABASE_ENCRYPTION_PUBLIC_KEY, salt);

  // Step 6: Store encrypted data
  const loggedVoiceState = {
    userId: encryptedUserId,
    oldChannelId: encryptedOldChannelId,
    newChannelId: encryptedNewChannelId,
    date: encryptedDate,
    salt: encryptedSalt,
  };
  await LoggedVoiceStateModel.create(loggedVoiceState)
    .catch(console.error)
    .then(() => {
      console.log("V\r");
    });
}
