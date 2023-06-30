FROM node:18.16.1

RUN npm install -g pnpm@7.25.0

WORKDIR /app
RUN rm -rf ./*
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]
