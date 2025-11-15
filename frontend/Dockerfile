FROM node:20-slim

WORKDIR /app

# Install required OS dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libc6 \
    libstdc++6 \
    wget \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Force reinstall correct LightningCSS binary
RUN npm install lightningcss --force

# Install rest of dependencies
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
