FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache g++
COPY . .
EXPOSE 2020
CMD ["node","index.js"]