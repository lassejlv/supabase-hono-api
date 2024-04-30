FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

EXPOSE ${PORT}

CMD ["bun", "run", "start"]