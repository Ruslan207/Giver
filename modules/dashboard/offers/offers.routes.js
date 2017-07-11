let routes = ($stateProvider) => {
	$stateProvider
		.state('giver.dashboard.offers', {
			abstract: true,
			url: 'offers',
			// views: {
			// 	'container': {
			// 		// templateUrl: 'modules/dashboard/offers/templates/container.html',
			// 		controller: 'OffersController',
			// 		controllerAs: 'offers'
			// 	}
			// },
			parent: 'giver.dashboard'
		})
		.state('giver.dashboard.offers.list', {
			// abstract: true,
			url: '/list',
			views: {
				'container@giver.dashboard': {
					templateUrl: 'modules/dashboard/offers/templates/container.html',
					controller: 'OffersController',
					controllerAs: 'offers'
				}
			},
			parent: 'giver.dashboard.offers'
		})
};

export {routes};