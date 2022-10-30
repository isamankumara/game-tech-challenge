FROM node:14
RUN mkdir /app
# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
#COPY ["package.json", "package-lock.json*", "./"]
COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY .env /app/.env
COPY . /app

RUN yarn  

# start app
CMD ["yarn", "start"]