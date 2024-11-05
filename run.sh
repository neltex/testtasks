#!/bin/bash


rm -rf /var/www/public/hot


php artisan migrate &

php-fpm &

rm -rf /var/www/public/hot

npm run dev

