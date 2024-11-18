#!/bin/bash

# Removing old data from the production backups
sudo find /data/production/db/backups/* -type f -mtime +6 -delete

# Removing old data from the testing backups
sudo find /data/testing/db/backups/* -type f -mtime +6 -delete