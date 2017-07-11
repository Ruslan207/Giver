let toggleClass = () => {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				element.toggleClass(attrs.toggleClass);
			});
		}
	};
};

toggleClass.$inject = [];

export {toggleClass}