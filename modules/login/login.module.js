import {routes} from "./login.routes";
import {LoginController} from './login.controller'

import './styles/style.css!';

let module = angular.module('giver.login', []);

module.controller('LoginController', LoginController);
module.config(['$stateProvider', routes]);

export {module}