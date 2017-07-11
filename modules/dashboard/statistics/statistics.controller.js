class StatisticsController {
    constructor($http) {
        let _self = this;
        $http.get('offers').then((response) => {
            _self.offers = response.data.offers;
        });
    }
}

StatisticsController.$inject = ['$http'];

export {StatisticsController}