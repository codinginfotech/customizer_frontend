# check=skip=SecretsUsedInArgOrEnv
# ^ The VITE_FIREBASE_* values are the public web-app config (they identify the
#   project; access is governed by Firebase rules + authorised domains), not
#   secrets — the lint rule keys on the names alone.

# Build stage (context = this repo's root)
FROM node:22-alpine AS build
WORKDIR /app
# Vite inlines VITE_* at build time; ARGs are visible to RUN in this stage.
ARG VITE_API_URL=/api
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MEASUREMENT_ID
# shared/ is a vendored local package ("file:shared"); its manifest must exist
# before npm install so the symlink can be created.
COPY package.json package-lock.json* ./
COPY shared/package.json shared/
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

# Serve with nginx. default.conf.template is rendered with envsubst at start:
#   PORT          port nginx listens on            (default 80)
#   API_UPSTREAM  where /api and /uploads proxy to (default http://backend:4000)
# NGINX_ENTRYPOINT_LOCAL_RESOLVERS makes the image export NGINX_LOCAL_RESOLVERS
# (the container's DNS servers) so nginx can re-resolve API_UPSTREAM at runtime.
FROM nginx:1.27-alpine
ENV PORT=80 \
    API_UPSTREAM=http://backend:4000 \
    NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
