# Use an official Node.js runtime as the base image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React app
RUN npm run build

FROM nginx

# Copy the build output to replace the default nginx contents.
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

#Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port your application will run on (default for React is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]