FROM ubuntu:latest

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
  apt-get install -y --no-install-recommends tzdata g++ curl libpcre3-dev

RUN apt install -y --no-install-recommends libcairo2-dev pkg-config 

# install java
RUN apt-get install -y openjdk-8-jdk
ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"

# install python
RUN apt-get install -y python3-pip python3-dev

RUN cd /usr/local/bin && \
  ln -s /usr/bin/python3 python && \
  ln -s /usr/bin/pip3 pip && \
  pip install --upgrade pip

# apt clean
RUN apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# copy resources
ADD . /www
WORKDIR /www

# install python package
RUN pip install -r requirements-prod.txt
# install server
RUN pip install uwsgi

EXPOSE 5000

CMD ["uwsgi", "--ini", "uwsgi.ini"]
