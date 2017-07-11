let routes = ($stateProvider) => {
    $stateProvider
        .state('giver.dashboard.statistics', {
            abstract: true,
            url: 'stats',
            // views: {
            // 	'container': {
            // 		// templateUrl: 'modules/dashboard/offers/templates/container.html',
            // 		controller: 'OffersController',
            // 		controllerAs: 'offers'
            // 	}
            // },
            parent: 'giver.dashboard'
        })
        .state('giver.dashboard.statistics.list', {
            // abstract: true,
            url: '/list',
            views: {
                'container@giver.dashboard': {
                    templateUrl: 'modules/dashboard/statistics/templates/container.html',
                    controller: 'StatisticsController',
                    controllerAs: 'statistics'
                }
            },
            parent: 'giver.dashboard.statistics'
        })
};

export {routes};