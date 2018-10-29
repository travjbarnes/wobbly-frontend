#! /bin/bash

# Tag, Push and Deploy only if it's not a pull request
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

    # Push only if we're testing the staging or production branch
    if [ "$TRAVIS_BRANCH" == "staging" ] || [ "$TRAVIS_BRANCH" == "production" ]; then

        export COMPUTE_ZONE="us-west2"
        export GCLOUD_PROJECT="wobbly-app"

        export IMAGE_NAME="$DOCKER_IMAGE"-"$TRAVIS_BRANCH"
        export CLUSTER_NAME="$GCLOUD_PROJECT"-"frontend-cluster"-"$TRAVIS_BRANCH"
        export DEPLOYMENT_NAME="$GCLOUD_PROJECT"-"frontend-app"-"$TRAVIS_BRANCH"

        source bin/install-tools.sh
        source bin/authenticate-gcloud.sh
        source bin/docker-push.sh
        source bin/provision.sh

   else
       echo "Skipping deploy because branch is not staging or production"
   fi
else
    echo "Skipping deploy because it's a pull request"
fi