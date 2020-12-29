let colors = require(`colors`);
let childProcess = require(`child_process`);
const lintStagedConfig = JSON.parse(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`fs`).readFileSync(`./.lintstaged.json`, `utf-8`),
);

colors.enable();

let gitExec = (args) => {
    return (
        childProcess
            // @ts-ignore
            .execFileSync(...args)
            .toString()
            .trim()
    );
};

const lastCommitMessage = gitExec([`git`, [`log`, `-1`]]);
const lastMergeCommitMessage = gitExec([`git`, [`log`, `--merges`, `-n`, `1`]]);

module.exports = {
    '**/*.*': (files) => {
        if (files.length > 0 && lintStagedConfig.files.threshold !== `*`) {
            if (
                files.length > lintStagedConfig.files.threshold &&
                lastCommitMessage !== lastMergeCommitMessage
            ) {
                console.error(
                    `To make everybodies life easier :), you are not authorized to commit more than 3 files.`
                        .bgRed.white,
                );
                console.error(
                    `Try to separate them into multiple commits with clear messages describing what you did.`
                        .bgRed.white,
                );
                console.error(`Thank you :) and Happy Coding :).`.bgRed.white);
                process.exit(1);
            }
        }
        let cmd = [];
        if (lintStagedConfig.format[0]) {
            const format = files.filter((file) => {
                let concerned = false;
                lintStagedConfig.format[1].forEach((extension) => {
                    const regex = new RegExp(`^.*\\.${extension}$`);
                    if (!concerned) {
                        concerned = regex.test(file);
                    }
                });
                return concerned;
            });
            if (format.length > 0) {
                cmd.push(
                    `prettier --write ${format.join(` `)} --ignore-unknown`,
                );
            }
        }
        return cmd;
    },
    '**/*.js': (files) => {
        return `ng fix --files ${files.join(` `)}`;
    },
    '**/*.ts': (files) => {
        return `ng fix --files ${files.join(` `)}`;
    },
    '**/*.css': (files) => {
        return `ng fix --files ${files.join(` `)}`;
    },
    '**/*.scss': (files) => {
        return `ng fix --files ${files.join(` `)}`;
    },
};
