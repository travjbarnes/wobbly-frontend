#! /bin/bash

# Tag, Push and Deploy only if it's not a pull request
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

    # Push only if we're testing the staging or production branch
    if [ "$TRAVIS_BRANCH" == "staging" ] || [ "$TRAVIS_BRANCH" == "production" ]; then
        
        if [ "$TRAVIS_BRANCH" == "staging" ]; then
            export COMPUTE_ZONE="us-west2-a"
        elif [ "$TRAVIS_BRANCH" == "production" ]; then
            export COMPUTE_ZONE="us-west1-a"
        fi
        
        export GCLOUD_PROJECT="wobbly-app"

        export IMAGE_NAME="$DOCKER_IMAGE"-"$TRAVIS_BRANCH"
        export CLUSTER_NAME="frontend-cluster"-"$TRAVIS_BRANCH"
        export DEPLOYMENT_NAME="frontend-app"-"$TRAVIS_BRANCH"
        export SERVICE_NAME="frontend-app-service"-"$TRAVIS_BRANCH"

        source bin/install-tools.sh
        source bin/authenticate-gcloud.sh
        source bin/push-docker.sh
        source bin/deploy-kube.sh

        kubectl get service $SERVICE_NAME -o json 
        export ENDPOINT="http://0.0.0.0:8000/"

   else
       echo "Skipping deploy because branch is not staging or production"
   fi
else
    echo "Skipping deploy because it's a pull request" 
fi