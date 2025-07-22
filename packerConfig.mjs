import path from 'path'
import { packer, webpack } from 'lerna-packer'
import {
    copyRootPackageJson,
} from 'lerna-packer/packer/modulePackages.js'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// const babelTargetsEsmCjs = [
//     {
//         distSuffix: '',
//         args: [
//             '--env-name', 'cjs', '--no-comments', // '--copy-files', '--no-copy-ignored',
//             // note: even with defined extension, the extensions of `import` are still `.js`
//             //       which would break relative imports, as they then import ESM instead of the CJS file;
//             //       thus added `babel-plugin-replace-import-extension` for the CJS environment
//             //       it's not validated how it behaves for external imports for third-party modules,
//             //       which can be problematic in other projects,
//             //       here `import` to 3rd party modules are done purely by package name
//             '--out-file-extension', '.cjs',
//             '--extensions', '.ts', '--extensions', '.tsx', '--extensions', '.js', '--extensions', '.jsx',
//             '--ignore', '**/*.d.ts',
//             '--ignore', '**/*.test.tsx', '--ignore', '**/*.test.ts', '--ignore', '**/*.test.js',
//             '--ignore', '**/*.mock.ts', '--ignore', '**/*.mock.js',
//         ],
//     },
//     {
//         distSuffix: '',
//         args: [
//             '--no-comments',
//             '--extensions', '.ts', '--extensions', '.tsx', '--extensions', '.js', '--extensions', '.jsx',
//             '--ignore', '**/*.d.ts',
//             '--ignore', '**/*.test.tsx', '--ignore', '**/*.test.ts', '--ignore', '**/*.test.js',
//             '--ignore', '**/*.mock.ts', '--ignore', '**/*.mock.js',
//         ],
//     },
// ]

const babelTargetsCjsEsm = [
    {
        distSuffix: '',
        args: [
            '--env-name', 'cjs', '--no-comments', // '--copy-files', '--no-copy-ignored',
            '--out-file-extension', '.cjs',
            '--extensions', '.ts', '--extensions', '.tsx', '--extensions', '.js', '--extensions', '.jsx',
            '--ignore', '**/*.d.ts',
            '--ignore', '**/*.test.tsx', '--ignore', '**/*.test.ts', '--ignore', '**/*.test.js',
            '--ignore', '**/*.mock.ts', '--ignore', '**/*.mock.js',
        ],
    },
    {
        distSuffix: '/esm',
        // distSuffix: '', // for mjs it would need a distSuffix
        args: [
            // '--env-name', 'mjs',
            // '--out-file-extension', '.mjs',
            '--no-comments',
            '--extensions', '.ts', '--extensions', '.tsx', '--extensions', '.js', '--extensions', '.jsx',
            '--ignore', '**/*.d.ts',
            '--ignore', '**/*.test.tsx', '--ignore', '**/*.test.ts', '--ignore', '**/*.test.js',
            '--ignore', '**/*.mock.ts', '--ignore', '**/*.mock.js',
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
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                }),
            ],
            aliasPackagesBuild: 'production',
        },
    },
    packages: {
        // the keys are the commonjs names that is applied to externals
        // this is the same as `@babel/plugin-transform-modules-commonjs` applies
        materialColor: {
            name: '@ui-schema/material-color',
            root: path.resolve(__dirname, 'packages', 'material-color'),
            entry: path.resolve(__dirname, 'packages', 'material-color/src/'),
            babelTargets: babelTargetsCjsEsm,
        },
        materialColorful: {
            name: '@ui-schema/material-colorful',
            root: path.resolve(__dirname, 'packages', 'material-colorful'),
            entry: path.resolve(__dirname, 'packages', 'material-colorful/src/'),
            babelTargets: babelTargetsCjsEsm,
        },
    },
}, __dirname, {
    webpackStatsConfig: {
        modulesSpace: 200,
        orphanModules: true,
        exclude: [
            '@babel',
            '@emotion',
        ],
    },
    afterEsModules: (packages, pathBuild, isServing) => {
        if(isServing) return
        return Promise.all([
            copyRootPackageJson(({packageJson}) => {
                packageJson = {...packageJson}
                delete packageJson.type
                return packageJson
            })(packages, pathBuild),
        ]).then(() => undefined).catch((e) => {
            console.error('ERROR after-es-mod', e)
            return Promise.reject(e)
        })
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

