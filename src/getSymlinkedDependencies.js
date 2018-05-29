const fs = require('fs')

const isSymlink = dependency =>
    fs.lstatSync(`node_modules/${dependency}`).isSymbolicLink()

module.exports = directory => {
    const packageJson = require(`${directory}/package.json`);	
    const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
    };
    
    const relativeInstalls = Object.entries(dependencies)
        .filter(dep => dep[1].startsWith('file') || dep[1].startsWith('..'))
        .map(dep => dep[0])
    const inNodeModules = fs.readdirSync(`${directory}/node_modules`).filter(isSymlink)
    return relativeInstalls.concat(inNodeModules)
}
