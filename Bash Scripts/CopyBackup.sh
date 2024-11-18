#!/bin/bash

# Coping the backup from production to a backup VM
scp /data/production/db/backups/db_Backup_$(date +%Y-%m-%d).sql  IoTData@4.236.191.81:/data/production/db/backups/db_Backup_$(date +%Y-%m-%d).sql

# Coping the backup from testing to a backup VM
scp /data/testing/db/backups/db_Backup_$(date +%Y-%m-%d).sql  IoTData@4.236.191.81:/data/testing/db/backups/db_Backup_$(date +%Y-%m-%d).sql