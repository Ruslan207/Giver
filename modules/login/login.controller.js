class LoginController {
	constructor($state, $http){
		this.$state = $state;
		this.$http = $http;
	}

	authorize(){
		this.$http.post('login', {
			email: this.mail,
			password: this.pass
		}).then((data)=>{
			// if (data.code == 0) {
				this.$state.go('giver.dashboard.offers.list');
			// }
		});
	}
}

LoginController.$inject = ['$state', '$http'];

export {LoginController}