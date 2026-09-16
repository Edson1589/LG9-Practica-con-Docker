# Imagen sobre la que se construira el contenedor
FROM node:24-alpine

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm ci --omit=dev

# Copiar el resto de los archivos del proyecto (Codigo fuente)
COPY . .

# Le avisa a Docker (y a otros desarrolladores) que la aplicacion dentro del contenedor va a escuchar en el puerto 3000
EXPOSE 3000

# Define el comando por defecto que se ejecutara automaticamente cuando el contenedor se encienda
CMD ["npm", "start"]