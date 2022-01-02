#!/usr/bin/env bash

# Exit if any process errors
set -e

# Remove existing sdk directory if it exists
rm -rf packages/sdk-new

# Generate teh swagger-spec.json file from the API
cd ./packages/server
OPEN_API_GENERATION_ONLY=true yarn start
cd ../

if [ -z ${npmVersion+x} ]; then
    # Create the TypeScript client using openapi-generator-cli and the npmVersion specified in the swagger-config.json
    docker run --user 1000:1000 --rm -v ${PWD}:/local \
        openapitools/openapi-generator-cli generate -i /local/server/swagger-spec.json \
        -g typescript-fetch \
        -o /local/sdk-new \
        -c /local/server/swagger-config.json
else
    # Create the TypeScript client using openapi-generator-cli and the npmVersion specified in $npmVersion
    echo "Generating SDK at version '$npmVersion' due to \$npmVersion variable being set"
    docker run --user 1000:1000 --rm -v ${PWD}:/local \
        openapitools/openapi-generator-cli generate --additional-properties=npmVersion=$npmVersion \
        -i /local/server/swagger-spec.json \
        -g typescript-fetch \
        -o /local/sdk-new \
        -c /local/server/swagger-config.json
fi

# Install dependencies and build the "dist" folder of the client
cd ./sdk-new
yarn
