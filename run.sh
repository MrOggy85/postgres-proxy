#!/bin/bash

deno run \
  --allow-net \
  --allow-env=PGAPPNAME,PGDATABASE,PGHOST,PGOPTIONS,PGPASSWORD,PGPORT,PGUSER \
  main.ts
