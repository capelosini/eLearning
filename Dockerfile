FROM node:21

# Change the workdir to API project folder
WORKDIR /eLearningAPI

# Copy the api folder to root
COPY ./eLearningAPI/* ./

# Install API dependencies
RUN npm install

# Expose the default ports for API
EXPOSE 8080

# Run api server
CMD node app.js

FROM mongo:latest

# Install Apache server and curl
RUN apt-get update && apt-get install -y apache2

# Create a directory to store files for Apache
WORKDIR /var/www/html

# Copy your files into the Apache directory
COPY ./eLearning/dist/* ./

# Configure apache
RUN a2enmod mime
RUN echo "Options -MultiViews\nRewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^ index.html [QSA,L]" >> ./.htaccess
RUN echo "<Directory /var/www/html> \nOptions Indexes FollowSymLinks\nAllowOverride All\nRequire all granted\n</Directory>" >> /etc/apache2/apache2.conf

# Expose for apache
EXPOSE 80

# Start MongoDB, Apache and API when the container starts
CMD mongod --fork --logpath /var/log/mongod.log && apache2ctl -D FOREGROUND