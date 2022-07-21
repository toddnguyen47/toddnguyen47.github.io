#!/bin/bash

set -euxo pipefail

# asciidoctor is a Ruby gem
asciidoctor aws-notes.adoc --out-file index.html
