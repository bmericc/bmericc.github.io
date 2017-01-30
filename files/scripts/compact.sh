#!/bin/bash

for f in $(ls ../dbs/*.db); do gzip ../dbs/$f; done;
