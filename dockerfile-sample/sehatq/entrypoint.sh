#!/bin/sh
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

/app/bin/prometheus_exporter -b 0.0.0.0 &

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"