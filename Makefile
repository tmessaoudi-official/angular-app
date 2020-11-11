#!make

export $(shell touch .env.local.build)
include .env.local.build
export $(shell sed 's/=.*//' .env.local.build)

default: help

help:
	@echo "Usage: make <target>"
load-env:
	pnpm run load-env
build-dev:
	NODE_ENV=dev make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=dev,delete-output-path,ignore-i18n,no-base-href,en-no-base-href" pnpm run build && APP_CONFIGURATION="--configuration=dev,ignore-i18n,localize" pnpm run build
build-production:
	NODE_ENV=production make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=production,delete-output-path,ignore-i18n,no-base-href,en-no-base-href" pnpm run build && APP_CONFIGURATION="--configuration=production,localize" pnpm run build
test-e2e:
	NODE_ENV=test make load-env --ignore-errors --keep-going --warn-undefined-variables
	pnpm run e2e
test:
	NODE_ENV=test make load-env --ignore-errors --keep-going --warn-undefined-variables
	pnpm run test
serve:
	NODE_ENV=dev make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=dev" pnpm run serve
lint:
	pnpm run lint
