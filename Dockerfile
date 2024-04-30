FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install
RUN bun run compile

EXPOSE ${PORT}

CMD ["./build/server"]