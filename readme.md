CO2 Project

This is a project to rewrite the system for the Co2 systems at Otago Polytech as the one that is currently set up is a bit old and could do with being updated.
The Co2 systems are used to check levels in some of the classrooms as some can get quite high and need windows open all year round.

It is being written in React, and will use Docker to run virtual containers. 

## Deploys
- Main: http://co2-app.duckdns.org

## Update Script for existing configured VM
For updating the deploy, cd into the repo and run this command.
**Note, you must be in the root of the repo for the command to work.
```
bash update_co2.sh
```

The script will stop docker, remove the existing images, stash any existing changes and checkout to the staging branch and pull any changes, before it rebuilds and deploys the project.
The script will say at the end if it's successful or not.

### Making Changes to the DB
Once all docker containers are up and running, run this command.
```
docker exec -it co2-backend sh
npx prisma generate
npx prisma migrate dev
exit
docker ps
sudo docker cp <backend CONTAINER ID>:/backend/prisma/migrations /home/IoTData/third-year-studio-2024-fresh-air/backend/prisma/
```

This will go into the docker container for the backend, create the new migration and apply it.
exit leaves the docker container.
Run docker ps to get the backend CONTAINER ID, copy it and use it for the last command.
This last command that you add the CONTAINER ID to, copies the migration folder into your repo.
Add this to your git repo and commit it.
Only do this when you have made changes to the DB schema, You don't need to do this every time you redeploy.
You will have to do this if you delete your DB.

## Setting up VM Ubuntu Server for Deploy
### Install Docker

Run these commands to install docker:
```
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
apt-cache policy docker-ce
sudo apt install docker-ce
```

### Using docker without sudo
```
sudo usermod -aG docker ${USER}
su - ${USER}
```

#### Optional
If other users exist and you want to use docker without sudo on their account, run this command and replace \<username\> with their username:
```
replace <username> with the user, don't think this will ever be needed.
sudo usermod -aG docker <username>
```

## Making SSH-key for github
Run this command
```
ssh-keygen
```
Press enter to save to default dir.
Press enter without entering a passphrase.
Press enter again without passphrase.

It will say the location of your new SSH-key:
e.g /home/\<user\>/.ssh/id_rsa.pub

Cat your ssh:
***Note: cat is printing the content of a file to the screen***
*e.g cat /home/\<user\>/.ssh/id_rsa.pub*

**Copy all the file text and add to your github account**

## Clone the repo and run docker
***Make sure http and https is enabled for your VM***
Clone Repo and cd into it.

#### Run docker via compose:
This will build and run the project.
***Make sure you are in the correct branch you want***
```
docker compose up
```
To put into foreground
Ctr z

**Close putty or other terminal without logging out or exit command, other wise the docker compose will be shutdown**
