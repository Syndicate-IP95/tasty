FROM node:lts

ARG NODE_ENV=production
#RUN apk add --no-cache --update curl bash
WORKDIR ./
COPY package* ./
# Install the npm packages
RUN npm ci

COPY . .

CMD ["npm", "run", "start"]