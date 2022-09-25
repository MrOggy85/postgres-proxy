#!/bin/bash

denon run \
  --allow-net \
  --allow-env=PGAPPNAME,PGDATABASE,PGHOST,PGOPTIONS,PGPASSWORD,PGPORT,PGUSER \
  main.ts
