import 'angular'
import 'modules/giver/giver.module'
// import 'modules/login/login.module'
// import 'modules/dashboard/dashboard.module'

angular.element(document).ready(() => {
	angular.bootstrap(document, ['giver']);
});