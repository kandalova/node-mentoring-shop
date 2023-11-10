FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --production && \
		npm cache clean --force
COPY . .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1
CMD ["npm", "start"]
