exports.default = function (source = null) {
	const init = function (source = null) {
		if (typeof source !== `string` || source === ``) {
			source = `process`;
		}
		return require(`./dot-env-loader.dotenv`).default(source);
	};

	return Object.assign(init(source), {
		fs: null,
		config: { tmp: [], files: {} },
		validateFs: function (fs) {
			if (
				!fs ||
				!fs.readFileSync ||
				typeof fs.readFileSync !== `function`
			) {
				throw new Error(
					`Unknown fs provided !! can't find function readFileSync :(`
				);
			}
		},
		setFs: function (fs) {
			this.validateFs(fs);
			this.fs = fs;

			return this;
		},
		getFs: function () {
			this.validateFs(this.fs);

			return this.fs;
		},
		fileExists: function (filePath, error) {
			if (!this.getFs().existsSync(filePath)) {
				if (error.error === true) {
					throw new Error(error.message);
				}

				if (this.config && this.config.NODE_DEBUG === `true`) {
					console.warn(error.message);
				}
				return false;
			}
			return true;
		},
		run: function (
			env = ``,
			encoding = `utf8`,
			envConfigPath = `./.app.env/.config`,
			putInProcessEnv = false
		) {
			if (typeof envConfigPath !== `string` || envConfigPath === ``) {
				envConfigPath = `./.app.env/.config`;
			}
			if (typeof encoding !== `string` || encoding === ``) {
				encoding = `utf8`;
			}
			if (typeof env !== `string` || env === ``) {
				env = null;
			}
			this.fileExists(envConfigPath, {
				message: `envConfigFile '${envConfigPath}' not found !!`,
				error: true
			});

			this.load({ current: envConfigPath }, encoding, true);

			const content = this.load(
				{
					current: this.config.APP_ENV_CONFIG_DIST_FILE_PATH
				},
				this.config.APP_ENV_CONFIG_ENCODING
			);

			console.log(this.config);
			console.log(content);

			return `running !!`;
		},
		load(filePath, encoding = `utf8`, isConfig = false) {
			if (typeof isConfig !== `boolean`) {
				isConfig = false;
			}
			if (this.config && this.config.APP_ENV_CONFIG_ENCODING) {
				encoding = this.config.APP_ENV_CONFIG_ENCODING;
			}
			const debug =
				this.config && typeof this.config.NODE_DEBUG !== `undefined`
					? this.config.NODE_DEBUG === `true`
					: isConfig;
			if (debug) {
				console.log(
					`${
						!filePath.from ? `**root**` : `        `
					}--- Starting import of '${
						filePath.current +
						`'${!filePath.from ? `` : ` !! from ${filePath.from}`}`
					} as ${
						isConfig ? `Config` : `Env`
					} file with encoding '${encoding}'`
				);
			}
			let content = { tmp: [] };
			this.getFs()
				.readFileSync(filePath.current, {
					encoding: encoding
				})
				.split(/\r?\n/)
				.forEach(function (line, index) {
					const regex = new RegExp(
						`^(?<key>[A-Z][A-Z0-9${
							!this.config ||
							!this.config.APP_ENV_CONFIG_VAR_WORD_SEPARATOR
								? `_`
								: this.config.APP_ENV_CONFIG_VAR_WORD_SEPARATOR
						}]*)\=(?<value>.*)$`,
						`g`
					);
					const matches = regex.exec(line);
					if (matches && matches.groups) {
						content[matches.groups.key] = matches.groups.value;
					} else {
						content[`tmp`].push({
							content: line,
							line: index + 1
						});
					}
				}, this);
			if (isConfig) {
				Object.keys(content).forEach(function (item) {
					this.config[item] = content[item];
				}, this);
			}
			content = this.include(
				filePath,
				content,
				encoding,
				debug,
				isConfig
			);
			content[`tmp`] = [];
			return content;
		},
		include: function (filePath, content, encoding, debug, isConfig) {
			if (content[`tmp`].length > 0) {
				content[`tmp`].forEach(function (item) {
					if (item.content.startsWith(`#`) || item.content === ``) {
						if (debug) {
							console.warn(
								// eslint-disable-next-line max-len
								`           -- DotEnv : ignoring line (empty|comment) '${
									item.line
								}' ** '${item.content}' in file '${
									filePath.current
								}' ${
									!filePath.from
										? ``
										: ` !! included by ${filePath.from}`
								}`
							);
						}
					} else {
						if (
							item.content.startsWith(
								this.config.APP_ENV_CONFIG_FILE_INCLUDES_KEY
							)
						) {
							item.content
								.replace(
									this.config
										.APP_ENV_CONFIG_FILE_INCLUDES_KEY + `=`,
									``
								)
								.split(
									this.config
										.APP_ENV_CONFIG_INCLUDES_SEPARATOR
								)
								.forEach(function (item) {
									if (debug) {
										console.log(
											`     --- Including '${item}' as ${
												isConfig ? `Config` : `Env`
											} file with encoding '${encoding}' by '${
												filePath.current
											}'`
										);
									}
									item = item
										.replace(
											`\$\{NODE_ENV\}`,
											this.config.NODE_ENV
										)
										.replace(
											`\$\{NODE_ENV_FORCE\}`,
											process.env.NODE_ENV_FORCE
										)
										.replace(
											`\$\{\~APP_PROCESS_ENV_INCLUDES\}`,
											process.env.APP_PROCESS_ENV_INCLUDES
										);
									if (
										item.includes(
											this.config
												.APP_ENV_CONFIG_INCLUDES_SEPARATOR
										)
									) {
                    item.split(
                        this.config
                          .APP_ENV_CONFIG_INCLUDES_SEPARATOR
                      )
									} else {
										if (
											this.fileExists(item, {
												message: `${
													!filePath.from
														? ``
														: `      `
												} -- File ${item} ${
													!filePath.from
														? ``
														: ` !! included by ${filePath.from}`
												} does not exists !!`
											})
										) {
											const includedContent = this.load(
												{
													current: item,
													from: filePath.current
												},
												encoding,
												isConfig
											);
											Object.keys(
												includedContent
											).forEach(function (item) {
												content[item] =
													includedContent[item];
												if (isConfig) {
													this.config[item] =
														content[item];
												}
											}, this);
										}
									}
								}, this);
						} else {
							if (debug) {
								console.warn(
									`           //// Unformatted line '${item.line}' !! : '${item.content}' in file '${filePath.current}'`
								);
							}
						}
					}
				}, this);
			}
			return content;
		},
		populate(x) {
			console.log(`populating !! '${x}'`);

			return x;
		}
	});
};
