const { override, addWebpackResolve } = require('customize-cra');

   module.exports = override(
     addWebpackResolve({
       fallback: {
         url: false, // Отключаем модуль url
       },
     })
   );