#!/bin/bash
echo Stopping docker containers if running.
sudo docker compose down
echo Removing any
sudo docker rmi co2-nginx:latest postgres:16.2 frontend-co2-app:latest third-year-studio-2024-fresh-air-backend:latest
echo Updating repo.
git stash
git checkout staging
git pull
