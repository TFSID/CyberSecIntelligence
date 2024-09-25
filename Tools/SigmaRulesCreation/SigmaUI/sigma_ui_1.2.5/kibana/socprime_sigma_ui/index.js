export default function (kibana) {
    return new kibana.Plugin({
        require: ['kibana', 'elasticsearch'],
        name: 'socprime_sigma_ui',
        id: 'socprime_sigma_ui',
        uiExports: {
            app: {
                title: 'SIGMA UI',
                description: 'Socprime SIGMA UI',
                icon: 'plugins/socprime_sigma_ui/assets/img/sigma-icon.svg',
                main: 'plugins/socprime_sigma_ui/app'
            }
        },
        init: require('./init.js')
    });
}
