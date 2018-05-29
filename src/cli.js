// Check for symlinks in node_modules
// If found generate and use metro config.
//
// Sources:
//     - https://github.com/facebook/metro/issues/1#issuecomment-346502388
//     - https://github.com/facebook/metro/issues/1#issuecomment-334546083

const fs = require('fs')
const exec = require('child_process').execSync
const dedent = require('dedent-js')
const getSymlinkedDependencies = require('./getSymlinkedDependencies')
const getMetroConfig = require('./getMetroConfig')
const getDependencyPath = require('./getDependencyPath')

const mapDep = dep => `    - ${dep} -> ${getDependencyPath(dep)}`

module.exports = (cwd) => {
    const symlinkedDependencies = getSymlinkedDependencies(cwd)
    const packagesString = symlinkedDependencies.map(mapDep).join('\n')

    const config = getMetroConfig(symlinkedDependencies)
    fs.writeFileSync('rn-cli.config.js', config)

    console.log(dedent`
        wrote rn-cli.config.js - https://github.com/MrLoh/metro-with-symlinks

        Detected symlinked packages:
        ${packagesString}
    `)
    process.exit()
}
