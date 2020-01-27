const path = require(`path`)
const glob = require(`glob`)

module.exports = () => {
  let allSectionsString = ``

  const fileArray = glob.sync(`./src/sections/**/*.data.js`)

  fileArray.forEach(function(file) {
    const queryString = require(path.resolve(file))
    allSectionsString = `${allSectionsString} \n ${queryString()}`
  })

  return allSectionsString
}
