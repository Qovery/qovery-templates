FROM ubuntu:bionic as BUILD

RUN \
  groupadd jhipster && \
  useradd jhipster -s /bin/bash -m -g jhipster -G sudo && \
  echo 'jhipster:jhipster' |chpasswd && \
  mkdir /home/jhipster/app && \
  apt-get update && \
  # install utilities
  apt-get install -y \
    wget \
    curl \
    zip \
    bzip2 \
    python \
    g++ \
    libpng-dev \
    build-essential \
    software-properties-common \
    sudo && \
  # install tzdata
  export DEBIAN_FRONTEND=noninteractive && \
  apt-get install -y tzdata && \
  # install OpenJDK 11
  add-apt-repository ppa:openjdk-r/ppa && \
  apt-get update && \
  apt-get install -y openjdk-11-jdk && \
  update-java-alternatives -s java-1.11.0-openjdk-amd64 && \
  # install node.js
  wget https://nodejs.org/dist/v12.16.1/node-v12.16.1-linux-x64.tar.gz -O /tmp/node.tar.gz && \
  tar -C /usr/local --strip-components 1 -xzf /tmp/node.tar.gz && \
  # upgrade npm
  npm install -g npm && \
  # install yarn
  npm install -g yarn && \
  # install yeoman
  npm install -g yo && \
  npm install -g rimraf && \
  # cleanup
  apt-get clean && \
  rm -rf \
    /home/jhipster/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# copy sources
COPY . /home/jhipster/generator-jhipster/

RUN \
  # clean jhipster folder
  rm -Rf /home/jhipster/generator-jhipster/node_modules \
    /home/jhipster/generator-jhipster/yarn.lock \
    /home/jhipster/generator-jhipster/yarn-error.log && \
  # install jhipster
  npm install -g /home/jhipster/generator-jhipster && \
  # fix jhipster user permissions
  chown -R jhipster:jhipster \
    /home/jhipster \
    /usr/local/lib/node_modules && \
  # cleanup
  rm -rf \
    /home/jhipster/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# build executable jar
WORKDIR /home/jhipster/generator-jhipster
RUN chmod 777 gradlew
RUN npm install
RUN ./gradlew build

FROM openjdk:11-jre-slim-stretch

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    JHIPSTER_SLEEP=0 \
    JAVA_OPTS=""

RUN adduser --home /home/jhipster --disabled-password jhipster

WORKDIR /home/jhipster

ADD src/main/jib/entrypoint.sh entrypoint.sh
RUN chmod 755 entrypoint.sh && chown jhipster:jhipster entrypoint.sh
USER jhipster

COPY --from=BUILD /home/jhipster/generator-jhipster/build/libs/jhipster-postgresql-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]
