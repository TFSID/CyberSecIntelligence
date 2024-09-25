import uiRoutes from 'ui/routes';

import viewsMain from './ng/views/main.html';

require('ui/autoload/all');
require('ui/chrome');
import * as d3 from 'd3';
import * as c3 from 'c3';

setTimeout(() => {
    window.d3 = d3;
    window.c3 = c3;
});

window.YAML = require('yamljs');

// Include assets
import './assets/css/reset.css';
import './assets/plugins/bootstrap/bootstrap.min.css';
import './../node_modules/gridstack/dist/gridstack.css';

// DataTables
import './assets/plugins/datatables/dataTables.bootstrap4.min.css';
import './assets/plugins/datatables/buttons.bootstrap4.min.css';
// Responsive datatable
import './assets/plugins/datatables/responsive.bootstrap4.min.css';
import './assets/plugins/font-awesome/css/font-awesome.min.css';
import './assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css';
import './../bower_components/angular-ui-tree/dist/angular-ui-tree.css';
import './assets/plugins/select2/select2.css';
import './assets/plugins/jsoneditor/jsoneditor.css';
import './assets/css/sidebar.css';
import './assets/plugins/c3/c3.css';
import './assets/css/menu-button.css';
import './assets/css/old-style.css';
import './assets/css/style.css';
import './assets/css/style-light.css';

import './assets/js/jquery-2.1.1';
import './assets/plugins/bootstrap/bootstrap.min';

// Required datatable js
import './assets/plugins/datatables/jquery.dataTables.min';
import './assets/plugins/datatables/dataTables.bootstrap4';
import './assets/dataTables.responsive';

import './assets/plugins/select2/select2';
import './assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min';
import './../bower_components/angular-ui-tree/dist/angular-ui-tree';

import './assets/js/main';

import './assets/js/customCharts';

// require Services
require('./ng/services/common/function');
require('./ng/services/common/modal');

// Init Services
require('./ng/services/init/main/page');

// require Directives
require('./ng/directives/sp-top-nav/index');
require('./ng/directives/sp-yaml-editor/index');
require('./ng/directives/sp-visual-editor/index');
require('./ng/directives/sp-select-sigma/index');
require('./ng/directives/sp-edit-api-key/index');
require('./ng/directives/sp-convert-to-siem/index');
require('./ng/directives/sp-footer/index');

// require Constrollers
require('./ng/controllers/main');

uiRoutes.enable();
uiRoutes.when('/', {
    template: viewsMain,
    reloadOnSearch: false
});
uiRoutes.otherwise({
    redirectTo: '/'
});
