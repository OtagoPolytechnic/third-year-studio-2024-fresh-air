#!/bin/bash
run_script=true

what_git_repo () {
	echo Welcome to the deploy for Co2-app.
	echo What branch do you want to deploy from?
	echo 1: main.
	echo 2: staging.
	echo 3: other.
	read -p ": " git_branch
}

set_repo () {
	what_git_repo
	git checkout ${git_branch} && echo success || echo failed to work
	echo ${git_branch}
}

set_repo

#echo Stopping docker containers if running.
#sudo docker compose down

#echo Removing any images for co2-app.
#sudo docker rmi co2-nginx:latest postgres:16.2 frontend-co2-app:latest backend-co2-app:latest

#echo Updating repo.
#git stash
#git checkout staging
#git pull

#echo Creating and Running container.
#sudo docker compose up -d && echo Deploy Successful || echo Deploy Failed
