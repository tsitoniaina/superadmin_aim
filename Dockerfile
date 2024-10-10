FROM archlinux:latest

# Install dependencies
RUN pacman -Sy --noconfirm wget lighttpd rsync   

WORKDIR /

ENV NODE_VERSION=20.17.0
# Use the ARG for the Node version to download and install Node
RUN wget --quiet https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz \
    && tar xf node-v${NODE_VERSION}-linux-x64.tar.xz \
    && rm node-v${NODE_VERSION}-linux-x64.tar.xz

ENV PATH="/node-v${NODE_VERSION}-linux-x64/bin:${PATH}"
RUN npm install typescript ts-node --save --global
ENV PATH="/node_modules/.bin:${PATH}"

ADD ./code /code/
COPY ./lighttpd.conf /etc/lighttpd/lighttpd.conf
# COPY ./lighttpd-plain.user /etc/lighttpd/lighttpd-plain.user

WORKDIR /code
RUN find .
RUN npm install -f 
RUN npm run build
RUN rsync -av /code/dist/ /srv/http/
RUN chown -Rv http:http /srv/http
ADD ./entrypoint.sh /entrypoint.sh
RUN chmod 755  /entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
