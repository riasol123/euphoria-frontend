#!/bin/bash

# Recreate config file
rm -rf /usr/share/nginx/html/env-config.js
touch /usr/share/nginx/html/env-config.js

# Add assignment 
echo "window._env_ = {" >> /usr/share/nginx/html/env-config.js

# Read each line in .env file
# Each line represents key=value pairs
for line in $(env)
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e VITE_; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    
    # Append configuration property to JS file
    echo "  $varname: \"$varvalue\"," >> /usr/share/nginx/html/env-config.js
  fi
done

echo "}" >> /usr/share/nginx/html/env-config.js 