const path = require('path');
const {packer} = require('lerna-packer');
const {babelTargetsLegacyCjsFirst} = require('lerna-packer/packer/babelEsModules');
const {makeModulePackageJson, copyRootPackageJson, transformerForLegacyCjsFirst} = require('lerna-packer/packer/modulePackages');

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
            babelTargets: babelTargetsLegacyCjsFirst,
        },
        materialColorful: {
            name: '@ui-schema/material-colorful',
            root: path.resolve(__dirname, 'packages', 'material-colorful'),
            entry: path.resolve(__dirname, 'packages', 'material-colorful/src/'),
            babelTargets: babelTargetsLegacyCjsFirst,
        },
    },
}, __dirname, {
    afterEsModules: (packages, pathBuild) => {
        return Promise.all([
            makeModulePackageJson(transformerForLegacyCjsFirst)(packages, pathBuild),
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

