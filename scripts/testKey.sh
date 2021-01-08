#! /bin/bash --

# A script to create the necessary 
# public and private keys for test
# environment

openssl genrsa -out test_privates.key 1024
openssl rsa -in test_private.key -out test_publics.key -pubout -outform PEM
exit 0