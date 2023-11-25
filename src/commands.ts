import Command from "./Command.js";
import testCommand from "./commands/test.js";
import evaluateCommand from "./commands/evaluate.js";
import searchWikiCommand from "./commands/searchWiki.js";

export default [testCommand, evaluateCommand, searchWikiCommand] as Command[];
