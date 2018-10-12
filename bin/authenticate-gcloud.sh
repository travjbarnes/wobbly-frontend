#! /bin/bash

export COMPUTE_ZONE="us-west2-a"
export GCLOUD_PROJECT="wobbly-backend"

export CLOUDSDK_CORE_DISABLE_PROMPTS=1

openssl aes-256-cbc -K $encrypted_b48b32dc2f5c_key -iv $encrypted_b48b32dc2f5c_iv -in credentials.tar.gz.enc -out credentials.tar.gz -d
tar -xzf credentials.tar.gz
mkdir -p lib

gcloud auth activate-service-account --key-file client-secret.json
gcloud config set project $GCLOUD_PROJECT
gcloud config set compute/zone $COMPUTE_ZONE
gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin $DOCKER_REPO