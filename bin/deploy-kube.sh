#! /bin/bash -x

# authenticate to new cluster
gcloud container clusters get-credentials $CLUSTER_NAME

# update cluster's deployed image
kubectl set image deployment/$DEPLOYMENT_NAME $IMAGE_NAME=$REMOTE_DOCKER_PATH:$TAG

# display status
kubectl rollout status deployment/$DEPLOYMENT_NAME