# Use the official Node.js Alpine image for a small footprint
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching
# This prevents re-running npm install on every code change
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of your application source code
# This is necessary to build and run the app
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npx", "next", "dev"]