const <%= camelCaseName %> = ($http) => {
  const url = {
    base: '/api/<%= spineCaseName %>'
  };
  let all<%= titleCaseName %> = [];

  // NOTE: Use this pattern of maintaining state in services and only enabling
  // specific functions to be called to modify the state.
  const addTo<%= titleCaseName %> = (name) => {
    all<%= titleCaseName %>.push({name});
  };

  const getAll<%= titleCaseName %> = () => {
    return all<%= titleCaseName %>;
  };

  const loadAll<%= titleCaseName %> = () => {
    return $http.get(<%= urlBase %>)
      .then((res) => {
        all<%= titleCaseName %> = res.data;
      });
  };

  return {
    addTo<%= titleCaseName %>,
    getAll<%= titleCaseName %>,
    loadAll<%= titleCaseName %>
  };
};

<%= camelCaseName %>.$inject = ['$http'];

export {<%= camelCaseName %>};
