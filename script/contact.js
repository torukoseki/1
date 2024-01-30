$(document).ready(function() {
  // Handle form submission
  $('form').submit(function(event) {
    event.preventDefault();

    // Display a success message
    alert('Thank you! Your message has been sent successfully.');

    // Reset the form
    $('form')[0].reset();
  });
});