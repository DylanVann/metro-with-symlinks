const fs = require('fs')

const isSymlink = dependency =>
    fs.lstatSync(`node_modules/${dependency}`).isSymbolicLink()

module.exports = directory => {
    const packageJson = require(`${directory}/package.json`);	
    const dependencies = [	
        ...Object.keys(packageJson.dependencies),	
        ...Object.keys(packageJson.devDependencies),	
    ];
    const relativeInstalls = dependencies
        .filter(name => name.startsWith('file') || name.startsWith('..'))
    const inNodeModules = fs.readdirSync(`${directory}/node_modules`).filter(isSymlink)
    return relativeInstalls.concat(inNodeModules)
}
