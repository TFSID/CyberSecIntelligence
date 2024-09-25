/**
 * @param server
 * @param options
 */
export default function (server, options) {
    server.route({ method: 'GET',  path: '/app/socprime_sigma_ui/main',                  handler: (req,reply) => require('./server/routes/main/update')(server, options).index(req,reply) });
    server.route({ method: 'GET',  path: '/app/socprime_sigma_ui/sigma-doc',             handler: (req,reply) => require('./server/routes/sigma/get-doc')(server, options).index(req,reply) });
    server.route({ method: 'GET',  path: '/app/socprime_sigma_ui/sigma-translation',     handler: (req,reply) => require('./server/routes/sigma/get-translation')(server, options).index(req,reply) });
    server.route({ method: 'POST', path: '/app/socprime_sigma_ui/sigma-add-watcher',     handler: (req,reply) => require('./server/routes/sigma/add-watcher')(server, options).index(req,reply) });
    server.route({ method: 'GET',  path: '/app/socprime_sigma_ui/get-file',              handler: (req,reply) => require('./server/routes/common/get-file')(server, options).index(req,reply) });
    server.route({ method: 'POST', path: '/app/socprime_sigma_ui/get-tdm-api-key',       handler: (req,reply) => require('./server/routes/api/get-tdm-key')(server, options).index(req,reply) });
    server.route({ method: 'POST', path: '/app/socprime_sigma_ui/set-tdm-api-key',       handler: (req,reply) => require('./server/routes/api/set-tdm-key')(server, options).index(req,reply) });
    server.route({ method: 'POST', path: '/app/socprime_sigma_ui/tdm-api-update-sigma',  handler: (req,reply) => require('./server/routes/api/tdm-update-sigma')(server, options).index(req,reply) });
};
