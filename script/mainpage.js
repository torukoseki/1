$(function(){


    let news = document.querySelector('#head1');

$("#filterbar > ul > li").on("click","",function(event) {
    let clickedInnerHTML = event.target.innerHTML;
    news.innerText = clickedInnerHTML;

});
});


$(function() {
    $('#game1').mouseover(function() {
      changeImage('/img/spiderman.webp');
    });
  
    $('#game2').mouseover(function() {
      changeImage('/img/123-55-730x410.jpg.webp');
    });
  
    $('#game3').mouseover(function() {
      changeImage('/img/8k-4k-vi-10k-wallpaper-preview.jpg');
    });
    $('#game4').mouseover(function() {
        changeImage('/img/metal-gear-solid-metal-gear-solid-3-snake-eater-wallpaper-preview.jpg');
    });
      $('#game5').mouseover(function() {
        changeImage('/img/rio-2-movie-2014-wallpaper-preview.jpg');
    });
  });
  
  function changeImage(imageSource) {
    $('#left img').attr('src', imageSource);
  }
  
  $(document).ready(function() {
    $('#menu-button').click(function() {
      $('.menu').toggle();
    });
  });