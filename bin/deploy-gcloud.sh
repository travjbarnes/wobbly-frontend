#! /bin/bash

# Tag, Push and Deploy only if it's not a pull request
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then

    # Push only if we're testing the master branch
    #if [ "$TRAVIS_BRANCH" == "master" ]; then

        export GAE_PYTHONPATH=${HOME}/.cache/google_appengine 
        export PATH=$PATH:${HOME}/google-cloud-sdk/bin 
        export PYTHONPATH=${PYTHONPATH}:${GAE_PYTHONPATH} 
        export CLOUDSDK_CORE_DISABLE_PROMPTS=1

        openssl aes-256-cbc -K $encrypted_b48b32dc2f5c_key -iv $encrypted_b48b32dc2f5c_iv -in credentials.tar.gz.enc -out credentials.tar.gz -d
        if [ ! -d "${GAE_PYTHONPATH}" ]; then python scripts/fetch_gae_sdk.py $(dirname "${GAE_PYTHONPATH}"); fi
        if [ ! -d ${HOME}/google-cloud-sdk ]; then curl https://sdk.cloud.google.com | bash; fi
        tar -xzf credentials.tar.gz
        mkdir -p lib
        gcloud auth activate-service-account --key-file client-secret.json

        gcloud config set project wobbly-backend
        
        gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin $DOCKER_REPO

        #cat client-secret.json | docker login -u _json_key --password-stdin $DOCKER_REPO
        
        REMOTE_DOCKER_PATH="$DOCKER_REPO"/"$DOCKER_REPO_NAMESPACE"/"$DOCKER_IMAGE"

        # tag with branch and travis build number then push
        TAG=travis-buildnum-"$TRAVIS_BUILD_NUMBER"
        echo Tagging with "$TAG"
        docker tag "$DOCKER_IMAGE" "$REMOTE_DOCKER_PATH":"$TAG"    
        docker push "$REMOTE_DOCKER_PATH":"$TAG"

        # tag with "latest" then push
        TAG=latest
        echo Tagging with "$TAG"
        docker tag "$DOCKER_IMAGE" "$REMOTE_DOCKER_PATH":"$TAG"
        docker push "$REMOTE_DOCKER_PATH":"$TAG"
    
    #else
    #    echo "Skipping deploy because branch is not master"
    #fi
else
    echo "Skipping deploy because it's a pull request"
fi