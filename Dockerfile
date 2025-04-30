FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npx swc src -d dist
CMD ["node", "dist/server.js"]
