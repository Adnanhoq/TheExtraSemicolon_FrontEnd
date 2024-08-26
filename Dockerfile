FROM node:20.16.0

RUN mkdir -p /code
WORKDIR /code
COPY . /code

RUN npm install
RUN npm run build

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm". "start"]