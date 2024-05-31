#!/bin/bash
run_script=true
echo ===================================================================
echo ===================================================================

# This Checks if the user wants to continue or not
last_chance_to_stop () {
	start=true
	while $start
	do
        	local input=""
	        echo "Warning any changes in your current branch will be stashed, do you want to continue?"
	        read -p "y/n: " input
	        if [ $input = "y" ]
	        then
        	        start=false
	        elif [ $input = "n" ]
	        then
        	        exit
	        fi
	done

}

# This gets the user input for selecting what branch to deploy.
what_git_repo () {
	echo "What branch do you want to deploy from?"
	echo "eg. main, staging, testing."
	read -p "=>: " git_branch
}

# This will keep getting input from the user until the input is a valid branch.
set_repo () {
	local select_git_branch=true
	git stash > /dev/null 2>&1

	while $select_git_branch
	do
		git fetch > /dev/null 2>&1
		what_git_repo
		git checkout ${git_branch} > /dev/null 2>&1 && echo "${git_branch} is valid" && git pull /dev/null 2>&1 && select_git_branch=false || echo "${git_branch} isn't valid try again"
	done
}


# Start of Script =============================
echo "Welcome to the deploy for Co2-app.\n"

# Runs the last chance function.
last_chance_to_stop

# Changes the repo to what the user wants.
set_repo

echo ====================================================================
# Stops the docker container.
sudo docker compose down > /dev/null 2>&1

# Removes docker images.
echo "Removing the Proxy, Frontend and Backend."
sudo docker rmi co2-nginx:latest frontend-co2-app:latest backend-co2-app:latest && echo "Succefully Removed images || echo "Failed Error" && exit

# Makes new Docker containers.
echo Creating and Running container.
sudo docker compose up -d && echo Deploy Successful || echo Deploy Failed
