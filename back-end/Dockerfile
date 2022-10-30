FROM node:14-alpine
#ENV NODE_ENV production
WORKDIR /app
COPY --chown=node:node package*.json /app/
RUN npm install
COPY --chown=node:node . /app/
USER node
EXPOSE 3000
CMD ["npm", "run", "dev"]