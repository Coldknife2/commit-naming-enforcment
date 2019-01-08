# commit-naming-enforcement 

A commit name verification tool

## Installation :

Install your favorite git hook tool. (Recommended : [Husky](https://github.com/typicode/husky))

In your package.json, you can then start with your preferred hook : `node -e require('commit-naming-enforcement')`

Exemple (using Husky) :
```json
    ...
    "husky": {
        "hooks": {
            "pre-commit": "npm run precommit-msg && npm run eslint",
            "pre-push": "node -e require('commit-naming-enforcement')"
        }
    }
    ...
```

## Usage : 

A few config keys are availible, all setted/listed in `defaults.js`, and can be overrided in the project's `package.json`
you need to use the corresponding key : `commit-naming-enforcement`


**package.json** :
```json
    ...
    "scripts": {}, 
    "commit-naming-enforcement": {
        "enabled" : true,
        "regexToSeparateTitleAndBody" : ".",
        "regexToCheckTitle" : ".",
        "titleNotCorresponding" : "Commit title faulty, please see https://github.com/angular/angular/blob/master/CONTRIBUTING.md for guidelines"
    }
    ...
```

## Config keys

### `Enabled`, Boolean
If false, the commits won't be verified

### `regexToSeparateTitleAndBody`, Regular expression
This RegExp is used to separate the commit title and its body. 

Then the title shall be parsed for conformity.

If you wish to do a validation check on all the commit (body + title), you can use this regex : `"(\n|.)*"`

### `regexToCheckTitle`, Regular expression
The validation check. In the case of no-match, it is considered as an error. 

Meaning the evaluated 'title' **must** match the regex for the commit to be accepted

### `titleNotCorresponding`, String
The error message that will be displayed if the previous `regexToCheckTitle` fail