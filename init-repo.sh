#!/usr/bin/env bash
#
# Script to initialize the repo
# - install required node packages
# - install git hooks

node=`which node 2>&1`
if [ $? -ne 0 ]; then
  echo "Please install NodeJS."
  echo "http://nodejs.org/"
  exit 1
fi

npm=`which npm 2>&1`
if [ $? -ne 0 ]; then
  echo "Please install NPM."
fi


echo "Installing required npm packages ..."
npm install


# Don't need git hooks in travis-ci
if [ -z "${TRAVIS}" ]; then
    echo "Installing git hooks ..."
    cp scripts/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
fi