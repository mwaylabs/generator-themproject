#!/bin/sh

# Install npm dependencies
npm install

# Copy pre-commit hook
cp ./scripts/pre-commit ./.git/hooks/pre-commit