$(document).ready(function() {
    // Handle button click
    $('.btn a').click(function(event) {
      event.preventDefault();
      var buttonText = $(this).text();
      alert('You clicked the "' + buttonText + '" button.');
    });
  });