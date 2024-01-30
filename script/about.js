
  $(document).ready(function() {
    
    $('.scrollspy').scrollSpy();

   
    $('.menu a').on('click', function(event) {
      if (this.hash !== '') {
        event.preventDefault();
        const hash = this.hash;

        
        $('.sidenav').sidenav('close');

       
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 64 
          },
          800 
        );
      }
    });
  });
