#!/bin/bash

# Create a database backup for production database using pg_dump
sudo docker exec third-year-studio-2024-fresh-air-co2-db-1 pg_dump -U co2-user co2-db -f /tmp/db.sql
sudo docker cp third-year-studio-2024-fresh-air-co2-db-1:/tmp/db.sql /data/production/db/backups/db_Backup_$(date +%Y-%m-%d).sql

# Create a database backup for testingdocker exec third-year-studio-2024-fresh-air-co2-db-1 pg_dump -U co2-user co2-db -f /tmp/db.sql
sudo docker exec third-year-studio-2024-fresh-air-co2-db-testing-1 pg_dump -U co2-user co2-db-testing -f /tmp/db.sql
sudo docker cp third-year-studio-2024-fresh-air-co2-db-testing-1:/tmp/db.sql /data/testing/db/backups/db_Backup_$(date +%Y-%m-%d).sql