#!/usr/bin/env bash

# Exit if any process errors
set -e

# Remove existing sdk directory if it exists
rm -rf packages/sdk

docker run --user 1000:1000 --rm -v ${PWD}/packages:/local \
    openapitools/openapi-generator-cli generate \
    -i /local/server/swagger-spec.json \
    -g typescript-fetch \
    -o /local/sdk \
    -c /local/server/swagger-config.json
