let routes = ($stateProvider) => {
	$stateProvider
		.state('giver.auth', {
			url: '',
			parent: 'giver',
			abstract: true,
			views: {
				'container@': {
					templateUrl: 'modules/login/templates/container.html'
				},
			},
		})
		.state('giver.login', {
			url: 'login',
			parent: 'giver.auth',
			views: {
				'form@giver.auth': {
					templateUrl: 'modules/login/templates/login.html',
					controller: 'LoginController',
					controllerAs: 'login'
				},
			}
		})
		.state('giver.restore', {
			url: 'restore',
			parent: 'giver.auth',
			views: {
				'form@giver.auth': {
					templateUrl: 'modules/login/templates/restore.html',
					controller: 'LoginController',
					controllerAs: 'login'
				},
			}
		});
};

export {routes};