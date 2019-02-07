var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //DATABASE_HOST: "127.0.0.1",
  BASE_API: '"https://www.easy-mock.com/mock/5a314446cc5f0f50cf120666"',// Esta es la ruta de los easymocke que estaba antes.14/05/2018
  //BASE_API: '" https://www.easy-mock.com/mock/5a8c2777ceff962779055b19/example"',
  //BASE_API: '"http://127.0.0.1:9966/api"',
  //BASE_API: '"http://172.29.220.232:8007/api"',
})
