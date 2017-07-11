let routes = ($stateProvider) => {
	$stateProvider
		.state('giver.dashboard', {
			abstract: true,
			// url: 'dashboard',
			views: {
				'container@': {
					templateUrl: 'modules/dashboard/templates/container.html',
					controller: 'DashboardController',
					controllerAs: 'dashboard'
				}
			},
			parent: 'giver'
		});
};

export {routes};