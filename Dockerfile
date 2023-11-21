FROM mongo:latest

# Install nodejs and update packages
RUN apt update -y && apt install -y ca-certificates curl gnupg && mkdir -p /etc/apt/keyrings && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt update -y && apt install -y nodejs

# Update npm
RUN npm install -g npm

# Change the workdir to API project folder
WORKDIR /eLearningAPI

# Copy the api folder to root
COPY ./eLearningAPI/* ./

# Install API dependencies
RUN npm install

# Expose the default ports for API
EXPOSE 8080

# Set the frontend workdir
WORKDIR /eLearning

# Copy your files into app directory
COPY ./eLearning/* ./

# Install dependencies
RUN npm install

# Expose for app
EXPOSE 5173

# Start MongoDB, Frontend and API when the container starts
CMD mongod --fork --logpath /var/log/mongod.log && nohup node /eLearningAPI/app.js & npm run dev