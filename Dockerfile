# syntax=docker/dockerfile:1

# Production image for Coolify. Node and Bun versions match local development (.node-version).
ARG NODE_VERSION=26.12.1
ARG BUN_VERSION=1.4.3

FROM oven/bun:${BUN_VERSION} AS bun

FROM node:${NODE_VERSION}-trixie-slim AS base
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
RUN ln -s /usr/local/bin/bun /usr/local/bin/bunx
WORKDIR /app

FROM base AS prod-deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS build
# scripts/fetch-knowledge.sh clones the private knowledge repository over SSH.
RUN apt-get update \
	&& apt-get install -y --no-install-recommends git openssh-client ca-certificates \
	&& rm -rf /var/lib/apt/lists/*
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
# Build variables arrive as BuildKit secrets, never as build args, so no value is kept in
# image history or metadata. Coolify ("Docker BuildKit secrets") passes each build variable as
# --secret id=<NAME>,env=<NAME>; locally, export them and pass the same flags. Ids used here:
# KNOWLEDGE_DEPLOY_KEY, KNOWLEDGE_REPOSITORY, KNOWLEDGE_PATH, PUBLIC_URL_WEBSITE,
# PUBLIC_TURNSTILE_SITE_KEY, SECRET_RESEND_API_KEY, SECRET_TURNSTILE_KEY. All are optional.
RUN --mount=type=secret,id=KNOWLEDGE_DEPLOY_KEY,env=KNOWLEDGE_DEPLOY_KEY \
	--mount=type=secret,id=KNOWLEDGE_REPOSITORY,env=KNOWLEDGE_REPOSITORY \
	--mount=type=secret,id=KNOWLEDGE_PATH,env=KNOWLEDGE_PATH \
	--mount=type=secret,id=PUBLIC_URL_WEBSITE,env=PUBLIC_URL_WEBSITE \
	--mount=type=secret,id=PUBLIC_TURNSTILE_SITE_KEY,env=PUBLIC_TURNSTILE_SITE_KEY \
	--mount=type=secret,id=SECRET_RESEND_API_KEY,env=SECRET_RESEND_API_KEY \
	--mount=type=secret,id=SECRET_TURNSTILE_KEY,env=SECRET_TURNSTILE_KEY \
	bun run build

FROM base AS runtime
# Coolify's health check runs curl inside the container.
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl \
	&& rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 4321
CMD ["bun", "./dist/server/entry.mjs"]
