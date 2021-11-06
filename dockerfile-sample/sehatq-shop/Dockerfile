FROM node:14.17.5 as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY src ./src
COPY .env .
COPY .eslintrc.js .
COPY tsconfig.json .
COPY vite.config.ts .
COPY index.html .

RUN yarn run build

FROM node:14.17.5-alpine

WORKDIR /app

COPY server .

RUN yarn install --production

COPY --from=build /app/dist /app/dist
COPY .env .

EXPOSE 3000
CMD ["yarn", "run", "start"]
