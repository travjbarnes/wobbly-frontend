#! /bin/bash
usage() { echo "Usage: $0 [-d] for a development test, [-p] for production test" 1>&2; exit 1; }

if [ $# == 0 ]; then usage; fi

while getopts ":dp" opt; do
    case "$opt" in
        d)
          docker-compose -f docker-compose-development.yml run --entrypoint bin/test-docker-entrypoint.sh $DOCKER_SERVICE -p 8000
          ;;
        p)
          docker-compose -f docker-compose-production.yml run --entrypoint bin/test-docker-entrypoint.sh $DOCKER_SERVICE -p 8000
          ;;
        *)
          usage
          ;;
    esac
done