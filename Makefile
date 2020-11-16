#!make

export $(shell NODE_DEBUG_FORCE=false APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true NODE_ENV_FORCE=${NODE_ENV_FORCE} pnpm run load-env-js )
include .app.env/.env.local.build
export $(shell sed 's/=.*//' .app.env/.env.local.build)

default: help

help:
	@echo "Usage: make <target>"
load-env-js:
	pnpm run load-env-js
build-dev:
	NODE_ENV_FORCE=dev APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env-js --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=dev,delete-output-path,ignore-i18n,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_CONFIGURATIOH_HOME_SUFFIX}" pnpm run build && APP_CONFIGURATION="--configuration=dev,ignore-i18n,localize" pnpm run build && APP_CONFIGURATION="--configuration=dev,ignore-i18n,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env" pnpm run build
watch-dev:
	NODE_ENV_FORCE=dev APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env-js --ignore-errors --keep-going --warn-undefined-variables
	concurrently "APP_CONFIGURATION=--configuration=dev,watch,ignore-i18n,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_CONFIGURATIOH_HOME_SUFFIX} pnpm run build" "APP_CONFIGURATION=--configuration=dev,watch,ignore-i18n,localize pnpm run build" "APP_CONFIGURATION=--configuration=dev,watch,ignore-i18n,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env pnpm run build"
build-production:
	NODE_ENV_FORCE=production APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true  make load-env-js --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=production,delete-output-path,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_CONFIGURATIOH_HOME_SUFFIX}" pnpm run build && APP_CONFIGURATION="--configuration=production,localize" pnpm run build && APP_CONFIGURATION="--configuration=production,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env" pnpm run build
build-test:
	NODE_ENV_FORCE=test APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env-js --ignore-errors --keep-going --warn-undefined-variables
	APP_CONFIGURATION="--configuration=dev,delete-output-path,ignore-i18n,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_CONFIGURATIOH_HOME_SUFFIX}" pnpm run build && APP_CONFIGURATION="--configuration=dev,ignore-i18n,localize" pnpm run build && APP_CONFIGURATION="--configuration=dev,ignore-i18n,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env" pnpm run build
serve:
	NODE_ENV_FORCE=dev APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true  make load-env-js --ignore-errors --keep-going --warn-undefined-variables
	pnpm run serve
test:
	NODE_ENV_FORCE=test APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env-js --ignore-errors --keep-going --warn-undefined-variables
	pnpm run test
test-e2e:
	NODE_ENV_FORCE=test APP_ENV_RUN_BUILD=true APP_ENV_FORCE_REBUILD=true make load-env-js --ignore-errors --keep-going --warn-undefined-variables
	NODE_ENV_FORCE=test pnpm run e2e
test-e2e-selenium:
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.test.e2e.selenium" make build-test
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.test.e2e.selenium" NODE_ENV_FORCE=test APP_CONFIGURATION="--configuration=selenium" pnpm run e2e
