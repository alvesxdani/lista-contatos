# Versão do node
FROM node:20-alpine

# Diretório do container
WORKDIR /app

# Copia os arquivos de configuração do node
COPY package*.json ./

# Instala as dependências
RUN corepack enable
RUN yarn install --frozen-lockfile

# Copiando arquivos para o container
COPY . .

# Expondo a porta do container
EXPOSE 3000

# Inicializar o projeto localmente no container
CMD ["yarn", "dev"]