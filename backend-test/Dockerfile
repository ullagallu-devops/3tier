FROM node:20-alpine

# Add bash for debugging if needed
RUN apk add --no-cache bash

# Create a non-root user
RUN mkdir /opt/server 
RUN adduser -D -h /opt/server crud
RUN chown crud:crud -R /opt/server

WORKDIR /opt/server

# Copy dependencies
COPY package.json ./ 

# Install dependencies explicitly (including production and auto-instrumentation packages)
RUN npm install --omit=dev --legacy-peer-deps

# Copy remaining files
COPY *.js ./ 

# Switch to non-root user
USER crud

# Expose port
EXPOSE 8080

CMD ["node", "index.js"]
