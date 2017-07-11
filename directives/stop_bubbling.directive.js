let stopBubbling = () => {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function(e) {
				e.stopPropagation();
			});
		}
	};
};

stopBubbling.$inject = [];

export {stopBubbling}