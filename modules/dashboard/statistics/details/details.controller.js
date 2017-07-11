class DetailsController {
    constructor($stateParams, $http) {
        let _self = this;
        let id = $stateParams.id;
        $http.get(`offers/${id}/stat`).then((response)=>{
            _self.data = response.data;
        });
    }
}

DetailsController.$inject = ['$stateParams', '$http'];

export {DetailsController}