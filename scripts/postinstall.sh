#!/usr/bin/env bash

install_globals() {
  npm install -g jspm
  npm install -g jspm-bower-endpoint
  npm install -g gulp
}

configure_jspm_auth() {
  jspm config registries.github.auth $GITHUB_AUTH_TOKEN
}

install_others() {
  jspm registry create bower jspm-bower-endpoint -y
  jspm install -y
  cat > .tsdrc << EOF
{
    "token": "$GITHUB_AUTH_TOKEN"
}
EOF
  tsd install
}

if [ -z "$CI" ]; then
  echo "Installing localy"
  install_others
else
  echo "Installing cloud/ci"
  install_globals
  configure_jspm_auth
  install_others
fi

