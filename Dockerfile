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

RUN echo '#!/bin/bash\n\
echo "Starting AUVET Backend..."\n\
\n\
# Wait for MySQL to be ready\n\
while ! nc -z mysql 3306; do\n\
  echo "Waiting for MySQL..."\n\
  sleep 1\n\
done\n\
echo "Database is ready!"\n\
\n\
# Generate Prisma client\n\
echo "Generating Prisma client..."\n\
npx prisma generate\n\
\n\
# Push database schema\n\
echo "Pushing database schema..."\n\
npx prisma db push --force-reset\n\
\n\
echo "Starting application..."\n\
exec "$@"' > /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["npm", "run", "dev"]
