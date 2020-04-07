FROM ubuntu:16.04

ENV MYSQL_PASSWORD 12345678
RUN apt-get update
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PASSWORD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PASSWORD" | debconf-set-selections
RUN apt-get install -y mysql-server
RUN apt-get install -y nano
RUN rm /var/lib/mysql/auto.cnf
RUN service mysql restart
