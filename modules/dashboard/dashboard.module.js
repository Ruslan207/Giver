import {DashboardController} from './dashboard.controller'
import {routes} from './dashboard.routes'

import './offers/offers.module'
import './statistics/statistics.module'

import './styles/styles.css!'

let module = angular.module('giver.dashboard', [
	'giver.dashboard.offers',
	'giver.dashboard.statistics'
]);

module.controller('DashboardController', DashboardController);
module.config(['$stateProvider', routes]);

export {module}
