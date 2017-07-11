class DashboardController {
    constructor($state, $http, $rootScope, $scope) {
        let _self = this;
        this.$state = $state;
        this.$http = $http;
        function originOrDefault(variable, defaultValue) {
            if (variable === undefined || variable === null) {
                return defaultValue
            } else {
                return variable
            }
        }

        $rootScope.$on('editableOffer', (event, offer) => {
            $rootScope.editableOffer = offer;
            $rootScope.editableOffer.times = originOrDefault($rootScope.editableOffer.times, {
                week: [],
                start_date: (new Date()).toISOString(),
                end_date: (new Date()).toISOString()
            });
            $rootScope.editableOffer.longitude = originOrDefault($rootScope.editableOffer.longitude, 0);
            $rootScope.editableOffer.latitude = originOrDefault($rootScope.editableOffer.latitude, 0);
            $rootScope.editableOffer.is_active = originOrDefault($rootScope.editableOffer.is_active, true);
            $rootScope.editableOffer.is_archived = originOrDefault($rootScope.editableOffer.is_archived, false);
        });

        $http.get('profile').then((response) => {
            // 	if (data.code == 0) {
            _self.profile = response.data.user;
            // 	}
        });
        $scope.$on('onBeforeUnload', function (e, confirmation) {
            if ($rootScope.editableOffer) {
                confirmation.message = "All data willl be lost.";
                e.preventDefault();
            }
        });
        $scope.$on('onUnload', function (e) {
            if ($rootScope.editableOffer) {
                console.log('leaving page');
            }
        });
    }

    inState(state) {
        return this.$state.includes(state);
    }

    logout() {
        this.$http.post('logout').then(() => {
            this.$state.go('giver.login');
        })
    }
}

DashboardController.$inject = ['$state', '$http', '$rootScope', '$scope'];

export {DashboardController}