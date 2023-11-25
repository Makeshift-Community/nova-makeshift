import Command from "./Command.js";
import testCommand from "./commands/test.js";
import evaluateCommand from "./commands/evaluate.js";
import searchWikiCommand from "./commands/searchWiki.js";
import resourcesCommand from "./commands/resources.js";

export default [
  testCommand,
  evaluateCommand,
  searchWikiCommand,
  resourcesCommand,
] as Command[];
