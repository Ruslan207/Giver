class EditorController {
    constructor($rootScope) {
        if ($rootScope.editableOffer === undefined) {
            $rootScope.$emit('editableOffer', {});
            this.title = "Create new offer";
            this.submit = "Create";
        } else {
            this.title = "Edit an offer";
            this.submit = "Save";
        }
    }
}

EditorController.$inject = ['$rootScope'];

export {EditorController}

class EditorControllerStep1 {
    constructor($rootScope) {
        this.offer = $rootScope.editableOffer;
    }
}

EditorControllerStep1.$inject = ['$rootScope'];

export {EditorControllerStep1}

class EditorControllerStep2 {
    constructor($uibModal, $rootScope) {
        this.$uibModal = $uibModal;
        this.offer = $rootScope.editableOffer;
    }

    showMap() {
        this.$uibModal.open({
            templateUrl: 'modules/dashboard/offers/editor/templates/map.modal.html',
            windowClass: 'map',
            controller: ['$scope', '$uibModalInstance', 'NgMap', '$rootScope', '$timeout', 'GeoCoder',
                ($scope, $uibModalInstance, NgMap, $rootScope, $timeout, GeoCoder) => {
                    $scope.render = false;
                    $timeout(function () {
                        $scope.render = true;
                    });
                    NgMap.getMap().then((map) => {
                        $scope.markerPosition = [
                            $rootScope.editableOffer.latitude,
                            $rootScope.editableOffer.longitude,
                        ];
                        $scope.setPoint = (e) => {
                            $scope.markerPosition = [
                                e.latLng.lat(),
                                e.latLng.lng()
                            ];
                            $rootScope.editableOffer.latitude = e.latLng.lat();
                            $rootScope.editableOffer.longitude = e.latLng.lng();
                            GeoCoder.geocode({
                                'latLng': {
                                    lat: e.latLng.lat(),
                                    lng: e.latLng.lng()
                                }
                            }).then((data) => {
                                $rootScope.editableOffer.address = data[0].formatted_address;
                            });
                        }
                    });
                    $scope.closeModal = () => {
                        $uibModalInstance.close();
                    }
                }],
            controllerAs: 'map'
        });
    }
}

EditorControllerStep2.$inject = ['$uibModal', '$rootScope'];

export {EditorControllerStep2}

class EditorControllerStep3 {
    constructor($rootScope) {
        this.offer = $rootScope.editableOffer;
    }
}

EditorControllerStep3.$inject = ['$rootScope'];

export {EditorControllerStep3}

class EditorControllerStep4 {
    constructor(Upload, $rootScope, $uibModal) {
        this.upload = Upload;
        this.offer = $rootScope.editableOffer;
        this.$uibModal = $uibModal;
    }

    modalMask() {
        this.$uibModal.open({
            templateUrl: 'modules/dashboard/offers/editor/templates/mask.modal.html',
            windowClass: 'maskModal',
            controller: ['Upload', '$scope', '$rootScope', '$uibModalInstance',
                (Upload, $scope, $rootScope, $uibModalInstance) => {
                    $scope.upload = (file) => {
                        if (file) {
                            file.upload = Upload.upload({
                                url: 'media/upload/mask',
                                data: {file: file}
                            });

                            file.upload.then(function (response) {
                                $rootScope.editableOffer.mask = response.data.url;
                                $uibModalInstance.close();
                            });
                        }
                    }
                }
            ]
        })
    }

    modalPreview() {
        this.$uibModal.open({
            templateUrl: 'modules/dashboard/offers/editor/templates/preview.modal.html',
            windowClass: 'previewModal',
            controller: ['Upload', '$scope', '$rootScope', '$uibModalInstance',
                (Upload, $scope, $rootScope, $uibModalInstance) => {
                    $scope.upload = (file) => {
                        if (file) {
                            file.upload = Upload.upload({
                                url: 'media/upload/preview',
                                data: {file: file}
                            });

                            file.upload.then(function (response) {
                                $rootScope.editableOffer.preview = response.data.url;
                                $uibModalInstance.close();
                            });
                        }
                    }
                }
            ]
        })
    }

    uploadFile(file, field) {
        if (file) {
            let _self = this;
            file.upload = this.upload.upload({
                url: 'media/upload/' + field,
                data: {file: file}
            });

            // let fr = new FileReader();

            // fr.onload = () => {
            // 	$scope.newOffer[field] = fr.result;
            // };

            // fr.readAsDataURL(file);

            file.upload.then(function (response) {
                _self.offer[field] = response.data.url;
            });
        }
    }
}

EditorControllerStep4.$inject = ['Upload', '$rootScope', '$uibModal'];

export {EditorControllerStep4}

class EditorControllerStep5 {
    constructor($rootScope, $scope) {
        let _self = this;
        this.offer = $rootScope.editableOffer;
        this.currDay = this.setCurrDay(0);
        if (this.offer && this.offer.times.start_date && this.offer.times.end_date) {
            this.datePicker = {
                date: {
                    startDate: new Date(this.offer.times.start_date),
                    endDate: new Date(this.offer.times.end_date)
                }
            }
        } else {
            this.datePicker = {
                date: {
                    startDate: new Date(),
                    endDate: new Date()
                }
            };
        }
        $scope.applyRange = (ev) => {
            _self.offer.times.start_date = ev.model.startDate.toISOString();
            _self.offer.times.end_date = ev.model.endDate.toISOString();
        }
    }

