#!/bin/sh
conda env export > environment.yaml
sed -i -e '/^prefix: /d' environment.yaml
