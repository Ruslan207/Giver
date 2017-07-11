let routes = ($stateProvider) => {
	$stateProvider
		.state('giver', {
			url: '/',
			abstract: true
		});
};

export {routes};