#! /bin/bash -x

gcloud config set compute/zone $COMPUTE_ZONE

# create kubernetes cluster
#gcloud container clusters create $CLUSTER_NAME

# authenticate to new cluster
gcloud container clusters get-credentials $CLUSTER_NAME

# deploy image to cluster
#kubectl run $DEPLOYMENT_NAME --image $REMOTE_DOCKER_PATH --port 8000

# update cluster's deployed image
kubectl set image deployment/$DEPLOYMENT_NAME $IMAGE_NAME=$REMOTE_DOCKER_PATH:$TAG

kubectl rollout status deployment/$DEPLOYMENT_NAME

# expose service
#kubectl expose deployment $DEPLOYMENT_NAME --type LoadBalancer --port 8000 --target-port 8000 --v=3