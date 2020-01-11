// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const configOverride = {}

  if(config.env.userAgent === 'mobile') {
    configOverride.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    configOverride.testFiles = '**/**/mobile/*.*'
  } else if (config.env.userAgent === 'desktop') {
    configOverride.userAgent = ''
    configOverride.testFiles = '**/**/desktop/*.*'
  }

  return Object.assign({}, config, configOverride)
}
