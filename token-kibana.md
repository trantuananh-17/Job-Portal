docker exec -it elasticsearch_container bash
bin/elasticsearch-service-tokens create elastic/kibana default

# Lệnh chạy

docker compose up -d elasticseach

# Restart Kibana

docker compose up -d --force-recreate kibana

# Log

docker compose logs -f kibana
