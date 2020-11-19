const { pnpm } = JSON.parse(
	require(`fs`).readFileSync(`./package.json`, `utf-8`)
);

if (pnpm && pnpm.replacements) {
	module.exports = {};
	module.exports = {
		hooks: {
			readPackage
		}
	};

	function readPackage(pkg, context) {
		if (pkg.dependencies) {
			for (const k in pnpm.replacements) {
				if (
					pkg.dependencies[k] &&
					pkg.dependencies[k] !== pnpm.replacements[k]
				) {
					const splitted = pnpm.replacements[k].split(`!!`);
					context.log(
						`"${k}@${pkg.dependencies[k]}" replaced in "${pkg.name}" to "${splitted[0]}@${splitted[1]}"`
					);
					delete pkg.dependencies[k];
					pkg.dependencies[splitted[0]] = splitted[1];
				}
			}
		}

		return pkg;
	}
} else {
	/*// console.log('no resolutions !!');*/
	module.exports = {};
}

// @fortawesome/fontawesome-free prerelease 5.12.0-2
// @typescript-eslint/eslint-plugin alpha !!
