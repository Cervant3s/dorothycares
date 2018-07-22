// Elements selection and variables creation
let dataText = ''; // variable for the json response
let jwt = ''; // variable for the json web token

// AJAX requests
let feedphp = 'ajax.php';
let feednode = 'https://dorothycares.ovh/node-api/ressources/';
let dataRequestGetJWT = new XMLHttpRequest(); // open ajax request to get the json web token
let dataRequestDisplayResources = new XMLHttpRequest(); // open ajax request to display resources

const ajaxRequestGetJWT = () => { // ajax request
  dataRequestGetJWT.onload = whenDataLoadedGetJWT; // we assign the function to excecute when the data are loaded
  dataRequestGetJWT.open("GET", feedphp + '?dataToGet=JWT', false); // the type, the url, asynchronous true/false
  dataRequestGetJWT.send(null); // we send the request
};

const whenDataLoadedGetJWT = () => { // what happens when the AJAX request is done
  dataText = dataRequestGetJWT.responseText; // we store the text of the response
  dataObject = JSON.parse(dataText); // we convert the text into an object

  jwt = dataObject.response.jwt; // return the json web token
};

const ajaxRequestDisplayResources = () => { // ajax request
  dataRequestDisplayResources.onload = whenDataLoadedDisplayResources; // we assign the function to excecute when the data are loaded
  dataRequestDisplayResources.open("GET", feednode, true); // the type, the url, asynchronous true/false
  dataRequestDisplayResources.setRequestHeader('Authorization', 'Bearer ' + jwt);
  dataRequestDisplayResources.send(null); // we send the request
};

const whenDataLoadedDisplayResources = () => { // what happens when the AJAX request is done
  dataText = dataRequestDisplayResources.responseText; // we store the text of the response
  dataObject = JSON.parse(dataText); // we convert the text into an object

  if (dataObject.message != 'undefined') {
    dataObject.ressources.forEach((el) => {
      console.log(el.displayName);
    });
  } else {
    console.log('hello');
  }
};

// Event Listeners
window.addEventListener('load', () => { // implantations displayed on load
  ajaxRequestGetJWT(); // save the json web token in the variable we created for it
  ajaxRequestDisplayResources();
});
