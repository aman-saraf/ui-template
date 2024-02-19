FROM node:18.15-alpine AS base

FROM base as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG ENVIRONMENT
ENV ENV $ENVIRONMENT
ENV NEXT_TELEMETRY_DISABLED 1

RUN echo "Initilizing build for $ENV environment"

RUN npm run init
RUN npm run format
RUN npm run build


FROM base as runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S discovervet
RUN adduser -S discovervet-ui -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=discovervet-template-ui:discovervet /app/.next/standalone ./
COPY --from=builder --chown=discovervet-template-ui:discovervet /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER discovervet-template-ui

EXPOSE 3001

ENV PORT 3001

CMD ["npm", "start"]