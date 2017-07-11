import '../../../bootstrap_custom_build/ui-bootstrap-custom-tpls-2.5.0.min'

import './editor/editor.module'

import './styles/style.css!'

import {OffersController} from './offers.controller'
import {routes} from './offers.routes'
import {toggleClass} from  '../../../directives/toogle_class.directive'
import {stopBubbling} from  '../../../directives/stop_bubbling.directive'

let module = angular.module('giver.dashboard.offers', [
	'giver.dashboard.offers.editor',
	'ui.bootstrap'
]);

module.controller('OffersController', OffersController);
module.config(['$stateProvider', routes]);
module.directive('toggleClass', toggleClass);
module.directive('stopBubbling', stopBubbling);

export {module}