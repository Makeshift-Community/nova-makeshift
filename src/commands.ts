import Command from "./Command.js";
import evaluateJavascriptCommand from "./commands/evaluateJavascript.js";
import searchWarframeWikiCommand from "./commands/searchWarframeWiki.js";
import linkWarframeResources from "./commands/linkWarframeResources.js";
import rulesCommand from "./commands/rules.js";

export default [
  evaluateJavascriptCommand,
  searchWarframeWikiCommand,
  linkWarframeResources,
  rulesCommand,
] as Command[];
