let routes = ($stateProvider) => {
    $stateProvider
        .state('giver.dashboard.statistics.details', {
            // abstract: true,
            url: '/offer/:id',
            views: {
                'container@giver.dashboard': {
                    templateUrl: 'modules/dashboard/statistics/details/templates/container.html',
                    controller: 'DetailsController',
                    controllerAs: 'stats'
                }
            },
            parent: 'giver.dashboard.statistics'
        })
};

export {routes};