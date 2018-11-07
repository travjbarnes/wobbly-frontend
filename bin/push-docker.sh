#! /bin/bash

export APP_REMOTE_DOCKER_PATH="$DOCKER_REPO"/"$DOCKER_REPO_NAMESPACE"/"$APP_IMAGE_NAME"

# tag with branch and travis build number then push
export TAG="$TRAVIS_BUILD_NUMBER"
echo Tagging with "$TAG"
docker tag "$DOCKER_IMAGE" "$APP_REMOTE_DOCKER_PATH":"$TAG"    
docker push "$APP_REMOTE_DOCKER_PATH":"$TAG"

# tag with "latest" then push
echo Tagging with latest
docker tag "$DOCKER_IMAGE" "$APP_REMOTE_DOCKER_PATH"
docker push "$APP_REMOTE_DOCKER_PATH"