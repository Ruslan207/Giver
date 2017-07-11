class OffersController {
	constructor($uibModal, $http, $state, $rootScope) {
		this.$uibModal = $uibModal;
		this.$state = $state;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.updateOffers();
	}
	updateOffers(){
		let _self = this;
		this.$http.get('offers').then((response) => {
			_self.offers = response.data.offers;
		});
	}
	chooseType(){
		this.$uibModal.open({
			templateUrl: 'modules/dashboard/offers/templates/offer_type.modal.html',
			windowClass: 'offerType',
			controller: ['$scope', '$uibModalInstance', ($scope, $uibModalInstance) => {
				$scope.select = (type) => {
					$scope.selectedType = type;
				};
				$scope.createOffer = () => {
					if ($scope.selectedType !== undefined) {
						$uibModalInstance.close();
						this.$rootScope.$emit('editableOffer', {});
						this.$state.go('giver.dashboard.offers.edit.step1');
					}
				}
			}],
			controllerAs: 'chooser'
		});
	}
	unarchiveOffer(offer){
		offer.is_archived = false;
		let _self = this;
		this.$http.post('offers?id='+offer.id, offer).then(() => {
			_self.updateOffers();
		});
	}
	archiveOffer(offer){
		offer.is_archived = true;
		let _self = this;
		this.$http.post('offers?id='+offer.id, offer).then(() => {
			_self.updateOffers();
		});
	}
	startOffer(offer){
		offer.is_active = true;
		let _self = this;
		this.$http.post('offers?id='+offer.id, offer).then(() => {
			_self.updateOffers();
		});
	}
	stopOffer(offer){
		offer.is_active = false;
		let _self = this;
		this.$http.post('offers?id='+offer.id, offer).then(() => {
			_self.updateOffers();
		});
	}
	editOffer(offer){
		this.$rootScope.$emit('editableOffer', offer);
		this.$state.go('giver.dashboard.offers.edit.step1');
	}
	copyOffer(offer){
		let _self = this;
		let offerCopy = angular.copy(offer);
		delete offerCopy.id;
		this.$http.post('offers', offerCopy).then(() => {
			_self.updateOffers();
		});
	}
}

OffersController.$inject = ['$uibModal', '$http', '$state', '$rootScope'];

export {OffersController}