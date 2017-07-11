let httpConfig = ($httpProvider) => {
	$httpProvider.interceptors.push(['$q', '$injector', '$rootScope', ($q, $injector, $rootScope)=> {
		return {
			request: (config) => {
				var API_URL = 'api/v2.2/dashboard/';

				var url = config.url;
				var re = /(modules|assets|configs|services|directives|uib)/;

				if (!re.exec(url)) {
					config.url = API_URL + config.url;
				}

				return config || $q.when(config);
			},
			response: (response) => {
				if (response.data && response.data.code == 0) {
					$rootScope.serverErrors = {};
				}
				// if (response.data.offers && angular.isArray(response.data.offers)) {
				// 	for (let i = 0; i < response.data.offers.length; i++) {
				// 		if (response.data.offers[i].rules.length == 0 ||
				// 			response.data.offers[i].rules[0].datetime_start >= response.data.offers[i].rules[0].datetime_end) {
				// 			response.data.offers.splice(i, 1);
				// 			i--;
				// 		}
				// 	}
				// }
				return response || $q.when(response);
			},
			responseError: (response) => {
				let stateService = $injector.get('$state');
				let $http = $injector.get('$http');
				switch (response.data.code) {
					case 8:
						stateService.go('giver.login');
						break;
					case 9:
					case 10:
						$http.post('logout');
						stateService.go('giver.login');
						break;
					default:
						if (response.data.code !== 0) {
							$rootScope.serverErrors = {};
							if (angular.isObject(response.data.detail)) {
								let keys = Object.keys(response.data.detail);
								for (let i = 0; i < keys.length; i++) {
									$rootScope.serverErrors[keys[i]] = response.data.detail[keys[i]][0];
								}
								// alert(keys[0]+': '+response.data.detail[keys[0]][0])
							}
							if (angular.isString(response.data.detail)) {
								// alert(response.data.detail);
								$rootScope.serverErrors['generalError'] = response.data.detail;
							}
						}
						break;
				}
				return response || $q.when(response);
			}
		}
	}])
};

export {httpConfig}