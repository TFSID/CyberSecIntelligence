let $cf = require('./../../../../server/common/function');

require('ui/modules').get('app/socprime_sigma_ui', [])
    .service('spCF', [function () {
        return $cf;
    }]);
