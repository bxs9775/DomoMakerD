// Get a Cross Site Request Forgery(csrf) token
const getToken = () => {
  sendAjax('GET','/getToken', null, (result) => {
    setup(result.csrfToken);
  })
};

//Handles error by displaying it on the page.
const handleError = (message) => {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({width:'toggle'},350);
};

//Redirects the client to the given page.
const redirect = (response) => {
  $("#domoMessage").animate({width:'hide'},350);
  window.location = response.redirect;
};

//Handles AJAX calls to the server
const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function(xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  })
};