    getClass(index) {
        let className = '';
        if (this.offer.times.week[index] != null) {
            className += 'filled'
        }
        if (this.currDay && index == this.currDay.index) {
            className += ' active'
        }
        return className;
    }

    setCurrDay(index) {
        this.currDay = {
            index: index,
            day: this.offer.times.week[index]
        };
        if (this.currDay.day) {
            if (this.currDay.day.start_time && this.currDay.day.start_time.length > 4) {
                this.currDay.day.start_time = moment(this.currDay.day.start_time).format('HHmm');
            }
            if (this.currDay.day.end_time && this.currDay.day.end_time.length > 4) {
                this.currDay.day.end_time = moment(this.currDay.day.end_time).format('HHmm');
            }
        }
    }

    submitTime() {
        if (this.currDay && this.currDay.index !== undefined) {
            this.offer.times.week[this.currDay.index] = {};
            if (this.currDay.day) {
                if (this.currDay.day.start_time) {
                    let date = new Date();
                    date.setHours(parseInt(this.currDay.day.start_time.substr(0, 2)));
                    date.setMinutes(parseInt(this.currDay.day.start_time.substr(2, 2)));
                    this.offer.times.week[this.currDay.index].start_time = date.toISOString();
                }
                if (this.currDay.day.end_time) {
                    let date = new Date();
                    date.setHours(parseInt(this.currDay.day.end_time.substr(0, 2)));
                    date.setMinutes(parseInt(this.currDay.day.end_time.substr(2, 2)));
                    this.offer.times.week[this.currDay.index].end_time = date.toISOString();
                }
                if (!(this.currDay.day.start_time || this.currDay.day.end_time)) {
                    this.offer.times.week[this.currDay.index] = null
                }
            } else {
                this.offer.times.week[this.currDay.index] = null
            }
        }
    }
}

EditorControllerStep5.$inject = ['$rootScope', '$scope'];

export {
    EditorControllerStep5
}

class EditorControllerStep6 {
    constructor($rootScope, $http, $state) {
        this.offer = $rootScope.editableOffer;
        this.$http = $http;
        this.$state = $state;
    }

    handleError(data) {
        if (data.code == 7) {
            if (data.detail.title) {
                this.$state.go('giver.dashboard.offers.edit.step1');
            } else if (data.detail.full_info) {
                this.$state.go('giver.dashboard.offers.edit.step1');
            } else if (data.detail.comment_template) {
                this.$state.go('giver.dashboard.offers.edit.step1');
            } else if (data.detail.hashtags) {
                this.$state.go('giver.dashboard.offers.edit.step1');
            } else if (data.detail.facebook_object_id) {
                this.$state.go('giver.dashboard.offers.edit.step1');
            } else if (data.detail.partner_name) {
                this.$state.go('giver.dashboard.offers.edit.step2');
            } else if (data.detail.phone_number) {
                this.$state.go('giver.dashboard.offers.edit.step2');
            } else if (data.detail.site_url) {
                this.$state.go('giver.dashboard.offers.edit.step2');
            } else if (data.detail.address) {
                this.$state.go('giver.dashboard.offers.edit.step2');
            } else if (data.detail.offer_radius) {
                this.$state.go('giver.dashboard.offers.edit.step3');
            } else if (data.detail.need_reservation) {
                this.$state.go('giver.dashboard.offers.edit.step3');
            } else if (data.detail.default_camera) {
                this.$state.go('giver.dashboard.offers.edit.step3');
            } else if (data.detail.preview) {
                this.$state.go('giver.dashboard.offers.edit.step4');
            } else if (data.detail.mask) {
                this.$state.go('giver.dashboard.offers.edit.step4');
            } else if (data.detail.times) {
                this.$state.go('giver.dashboard.offers.edit.step5');
            } else if (data.detail.gift_type) {
                this.$state.go('giver.dashboard.offers.edit.step6');
            } else if (data.detail.gift_description) {
                this.$state.go('giver.dashboard.offers.edit.step6');
            } else if (data.detail.gift_limit_per_user) {
                this.$state.go('giver.dashboard.offers.edit.step6');
            } else if (data.detail.gift_limit_per_offer) {
                this.$state.go('giver.dashboard.offers.edit.step6');
            } else if (data.detail.gift_limit_per_event) {
                this.$state.go('giver.dashboard.offers.edit.step6');
            }
        }
    }

    save() {
        let _self = this;
        if (isNaN(this.offer.id)) {
            this.$http.post('offers', this.offer).then((response) => {
                if (response.status == 200) {
                    _self.$state.go('giver.dashboard.offers.list')
                } else {
                    this.handleError(response.data)
                }
            })
        } else {
            this.$http.post('offers?id=' + this.offer.id, this.offer).then((response) => {
                if (response.status == 200) {
                    _self.$state.go('giver.dashboard.offers.list')
                } else {
                    this.handleError(response.data)
                }
            })

        }
    }
}

EditorControllerStep6.$inject = ['$rootScope', '$http', '$state'];

export {EditorControllerStep6}