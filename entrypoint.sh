#!/bin/bash

export PATH="/node-v20.15.1-linux-x64/bin:/node_modules/.bin:"${PATH}
cd /srv/http
/usr/bin/lighttpd -D -f /etc/lighttpd/lighttpd.conf
