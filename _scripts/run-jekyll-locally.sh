#!/bin/bash

set -euxo pipefail

# build typescript
tsc --build --verbose

bundle install
bundle exec jekyll serve
