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
		content: { tmp: [] },
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
			envConfigPath = `./.app.env/.env.configuration`,
			// eslint-disable-next-line no-unused-vars
			putInProcessEnv = true
		) {
			if (typeof envConfigPath !== `string` || envConfigPath === ``) {
				envConfigPath = `./.app.env/.env.configuration`;
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

			delete this.config.tmp;
			this.load(
				{
					current: this.config.APP_ENV_CONFIG_DIST_FILE_PATH
				},
				this.config.APP_ENV_CONFIG_ENCODING
			);
			delete this.content.tmp;

			console.log(this.content);

			return `running !!`;
		},
		load: function (filePath, encoding = `utf8`, isConfig = false) {
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
						this.content[matches.groups.key] = matches.groups.value;
					} else {
						this.content.tmp.push({
							content: line,
							line: index + 1
						});
					}
				}, this);
			if (isConfig) {
				Object.keys(this.content).forEach(function (item) {
					if (item !== `tmp`) {
						this.config[item] = this.content[item];
					}
				}, this);
			}
			this.treatGarbage(filePath, encoding, debug, isConfig);
			this.content.tmp = [];
		},
		treatGarbage: function (filePath, encoding, debug, isConfig) {
			const tmp = this.content.tmp;
			this.content.tmp = [];
			if (tmp.length > 0) {
				tmp.forEach(function (item) {
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
											`\${app.env::NODE_ENV}`,
											this.config.NODE_ENV
										)
										.replace(
											`\${app.env::APP_ENV}`,
											this.content.APP_ENV
										)
										.replace(
											`\${process.env::${this.config.APP_ENV_CONFIG_NODE_ENV_INCLUDE}}`,
											process.env[
												this.config
													.APP_ENV_CONFIG_NODE_ENV_INCLUDE
											]
										)
										.replace(
											`\${process.env::${this.config.APP_ENV_CONFIG_PROCESS_FILE_INCLUDES_KEY}}`,
											process.env[
												this.config
													.APP_ENV_CONFIG_PROCESS_FILE_INCLUDES_KEY
											]
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
										).forEach(function (item) {
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
												this.load(
													{
														current: item,
														from: filePath.current
													},
													encoding,
													isConfig
												);
											}
										}, this);
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
											this.load(
												{
													current: item,
													from: filePath.current
												},
												encoding,
												isConfig
											);
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
		},
		populate: function (x) {
			console.log(`populating !! '${x}'`);

			return x;
		}
	});
};
