# Built from Node latest Alpine
FROM node:8.11-alpine

# EXPOSE 8080 5432

# Specify an optional argument with a default value
ARG app_directory=/app

# Set the app directory as the context for all commands and entry to the container
WORKDIR ${app_directory}

# ONLY copy over the package.json to install NPM packages
COPY package.json .

# Install node module dependencies
RUN npm install
# RUN npm install knex 
# RUN npm install pg

# Add the rest of the project files(most builds will start from here based on cache)
COPY . .

# Start the node application as you normally would
CMD ["node", "server.js"]