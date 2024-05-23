# Deploy Script

## How to Deploy and Redeploy App with script

1. Move to root of the repo in a VM.
2. Run **update_co2.sh** script.
```
bash update_co2.sh
```
*Note, you must be in the root where the script is.*
3. It will ask you if you if you want to continue and warn you that any local changes will be stashed.
4. Enter "y" to continue.
5. You will be asked what repo to deploy from and it will give you a couple of examples, if you enter a repo that doesn't exist. You will be asked to try again until you spell the repo correctly.
6. It will then shutdown the current docker compose if one exists and remove all docker images that belong to the co2-app project, except for the database.
*Note, currently if you want to remove the db. You have to do it yourself.*
7. Then it will docker compose the app and let you know if it's successful or fails.
***It should always be successful, unless someone makes changes you the compose image names or moves the compose file.***