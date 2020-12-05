const ICONS_DIR = 'build/icons/'

const windowsOS = {
  win: {
    icon: ICONS_DIR + 'win-icon.ico',
    publisherName: 'MeatReed',
    target: 'nsis'
  },

  nsis: {
    differentialPackage: true,
    uninstallDisplayName: 'gedesktop',
    oneClick: false,
    perMachine: true,
    allowElevation: true,
    allowToChangeInstallationDirectory: true
  }
}

const linuxOS = {
  linux: {
    icon: ICONS_DIR,
    target: 'deb'
  }
}

module.exports = {
  compression: 'maximum',
  productName: 'Ghost eShop Desktop',
  appId: 'com.meatreed.gedesktop',
  artifactName: 'gedesktop.${ext}',
  directories: {
    output: 'build'
  },
  // default files: https://www.electron.build/configuration/contents
  files: [
    "build/**/*",
    "main.js"
  ],
  ...windowsOS,
  ...linuxOS
}
