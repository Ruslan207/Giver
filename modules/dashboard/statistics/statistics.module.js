// import './styles/style.css!'

import {StatisticsController} from './statistics.controller'
import {routes} from './statistics.routes'
import './details/details.module'

let module = angular.module('giver.dashboard.statistics', [
    'giver.dashboard.statistics.details'
]);

module.controller('StatisticsController', StatisticsController);
module.config(['$stateProvider', routes]);

export {module}