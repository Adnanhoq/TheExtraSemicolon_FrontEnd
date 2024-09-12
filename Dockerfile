FROM node:20.16.0

RUN mkdir -p /code
WORKDIR /code
COPY . /code

ARG API_URL
ENV API_URL=${API_URL}
ENV THEME=${THEME}

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]