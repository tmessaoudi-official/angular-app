#!make

export $(shell APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true pnpm run load-env )
include .env.local.build
export $(shell sed 's/=.*//' .env.local.build)

default: help

help:
	@echo "Usage: make <target>"
load-env:
	pnpm run load-env
pnpm-run:
	pnpm run ${EXEC_TARGET}
build-dev:
	NODE_ENV_FORCE=dev APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=dev,delete-output-path,ignore-i18n,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_CONFIGURATIOH_HOME_SUFFIX}" EXEC_TARGET="build" make pnpm-run && APP_CONFIGURATION="--configuration=dev,ignore-i18n,localize" EXEC_TARGET="build" make pnpm-run && APP_CONFIGURATION="--configuration=dev,ignore-i18n,home-locale,home,home-base-href,home-config,dummy-env" EXEC_TARGET="build" make pnpm-run
build-production:
	NODE_ENV_FORCE=production APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true  make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=production,delete-output-path,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_CONFIGURATIOH_HOME_SUFFIX}" pnpm run build && APP_CONFIGURATION="--configuration=production,localize" EXEC_TARGET="build" make pnpm-run && APP_CONFIGURATION="--configuration=production,home-locale,home,home-base-href,home-config,dummy-env" EXEC_TARGET="build" make pnpm-run
test-e2e:
	NODE_ENV_FORCE=test APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env --ignore-errors --keep-going --warn-undefined-variables
	EXEC_TARGET="e2e" make pnpm-run
test:
	NODE_ENV_FORCE=test APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env --ignore-errors --keep-going --warn-undefined-variables
	EXEC_TARGET="test" make pnpm-run
serve:
	NODE_ENV_FORCE=dev APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true  make load-env --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=home" EXEC_TARGET="serve" make pnpm-run
lint:
	pnpm run lint
