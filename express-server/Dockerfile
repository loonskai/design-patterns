# Build stage
FROM node:14.15.0-stretch as base
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# Development
FROM base
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "start:express"]
