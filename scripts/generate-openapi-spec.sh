#!/usr/bin/env bash

# Exit if any process errors
set -e

# Generate teh swagger-spec.json file from the API
cd ./packages/server
OPEN_API_GENERATION_ONLY=true yarn start
