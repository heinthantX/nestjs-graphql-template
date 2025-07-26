FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY src ./src
COPY tsconfig.json nest-cli.json ./

RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist

CMD ["yarn", "start:prod"]