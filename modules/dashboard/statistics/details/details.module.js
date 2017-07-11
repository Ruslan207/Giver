import './styles/style.css!'


import {DetailsController} from './details.controller'
import {routes} from './details.routes'

let module = angular.module('giver.dashboard.statistics.details', [
]);

module.controller('DetailsController', DetailsController);
module.config(['$stateProvider', routes]);

export {module}