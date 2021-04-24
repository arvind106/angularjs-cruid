const API_URL = "http://localhost:5600/api/v1/"
var app = angular.module('app', ['datatables']);

app.controller('mycontroller', function ($scope, $http) {
	//console.log('app loadded');
	$scope.success = false;
	$scope.succsessMessage = '';
	$scope.errorMessage = '';
	$http.get(`${API_URL}user/`).then(
		(res) => {
			$scope.users = res.data.data;
			//console.log($scope.data)
		}, (err) => {
			console.log(err)
		});

	$scope.getdata = () => {
		$http.get(`${API_URL}user/`).then(
			(res) => {
				$scope.users = res.data.data;
				//console.log($scope.data)
			}, (err) => {
				console.log(err)
			});
	}

	$scope.fetchSingleData = function (id) {
		$http.get(`${API_URL}user/${id}`).then(
			(res) => {
				$scope.hidden_id = res.data.data._id;
				$scope.f_name = res.data.data.f_name;
				$scope.l_name = res.data.data.l_name;
				$scope.email = res.data.data.email;
				$scope.city = res.data.data.city;
				$scope.address = res.data.data.address;
				$scope.submit_button = 'Update';
				$scope.openModal();
			}, (err) => {
				console.log(err)
			});
	};

	$scope.addData = function () {
		$scope.modalTitle = 'Add Data';
		$scope.submit_button = 'Insert';
		$scope.openModal();
	};

	$scope.submitForm = function () {
		const data = {
			'f_name': $scope.f_name,
			'l_name': $scope.l_name,
			'email': $scope.email,
			'password': 'ARVIND',
			'city': $scope.city,
			'address': $scope.address,
		}
		$http({
			method: $scope.hidden_id? "PATCH" : "POST",
			url: $scope.hidden_id ? (`${API_URL}user/${$scope.hidden_id}`) :  (`${API_URL}user`),
			data: data
		}).then(
			(res) => {
				$scope.succsessMessage = 'Data '+ ($scope.hidden_id ? "update" : "save")+' successfully!';
				$scope.closeModal();
				$scope.getdata();
			}, (err) => {
				//console.log(err.data.error.errors.email)
				$scope.errorMessage =(err.data.error.errors);
			});

	};
	$scope.deleteData = function (id) {
		if (confirm("Are you sure you want to delete it?")) {
			$http.delete(`${API_URL}user/${id}`).then(
				(res) => {
					$scope.succsessMessage = 'Data delete successfully!';
					$scope.closeModal();
					$scope.getdata();
				}, (err) => {
					console.log(err)
				});
		}
	}

	$scope.openModal = function () {
		var modal_popup = angular.element('#crudmodal');
		modal_popup.modal('show');
	};
	$scope.closeModal = function () {
		var modal_popup = angular.element('#crudmodal');
		modal_popup.modal('hide');
	};
});

