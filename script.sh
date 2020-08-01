#!/bin/bash

ssh root@$SERVER "mkdir -p ~/quotes-web"


scp -r ./* root@$SERVER:~/quotes-web

ssh root@$SERVER '

cd quotes-web
docker build -t quotes-web .
docker stop quotes-web
docker rm quotes-web
docker run -p 3010:80 -d --name quotes-web quotes-web:latest

'
