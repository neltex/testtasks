# Stage 1: Build Frontend
FROM node:16-alpine AS node_builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY resources/js ./resources/js
COPY resources/css ./resources/css
COPY resources/views ./resources/views
COPY webpack.mix.js ./

RUN npm run build

FROM php:8.1-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www

COPY --from=node_builder /app/public/build /var/www/public/build

RUN composer install --optimize-autoloader --no-dev

RUN chown -R www-data:www-data /var/www

EXPOSE 8000
CMD ["php-fpm"]
