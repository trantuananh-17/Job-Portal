ARG RABBITMQ_VERSION

FROM rabbitmq:${RABBITMQ_VERSION:-3.13-rc-management-alpine}

COPY config/rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

RUN rabbitmq-plugins enable --offline rabbitmq_management
