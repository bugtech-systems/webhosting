# Use the official Node.js 18 image as the build environment
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight Nginx image as the production environment
FROM nginx:alpine


COPY nginx.conf /etc/nginx/nginx.conf


# Copy the built React application from the build environment to Nginx
COPY --from=build /app/build /usr/share/nginx/html


# Expose port 80
EXPOSE 80

# Command to start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
