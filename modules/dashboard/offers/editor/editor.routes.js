let routes = ($stateProvider) => {
	$stateProvider
		.state('giver.dashboard.offers.edit', {
			abstract: true,
			url: '/editor',
			views: {
				'container@giver.dashboard': {
					templateUrl: 'modules/dashboard/offers/editor/templates/container.html',
					controller: 'EditorController',
					controllerAs: 'editor'
				}
			},
			parent: 'giver.dashboard.offers'
		})
		.state('giver.dashboard.offers.edit.step1', {
			// abstract: true,
			url: '/step1',
			views: {
				'container': {
					templateUrl: 'modules/dashboard/offers/editor/templates/step1.html',
					controller: 'EditorControllerStep1',
					controllerAs: 'step1'
				}
			},
			parent: 'giver.dashboard.offers.edit'
		})
		.state('giver.dashboard.offers.edit.step2', {
			// abstract: true,
			url: '/step2',
			views: {
				'container': {
					templateUrl: 'modules/dashboard/offers/editor/templates/step2.html',
					controller: 'EditorControllerStep2',
					controllerAs: 'step2'
				}
			},
			parent: 'giver.dashboard.offers.edit'
		})
		.state('giver.dashboard.offers.edit.step3', {
			// abstract: true,
			url: '/step3',
			views: {
				'container': {
					templateUrl: 'modules/dashboard/offers/editor/templates/step3.html',
					controller: 'EditorControllerStep3',
					controllerAs: 'step3'
				}
			},
			parent: 'giver.dashboard.offers.edit'
		})
		.state('giver.dashboard.offers.edit.step4', {
			// abstract: true,
			url: '/step4',
			views: {
				'container': {
					templateUrl: 'modules/dashboard/offers/editor/templates/step4.html',
					controller: 'EditorControllerStep4',
					controllerAs: 'step4'
				}
			},
			parent: 'giver.dashboard.offers.edit'
		})
		.state('giver.dashboard.offers.edit.step5', {
			// abstract: true,
			url: '/step5',
			views: {
				'container': {
					templateUrl: 'modules/dashboard/offers/editor/templates/step5.html',
					controller: 'EditorControllerStep5',
					controllerAs: 'step5'
				}
			},
			parent: 'giver.dashboard.offers.edit'
		})
		.state('giver.dashboard.offers.edit.step6', {
			// abstract: true,
			url: '/step6',
			views: {
				'container': {
					templateUrl: 'modules/dashboard/offers/editor/templates/step6.html',
					controller: 'EditorControllerStep6',
					controllerAs: 'step6'
				}
			},
			parent: 'giver.dashboard.offers.edit'
		})
};

export {routes};