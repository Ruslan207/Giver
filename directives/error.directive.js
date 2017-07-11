let errorDirective = ($rootScope) => {
	return {
		restrict: 'A',
		link: (scope, element, attrs) => {
			$rootScope.$watch("serverErrors['"+attrs.error+"']", ()=>{
				if ($rootScope.serverErrors && $rootScope.serverErrors[attrs.error] && $rootScope.serverErrors[attrs.error].length>0) {
					element.addClass('invalid');
					// window.scrollTo(0, element[0].offsetTop - 100)
				} else {
					element.removeClass('invalid');
				}
			})
		}
	}
};

errorDirective.$inject = ['$rootScope'];

export {errorDirective}