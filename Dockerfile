FROM node:12-slim
WORKDIR /netclick
# RUN apk --no-cache add python
COPY . .
RUN npm install 
CMD ["npm", "run", "start"]
