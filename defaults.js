/* Overridable values */
const enabled = true;
const regexToSeparateTitleAndBody = /(.+)((?:\n|.)*)?/;
const regexToCheckTitle = /^(build|ci|docs|feat|fix|perf|refactor|style|test)(\(.+\))?:/;
const titleNotCorresponding = "[commit-naming-enforcement][ERROR] Commit title not corresponding to standard";

/* Not overridable */
const errorWhileParsingPackageJson = "[commit-naming-enforcement][ERROR] Error while trying to parse package.json : ";

module.exports = {
    enabled,
    regexToSeparateTitleAndBody,
    regexToCheckTitle,
    titleNotCorresponding,
    errorWhileParsingPackageJson
};