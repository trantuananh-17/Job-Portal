ARG REDIS_VERSION

FROM redis:${REDIS_VERSION:-7.2-alpine}

# Copy config
COPY config/redis.conf /usr/local/etc/redis/redis.conf

RUN mkdir -p /var/log/redis

# Expose port
EXPOSE 6379

# Run Redis with your custom config
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
