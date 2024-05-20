#!/bin/bash
run_script=true

# This gets the user input for selecting what branch to deploy.
what_git_repo () {
	echo "What branch do you want to deploy from?"
	echo "eg. main, staging, testing."
	read -p "=>: " git_branch
}

# This will keep getting input from the user until the input is a valid branch.
set_repo () {
	local select_git_branch=true
	git stash

	while $select_git_branch
	do
		what_git_repo
		git checkout ${git_branch} && echo "${git_branch} is valid" && select_git_branch=false || echo "${git_branch} isn't valid try again"
	done
}

echo "Welcome to the deploy for Co2-app."

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
