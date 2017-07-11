import 'ng-file-upload';
import uiMask from 'angular-ui-mask';
import 'jquery'
import moment from 'moment'
import 'bootstrap-daterangepicker'
import 'angular-daterangepicker';
import '../../../../bootstrap_custom_build/ui-bootstrap-custom-tpls-2.5.0.min'
import 'ngmap'
import 'ng-file-upload';

window['moment'] = moment;

import 'bootstrap-daterangepicker/daterangepicker.css!'
import './styles/style.css!'

import {
	EditorController,
	EditorControllerStep1,
	EditorControllerStep2,
	EditorControllerStep3,
	EditorControllerStep4,
	EditorControllerStep5,
	EditorControllerStep6
} from './editor.controller'
import {routes} from './editor.routes'
import {tagInput} from '../../../../directives/tag_input.directive'
import {switcher} from '../../../../directives/switcher.directive'
import {errorDirective} from '../../../../directives/error.directive'

let module = angular.module('giver.dashboard.offers.editor', [
	'ngFileUpload',
	uiMask,
	'daterangepicker',
	'ui.bootstrap',
	'ngMap',
	'ngFileUpload'
]);

module.controller('EditorController', EditorController);
module.controller('EditorControllerStep1', EditorControllerStep1);
module.controller('EditorControllerStep2', EditorControllerStep2);
module.controller('EditorControllerStep3', EditorControllerStep3);
module.controller('EditorControllerStep4', EditorControllerStep4);
module.controller('EditorControllerStep5', EditorControllerStep5);
module.controller('EditorControllerStep6', EditorControllerStep6);
module.config(['$stateProvider', routes]);
module.directive('tagInput', tagInput);
module.directive('ngSwitcher', switcher);
module.directive('error', errorDirective);

export {module}