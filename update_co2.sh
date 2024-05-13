#!/bin/bash
echo Stopping docker containers if running.
sudo docker compose down
echo Removing any.
sudo docker rmi co2-nginx:latest postgres:16.2 frontend-co2-app:latest backend-co2-app:latest

echo Updating repo.
git stash
git checkout staging
git pull

echo Creating and Running container.
sudo docker compose up -d && echo Deploy Successful || echo Deploy Failed
