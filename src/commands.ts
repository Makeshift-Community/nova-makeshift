import type Command from "./Command.ts";
import evaluateJavascriptCommand from "./commands/evaluateJavascript.ts";
import searchWarframeWikiCommand from "./commands/searchWarframeWiki.ts";
import linkWarframeResources from "./commands/linkWarframeResources.ts";
import rulesCommand from "./commands/rules.ts";

export default [
  evaluateJavascriptCommand,
  searchWarframeWikiCommand,
  linkWarframeResources,
  rulesCommand,
] as Command[];
