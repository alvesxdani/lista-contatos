# Usa uma imagem base oficial com o Node.js.
# Escolha a versão que sua aplicação precisa.
FROM node:20-alpine

# Define o diretório de trabalho dentro do container.
WORKDIR /app

# Copia os arquivos de configuração do Node.js.
# Isso aproveita o cache do Docker, já que esses arquivos raramente mudam.
COPY package*.json ./

# Instala as dependências.
# A flag '--silent' ajuda a reduzir a poluição do log.
# Habilita o Corepack para gerenciar o Yarn. Não é mais necessário instalar o Yarn globalmente.
RUN corepack enable
RUN yarn install --frozen-lockfile

# Copia todo o resto dos arquivos da sua aplicação para o container.
COPY . .

# Expõe a porta que o seu servidor de desenvolvimento vai usar.
# Altere 3000 para a porta que sua aplicação front-end utiliza (ex: 8080).
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento.
# Substitua 'npm start' pelo comando que sua aplicação usa para rodar em modo dev.
CMD ["yarn", "dev"]