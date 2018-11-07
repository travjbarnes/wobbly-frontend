#! /bin/bash -x

# authenticate to new cluster
gcloud container clusters get-credentials $APP_CLUSTER_NAME

# update cluster's deployed image
kubectl set image deployment/$APP_DEPLOYMENT_NAME $APP_IMAGE_NAME=$APP_REMOTE_DOCKER_PATH:$TAG

# display status
kubectl rollout status deployment/$APP_DEPLOYMENT_NAME