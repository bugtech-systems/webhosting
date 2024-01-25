#!/bin/bash

PG_USER='postgres'  # Use the 'postgres' user for script execution
NEW_USER='irisoft'
NEW_DB='colp1'

# Create PostgreSQL user
psql -U $PG_USER -c "CREATE USER $NEW_USER;"

# Create PostgreSQL database and grant privileges
psql -U $PG_USER -c "CREATE DATABASE $NEW_DB WITH OWNER=$NEW_USER;"
psql -U $PG_USER -c "GRANT ALL PRIVILEGES ON DATABASE $NEW_DB TO $NEW_USER;"
