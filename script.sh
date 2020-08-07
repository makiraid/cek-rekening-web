#!/bin/bash

ssh root@$SERVER "mkdir -p ~/norek-web"


scp -r ./* root@$SERVER:~/norek-web

ssh root@$SERVER '

cd quotes-web
docker build -t norek-web .
docker stop norek-web
docker rm norek-web
docker run -p 3006:80 -d --name norek-web norek-web:latest

'
