#!/bin/bash
set -o errexit

function cmn_echo_info {
  local green=$(tput setaf 2)
  local reset=$(tput sgr0)
  echo -e "${green}$@${reset}"
}

cmn_echo_info "deno cache..."
deno cache -r ./src/deps.ts

cmn_echo_info "deno lint..."
deno lint ./src

cmn_echo_info "deno fmt..."
deno fmt --check ./src

cmn_echo_info "deno check..."
deno check ./src/main.ts
