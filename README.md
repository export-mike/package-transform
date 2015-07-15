```node index.js --env dev```
will replace .config area of package.json with contents of package.config.{ENV}.json if and only if there is a match.

TODO:

- CLI/bin it.
- Add key values to package.json from package.config.{ENV}.json
