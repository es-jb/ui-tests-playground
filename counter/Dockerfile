# Stage 1: Build the React app
FROM node:18 as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:stable-alpine

# Copy the built app from the previous stage to the Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the Nginx server is using
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
