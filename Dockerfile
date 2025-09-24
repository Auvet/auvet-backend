FROM node:18-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    netcat-traditional \
    openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --no-audit --no-fund --prefer-offline

COPY . .

RUN npm run build

EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
