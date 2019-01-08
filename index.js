const path = require("path");
const colors = require("colors");
const {verifyCommit} = require("./verifyCommit");

const projectDirectory = __dirname.replace(/(\\|\/)node_modules(.+)$/, '');
const defaults = require('./defaults');

try {
    packageJson = require(path.join(projectDirectory, 'package.json'));
} catch (e) {
    console.log(defaults.errorWhileParsingPackageJson, e);
    process.exit(1);
}

let config = packageJson['commit-naming-enforcement'] || {};

function getConfFromKey(key)
{
    return (config[key] !== undefined) ? config[key] : defaults[key];
}

/* Module is disabled, we stop right there */
if( !getConfFromKey("enabled") )
{
    process.exit(0);
}

const {exec} = require("child_process");
function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
}

let firstCommitFound = false;
let lastCommitFound = false;

let lastCommit;
execute("git rev-list HEAD --max-count=1", (val) => {
    lastCommit = val;
    lastCommitFound = !lastCommitFound;
    commitSHAFound();
});

let gitRefList;
let foundSHA;
execute("git rev-list HEAD --max-count=15 --pretty=%d", (val) => {
    gitRefList = val;
    foundSHA = (/commit ([^ ]+)\n.+[^ ]+\/HEAD/.exec(gitRefList) || [])[1];
    firstCommitFound = !firstCommitFound;
    commitSHAFound();
});

function commitSHAFound() {
    if (firstCommitFound && lastCommitFound) {
        execute(`git rev-list ${foundSHA}...${lastCommit}`, (commits) => {
            checkOnCommits(commits.split("\n").filter(Boolean));
        });
    }
}

function checkOnCommits(commits) {
    const max = commits.length;
    let localCounter = 1;
    commits.forEach((commitId) => {
        execute(`git log --format=%B -n 1 ${commitId}`, (commitBody) => {
            localCounter++;
            validOrFail(verifyCommit(commitId, commitBody, getConfFromKey));
        });
    });
    function validOrFail(returnedValue){
        if(returnedValue === 1)
        {
            process.exit(1);
        }
        if(localCounter > max)
        {
            process.exit(0);
        }
    }
}