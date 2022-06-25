const path = require('path');
const {packer, webpack} = require('lerna-packer');
const {makeModulePackageJson, copyRootPackageJson, transformForEsModule} = require('lerna-packer/packer/modulePackages');

// todo: once no `.d.ts` are used, remove the `copy-files` again / use lerna-packer default again
const legacyBabelTargets = [
    {
        distSuffix: '',
        args: [
            '--env-name', 'cjs', '--no-comments', '--copy-files',
            '--extensions', '.ts', '--extensions', '.tsx', '--extensions', '.js', '--extensions', '.jsx',
            '--ignore', '**/*.d.ts',
            '--ignore', '**/*.test.tsx', '--ignore', '**/*.test.ts', '--ignore', '**/*.test.js',
        ],
    },
    {
        distSuffix: '/esm', args: [
            '--no-comments',
            '--extensions', '.ts', '--extensions', '.tsx', '--extensions', '.js', '--extensions', '.jsx',
            '--ignore', '**/*.d.ts',
            '--ignore', '**/*.test.tsx', '--ignore', '**/*.test.ts', '--ignore', '**/*.test.js',
        ],
    },
]

packer({
    apps: {
        demo: {
            root: path.resolve(__dirname, 'packages', 'demo'),
            template: path.resolve(__dirname, 'packages', 'demo/public/index.html'),
            contentBase: path.resolve(__dirname, 'packages', 'demo/public'),// dev-server
            port: 4204,
            main: path.resolve(__dirname, 'packages', 'demo/src/index.tsx'),
            dist: path.resolve(__dirname, 'dist', 'demo'),
            devServer: {
                client: {
                    overlay: false,
                    progress: false,
                },
            },
            publicPath: '/',
        },
    },
    packages: {
        // the keys are the commonjs names that is applied to externals
        // this is the same as `@babel/plugin-transform-modules-commonjs` applies
        materialColor: {
            name: '@ui-schema/material-color',
            root: path.resolve(__dirname, 'packages', 'material-color'),
            entry: path.resolve(__dirname, 'packages', 'material-color/src/'),
            babelTargets: legacyBabelTargets,
        },
        materialColorful: {
            name: '@ui-schema/material-colorful',
            root: path.resolve(__dirname, 'packages', 'material-colorful'),
            entry: path.resolve(__dirname, 'packages', 'material-colorful/src/'),
        },
    },
}, __dirname, {
    afterEsModules: (packages, pathBuild) => {
        return Promise.all([
            makeModulePackageJson(transformForEsModule)(packages, pathBuild),
            copyRootPackageJson()(packages, pathBuild),
        ])
    },
})
    .then(([execs, elapsed]) => {
        if(execs.indexOf('doServe') !== -1) {
            console.log('[packer] is now serving (after ' + elapsed + 'ms)')
        } else {
            console.log('[packer] finished successfully (after ' + elapsed + 'ms)', execs)
            process.exit(0)
        }
    })
    .catch((e) => {
        console.error('[packer] finished with error(s)', e)
        process.exit(1)
    })

