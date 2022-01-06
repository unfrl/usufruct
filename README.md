# Usufruct

> u·su·fruct

> /ˈyo͞ozəˌfrəkt,ˈyo͞osəˌfrəkt/

> noun:

    the right to enjoy the use and advantages of another's property short of the destruction or waste of its substance.

# Setup

> **TODO** update with full setup instructions.

For now, using `yarn link` to develop with the generated sdk client locally. Documenting this setup part mainly so I don't forget!

1. `cd packages/sdk && yarn link`
2. `cd packages/web && yarn link @unfrl/usufruct-sdk`

# CI

New versions of the client sdk are generated/published by the CI when the commit has a tag matching the pattern `server-*.*.*`
