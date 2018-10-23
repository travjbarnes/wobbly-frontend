#! /bin/bash

usage() { echo "Usage: $0 [-d] for a development build, [-p] for a production build" 1>&2; exit 1; }

if [ $# == 0 ]; then usage; fi

while getopts ":dp" opt; do
    case "$opt" in
        d)
          docker-compose -f docker-compose-development.yml up
          ;;
        p)
          #docker-compose up
          docker run -it $DOCKER_IMAGE:latest -p 8080:8080 bin/docker-entrypoint.sh
          ;;
        *)
          usage
          ;;
    esac
done