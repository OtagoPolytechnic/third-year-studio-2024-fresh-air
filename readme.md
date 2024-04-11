CO2 Project

This is a project to rewrite the system for the Co2 systems at Otago Polytech as the one that is currently set up is a bit old and could do with being updated.
The Co2 systems are used to check levels in some of the classrooms as some can get quite high and need windows open all year round.

It is being written in React, and will use Docker to run virtual containers. 

## Deploys
- Main: http://co2-app.duckdns.org

## Setting up VM Ubuntu Server
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
