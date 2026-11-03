#!/usr/bin/env bash
# Démarre l'app pour les agents (MCP Playwright) en arrière-plan :
#   - API WordPress mock (mock-wp-api/server.js) sur :3000, lancée depuis une
#     COPIE de mock-wp-api (json-server réécrit db.json à chaque POST, ex. le
#     formulaire de contact : ces écritures ne doivent pas finir dans le commit) ;
#   - ng serve (configuration de dev, locale source en-US, API sur
#     http://localhost:3000/wp-json/wp/v2) sur :4200.
# Attend que les deux répondent. Logs dans .agent-out/*.log.
#
# Prérequis : npm ci (racine) et npm ci --prefix mock-wp-api.
set -euo pipefail

out=.agent-out
mkdir -p "$out/playwright"
rm -rf "$out/mock-wp-api"
cp -R mock-wp-api "$out/mock-wp-api"

(cd "$out/mock-wp-api" && nohup node server.js > ../mock-api.log 2>&1 < /dev/null &)
nohup npx ng serve --port 4200 > "$out/ng-serve.log" 2>&1 < /dev/null &

if ! timeout "${START_TIMEOUT:-300}" bash -c \
  'until curl -sf http://localhost:3000/wp-json/wp/v2/posts >/dev/null && curl -sf http://localhost:4200/home >/dev/null; do sleep 3; done'; then
  echo "::error::l'app n'a pas démarré à temps"
  tail -n 50 "$out/mock-api.log" "$out/ng-serve.log"
  exit 1
fi
echo "App prête : http://localhost:4200/home (API WordPress mock : http://localhost:3000/wp-json/wp/v2)"
