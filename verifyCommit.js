const path = require("path");
const colors = require("colors");

const verifyCommit = (commitId, commitMsg, getConfFromKey) => {
    let [, title, body] = new RegExp(getConfFromKey("regexToSeparateTitleAndBody")).exec(commitMsg);
    if(new RegExp(getConfFromKey("regexToCheckTitle")).exec(title) === null)
    {
        console.log(getConfFromKey("titleNotCorresponding").red);
        console.log(`Involved commit id : ${commitId}`.yellow);
        console.log(`Involved commit title : ${title}`.underline.yellow);
        return 1;
    }

    return 0;
}

module.exports = {verifyCommit};