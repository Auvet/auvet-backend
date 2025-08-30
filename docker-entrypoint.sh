#!/bin/sh

echo "Starting AUVET Backend..."

while ! nc -z mysql 3306; do
  sleep 1
done
echo "Database is ready!"

npx prisma generate

npx prisma db push --force-reset

echo "Starting application..."
exec "$@"
