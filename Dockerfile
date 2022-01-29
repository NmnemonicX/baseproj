FROM node
WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY *.js ./
COPY midleware/ ./midleware/
COPY public/ ./public/
COPY models/ ./models/
COPY routes/ ./routes/
COPY views/ ./views/



CMD ["npm", "run", "start"]
