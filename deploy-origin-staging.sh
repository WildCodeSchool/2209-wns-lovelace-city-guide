#!/bin/sh
echo 'Starting prodution deploy ⚙'
git fetch origin && git reset --hard origin/staging && git clean -f -d
./build-start.prod.sh