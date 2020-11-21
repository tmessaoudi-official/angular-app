#!make

export $(shell NODE_DEBUG_FORCE=false APP_ENV_RUN_BUILD=true APP_NODE_ENV_INCLUDE=${APP_NODE_ENV_INCLUDE} pnpm run load-env-js )
include .app.env/.env.local.build
export $(shell sed 's/=.*//' ./.app.env/.env.local.build)

default: help

help:
	@echo "Usage: make <target>"
load-env-js:
	pnpm run load-env-js
build-development:
	APP_NODE_ENV_INCLUDE=development APP_CONFIGURATION="--configuration=development,delete-output-path,ignore-i18n,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_LAUNCH_CONFIGURATIOH_HOME_SUFFIX}" pnpm run build && APP_NODE_ENV_INCLUDE=development APP_CONFIGURATION="--configuration=development,ignore-i18n,localize" pnpm run build && APP_NODE_ENV_INCLUDE=development APP_CONFIGURATION="--configuration=development,ignore-i18n,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env" pnpm run build
watch-development:
	APP_NODE_ENV_INCLUDE=development concurrently "APP_NODE_ENV_INCLUDE=development APP_CONFIGURATION=--configuration=development,watch,ignore-i18n,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_LAUNCH_CONFIGURATIOH_HOME_SUFFIX} pnpm run build" "APP_NODE_ENV_INCLUDE=development APP_CONFIGURATION=--configuration=development,watch,ignore-i18n,localize pnpm run build" "APP_NODE_ENV_INCLUDE=development APP_CONFIGURATION=--configuration=development,watch,ignore-i18n,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env pnpm run build"
build-production:
	APP_NODE_ENV_INCLUDE=production APP_CONFIGURATION="--configuration=production,delete-output-path,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_LAUNCH_CONFIGURATIOH_HOME_SUFFIX}" pnpm run build && APP_NODE_ENV_INCLUDE=production APP_CONFIGURATION="--configuration=production,localize" pnpm run build && APP_NODE_ENV_INCLUDE=production APP_CONFIGURATION="--configuration=production,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env" pnpm run build
build-test:
	APP_NODE_ENV_INCLUDE=test APP_CONFIGURATION="--configuration=development,delete-output-path,ignore-i18n,no-base-href,${APP_I18N_LOCALE_DEFAULT}-locale,${APP_I18N_LOCALE_DEFAULT}${APP_LAUNCH_CONFIGURATIOH_HOME_SUFFIX}" pnpm run build && APP_NODE_ENV_INCLUDE=test APP_CONFIGURATION="--configuration=development,ignore-i18n,localize" pnpm run build && APP_NODE_ENV_INCLUDE=test APP_CONFIGURATION="--configuration=development,ignore-i18n,home-locale-${APP_I18N_LOCALE_DEFAULT},home,home-base-href,home-config,dummy-env" pnpm run build
serve:
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.i18n.serve" APP_NODE_ENV_INCLUDE=development APP_CONFIGURATION="--configuration=disable-host-check" pnpm run serve
test-unit:
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.i18n.serve,./.app.env/.env.test.unit" APP_NODE_ENV_INCLUDE=test pnpm run test
test-unit-selenium:
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.i18n.serve,./.app.env/.env.test.unit.selenium" APP_NODE_ENV_INCLUDE=test pnpm run test
test-e2e:
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.i18n.serve,./.app.env/.env.test.e2e" APP_NODE_ENV_INCLUDE=test APP_NODE_ENV_INCLUDE=test pnpm run e2e
test-e2e-selenium-build:
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.test.e2e.selenium.build" APP_NODE_ENV_INCLUDE=test make build-test
	APP_PROCESS_ENV_INCLUDES="./.app.env/.env.test.e2e.selenium.build" APP_NODE_ENV_INCLUDE=test APP_CONFIGURATION="--configuration=selenium-build" pnpm run e2e
