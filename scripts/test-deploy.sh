#!/bin/sh
set -e

# fail if jq is not installed
jq --help > /dev/null

# verify that git describe works
version=$(git describe --tags)
echo "If deployed, this commit would have version "$version""

# update the version in app.json
cp config/app.development.json app.template.json
jq '.expo.slug = "wobbly"' < app.template.json > app.json
rm app.template.json

# verify that expo works
echo "Most recent Expo release:"
expo publish:history --count 1
