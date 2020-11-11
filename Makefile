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
	make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=dev,delete-output-path,ignore-i18n,no-base-href,en-no-base-href" pnpm run build && APP_CONFIGURATION="--configuration=dev,ignore-i18n,localize" pnpm run build
build-production:
	make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=production,delete-output-path,ignore-i18n,no-base-href,en-no-base-href" pnpm run build && APP_CONFIGURATION="--configuration=production,localize" pnpm run build
