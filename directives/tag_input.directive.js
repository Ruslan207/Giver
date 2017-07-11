let tagInput = () => {
	return {
		restrict: 'E',
		scope: {
			inputTags: '=taglist'
		},
		link: function ($scope, element, attrs) {
			$scope.defaultWidth = 200;
			$scope.tagText = '';
			const placeholder_orig = attrs.placeholder;
			$scope.placeholder = placeholder_orig;
			$scope.class = attrs.class;
			$scope.tagArray = function () {
				if ($scope.inputTags === undefined) {
					return [];
				}
				if (typeof $scope.inputTags == 'string') {
					return $scope.inputTags.split(',').filter(function (tag) {
						return tag !== '';
					});
				} else {
					return $scope.inputTags.filter(function (tag) {
						return tag !== '';
					});
				}
			};
			$scope.deleteTag = function (key) {
				var tagArray;
				tagArray = $scope.tagArray();
				if (tagArray.length > 0 && $scope.tagText.length === 0 && key === undefined) {
					tagArray.pop();
				} else {
					if (key !== undefined) {
						tagArray.splice(key, 1);
					}
				}
				updatePlaceholder(tagArray);
				// return $scope.inputTags = tagArray.join(',');
                return $scope.inputTags = tagArray;
			};
			$scope.addTag = function () {
				var tagArray;
				if ($scope.tagText.length === 0) {
					return;
				}
				tagArray = $scope.tagArray();
				tagArray.push($scope.tagText.split(' ')[0]);
				// $scope.inputTags = tagArray.join(',');
				$scope.inputTags = tagArray;
				updateView($scope.tagText);
				return $scope.tagText = '';
			};
			function updatePlaceholder(tagArray) {
				if (tagArray.length > 0){
					$scope.placeholder = ''
				} else {
					$scope.placeholder = placeholder_orig
				}
			}
			function updateView(newVal) {
				var tempEl;
				updatePlaceholder($scope.tagArray());
				if (newVal !== undefined) {
					tempEl = angular.element('<span>' + newVal + '</span>');
					angular.element(document.getElementsByTagName('body')).append(tempEl);

					$scope.inputWidth = tempEl[0].clientWidth + 5;
					if ($scope.inputWidth < $scope.defaultWidth) {
						$scope.inputWidth = $scope.defaultWidth;
					}
					return tempEl.remove();
				}
			}

			element.bind('keydown', function (e) {
				var key;
				key = e.which;
				if (key === 9 || key === 13) {
					e.preventDefault();
				}
				if (key === 8) {
					return $scope.$apply('deleteTag()');
				}
			});
			// element.bind('blur', function(e) {
             //    e.preventDefault();
			// 	$scope.addTag();
			// 	$scope.$apply();
			// });
			return element.bind('keyup', function (e) {
				var key;
				key = e.which;
				if (key === 9 || key === 13 || key === 188 || key === 32) {
					e.preventDefault();
					$scope.addTag();
					return $scope.$apply();
				}
			});
		}

		,
		template: '<div class=\'tag-input-ctn\'><div class=\'input-tag\' data-ng-repeat="tag in tagArray() track by $index">#{{tag}}<div class=\'delete-tag\' data-ng-click=\'deleteTag($index)\'>&times;</div></div><input class=\'{{class}}\' type=\'text\' data-ng-style=\'{width: inputWidth}\' data-ng-blur=\'addTag()\' data-ng-model=\'tagText\' ng-attr-placeholder=\'{{placeholder}}\'/></div>'
	};
};

tagInput.$inject = [];

export {tagInput}