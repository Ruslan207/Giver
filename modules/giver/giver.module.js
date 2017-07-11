import 'angular'
import 'angular-ui-router';
import 'modules/login/login.module'
import 'modules/dashboard/dashboard.module'

import 'bootstrap_custom_build/bootstrap.min.css!'
import './styles/style.css!'

import {routes} from './giver.routes'
import {httpConfig} from 'configs/http.config'

let module = angular.module('giver', [
	'ui.router',
	'giver.login',
	'giver.dashboard'
]);

module
	.config(['$stateProvider', routes])
	.config(['$urlRouterProvider', ($urlRouterProvider) => {
		$urlRouterProvider.otherwise(function ($injector) {
			$injector.get('$state').go('giver.dashboard.offers.list');
		});
	}])
	.factory('beforeUnload', ['$rootScope', '$window', function ($rootScope, $window) {
		// Events are broadcast outside the Scope Lifecycle

		$window.onbeforeunload = function (e) {
			var confirmation = {};
			var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
			if (event.defaultPrevented) {
				return confirmation.message;
			}
		};

		$window.onunload = function () {
			$rootScope.$broadcast('onUnload');
		};
		return {};
	}])
	.run(['beforeUnload', () => {
	}]);

module.config(['$httpProvider', httpConfig]);

export {module}