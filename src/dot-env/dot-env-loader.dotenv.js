exports.default = function (source = null) {
	const init = function (source = null) {
		if (typeof source !== `string` || source === ``) {
			source = `app`;
		}
		if (
			source !== `process` &&
			source !== `app` &&
			source !== `dummyProcess`
		) {
			throw new Error(
				` - DotEnvLoader : Unknown execution source '${source}' provided`
			);
		}
		return source;
	};
	return {
		source: init(source),
		// eslint-disable-next-line no-unused-vars
		process: function (x, from) {
			console.log(
				`'${x}' !! process DotEnvLoader , source : '${this.source}'`
			);

			return x;
		}
	};
};
