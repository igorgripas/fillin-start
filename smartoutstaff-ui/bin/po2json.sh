#!/bin/bash

pushd `dirname $0` > /dev/null;
ROOT_DIR=`pwd`'/..';
popd > /dev/null;
mkdir ${ROOT_DIR}/dist/lang

# node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/ru.po" -f jed1.x -p "${ROOT_DIR}/dist/lang/ru.json";
# node "${ROOT_DIR}/node_modules/po2json/bin/po2json" "${ROOT_DIR}/lang/uk.po" -f jed1.x -p "${ROOT_DIR}/dist/lang/uk.json";
