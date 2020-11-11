#!make

include .env
export $(shell sed 's/=.*//' .env)
-include .env.local
export $(shell sed 's/=.*//' .env.local)
-include .env.${NODE_ENV}
export $(shell sed 's/=.*//' .env.${NODE_ENV})
-include .env.${NODE_ENV}.local
export $(shell sed 's/=.*//' .env.${NODE_ENV}.local)

default: help

help:
	@echo "Usage: make <target>"
build-dev:
	APP_CONFIGURATION="--configuration=dev,delete-output-path,ignore-i18n,no-base-href,en-no-base-href" pnpm run build && APP_CONFIGURATION="--configuration=dev,ignore-i18n,localize" pnpm run build
build-production:
	APP_CONFIGURATION="--configuration=production,delete-output-path,ignore-i18n,no-base-href,en-no-base-href" pnpm run build && APP_CONFIGURATION="--configuration=production,localize" pnpm run build
