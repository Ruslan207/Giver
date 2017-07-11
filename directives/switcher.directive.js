let switcher = () => {
	return {
		restrict: 'A',
		scope: {
			ngSwitcher: '='
		},
		link: function (scope, element, attrs) {
			let inputSelected = false;

			function updateClasses(childs, val) {
				let flag = true;
				let input;
				angular.forEach(childs, (child) => {
					let elem = angular.element(child);
					if (val !== undefined && cast(elem.attr('ng-switcher-value')) == cast(val)) {
						elem.addClass(scope.className);
						flag = false;
					} else {
						elem.removeClass(scope.className);
					}
					// if (elem.attr('ng-switcher-custom') != undefined) {
					// 	input = elem;
					// }
				});
				// if (flag) {
				// 	input.addClass(scope.className);
				// 	inputSelected = true
				// }
			}

			function cast(val) {
				if (!isNaN(parseFloat(val))) {
					return parseFloat(val);
				} else if (val === 'true')
					return true;
				else if (val === 'false')
					return false;
				else return val
			}

			scope.className = attrs.ngSwitcherClass;
			let childs = element.children();
			angular.element(element[0].querySelectorAll('[ng-switcher-default]')).on('click', (e) => {
				element.removeClass('input-selected');
				scope.$apply(() => {
					let val = angular.element(e.currentTarget).attr('ng-switcher-default');
					scope.ngSwitcher = cast(val);
				});
				updateClasses(childs, scope.ngSwitcher);
				e.stopPropagation();
				e.preventDefault();
			});
			updateClasses(childs, scope.ngSwitcher);
			angular.forEach(childs, (child) => {
				let elem = angular.element(child);
				elem.on('click', (e) => {
					// inputSelected = false;
					let val = angular.element(e.currentTarget).attr('ng-switcher-value');
					scope.$apply(() => {
						scope.ngSwitcher = cast(val);
					});
					updateClasses(childs, val);
					let inputSelected = angular.element(e.currentTarget).attr('ng-switcher-custom') != undefined;
					if (inputSelected) {
						angular.element(e.currentTarget).addClass(scope.className);
						element.addClass('input-selected')
					} else {
						element.removeClass('input-selected')
					}
				});
			});
		}
	};
};

switcher.switcher = [];

export {switcher}