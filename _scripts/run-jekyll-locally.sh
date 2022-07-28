#!/bin/bash

set -euxo pipefail

bundle install
bundle exec jekyll serve
