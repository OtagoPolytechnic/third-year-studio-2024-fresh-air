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