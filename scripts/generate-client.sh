#!/usr/bin/env bash

# Exit if any process errors
set -e

# Remove existing out directory if it exists
rm -rf ../server/out

# Generate teh swagger-spec.json file from the API
cd ./packages/server
OPEN_API_GENERATION_ONLY=true yarn start

# Create the TypeScript client using openapi-generator-cli
docker run --user 1000:1000 --rm -v ${PWD}:/local \
    openapitools/openapi-generator-cli generate \
    -i /local/swagger-spec.json \
    -g typescript-fetch \
    -o /local/out/ts-fetch \
    -c /local/swagger-config.json

# Install dependencies and build the "dist" folder of the client
cd ./out/ts-fetch
yarn
