#!/bin/bash

cd "$(dirname $0)"

snapshot () {(
  set -e

  # create snapshot folder
  rm -rf ${1}
  mkdir -p ${1}
  #find ${1} -not -name 'node_modules' -depth 1 -print0 | xargs -0 rm -rf

  # init package
  cd ${1}
  node ../../../build/bin/index.js init --vvv --noCommit $2

  # remove git folde3r
  rm -rf .git

  # replace carna package
  cd node_modules && rm -rf carna && ln -s ../../../.. carna
)}

case "${1}" in
  app)
    snapshot "$(PWD)/${1}" ""
    ;;
  cli)
    snapshot "$(PWD)/${1}" "-p -c"
    ;;
  lib)
    snapshot "$(PWD)/${1}" "-p"
    ;;
  *)
    echo "Error: Unknown/Missing parameter"
    echo ""
    echo "$0 <app|cli|lib>"
    ;;
esac
