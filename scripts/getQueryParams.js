function getQueryParams(url) {
  // Create an anchor element to use the URL API
  const a = document.createElement("a");
  a.href = url;

  // Get the query string
  const queryString = a.search.substring(1);

  // Split the query string into key-value pairs
  const paramsArray = queryString.split("&");

  // Initialize an object to hold the parameters
  const params = {};

  // Loop through the key-value pairs and add them to the params object
  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = decodeURIComponent(value);
  });

  return params;
}

export default getQueryParams;
