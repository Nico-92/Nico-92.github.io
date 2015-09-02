var app = angular.module("article", ['ui.bootstrap']);
app.controller('myArticle', function($scope, $http) {
	$scope.showArticleBody = false;
	$scope.selected = undefined;
	$scope.selectedTags = [];
	$scope.articlesIds = [];
	$scope.articles = [];
	$http.get('dataSource/tags.json')
		.then(function(res) {
			$scope.tags = res.data.elenco;
			$scope.corrispondenze = res.data.corrispondenze;
		});
	$http.get('dataSource/articles.json')
		.then(function(res) {
			$scope.allArticles = res.data;
		});
	$scope.onSelect = function($item, $model, $label) {
		// Aggiungo il tag all'elenco dei tag selezionati solo se non è già presente
		if ($scope.selectedTags.indexOf($label) == -1 && $label !== "") {
			$scope.selectedTags.push($label);
		}
		// Pulisco la barra di ricerca dei tag
		$scope.selected = '';
		_.forEach($scope.selectedTags, function(element, i){
			// Recupero l'oggetto che corrisponde al tag cercato
			var index = _.findIndex($scope.corrispondenze, function(chr) {
				return chr.tag == element;
			});
			// Se il tag cercato ha degli articoli
			if (index !== -1) {
				// Recupero l'array di articoli, copiandolo se è il primo tag, o facendo un intersezione
				// con gli articoli già presenti se non lo è (così restano solo quelli in comune)
				if ($scope.articlesIds.length === 0) {
					$scope.articlesIds = $scope.corrispondenze[index].articles;
				} else {
					$scope.articlesIds = _.intersection($scope.articlesIds, $scope.corrispondenze[index].articles);
				}
				$scope.articles = _.select($scope.allArticles, function(a) {
					return $scope.articlesIds.indexOf(a.id) != -1;
				});
			}
		});
	};

	$scope.openArticle = function(index) {
		$scope.showArticleBody = true;
		$scope.installation = $scope.articles[index].installation;
		$scope.configuration = $scope.articles[index].configuration;
		$scope.use = $scope.articles[index].use;
	};

	$scope.removeTag = function(index) {
		$scope.selectedTags.splice(index, 1);
		$scope.articlesIds = [];
		if($scope.selectedTags.length === 0){
			$scope.articles = [];
		}else{
			$scope.onSelect("","","");	
		}
	};

	$scope.closeArticle = function() {
		$scope.showArticleBody = false;
	};
});