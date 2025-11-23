// main.js — small interaction helpers
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.tile').forEach(tile=>{
    tile.addEventListener('click', ()=> {
      // if data-id present, go to edition detail
      const id = tile.getAttribute('data-id');
      if(id) window.location.href = 'edition-' + id + '.html';
    });
    tile.addEventListener('keypress', (e)=>{
      if(e.key === 'Enter') tile.click();
    });
  });

  // edition page: make product-thumbs clickable to swap main image
  var thumbsContainer = document.querySelector('.product-thumbs');
  if (thumbsContainer) {
    var bigImg = document.querySelector('.product-image-big img');
    var thumbs = thumbsContainer.querySelectorAll('img');
    thumbs.forEach(function(thumb){
      thumb.style.cursor = 'pointer';
      thumb.addEventListener('click', function(){
        if(!bigImg) return;
        // swap src — if thumbnails are smaller versions, consider data-large attribute
        var newSrc = thumb.getAttribute('data-large') || thumb.src;
        bigImg.src = newSrc;
        // active class
        thumbs.forEach(t=>t.classList.remove('active'));
        thumb.classList.add('active');
      });
      thumb.addEventListener('keypress', function(e){ if(e.key==='Enter') thumb.click(); });
    });
    // set first thumb active by default
    if(thumbs.length > 0) {
      thumbs.forEach(t=>t.classList.remove('active'));
      thumbs[0].classList.add('active');
    }
  }

  // shop page: make shop-thumbs clickable to swap main image
  document.querySelectorAll('.shop-thumbs').forEach(function(shopThumbsContainer){
    var shopBigImg = shopThumbsContainer.parentElement.querySelector('.shop-image-big img');
    if(!shopBigImg) return;
    var shopThumbs = shopThumbsContainer.querySelectorAll('img');
    shopThumbs.forEach(function(thumb){
      thumb.style.cursor = 'pointer';
      thumb.addEventListener('click', function(){
        var newSrc = thumb.getAttribute('data-large') || thumb.src;
        shopBigImg.src = newSrc;
        shopThumbs.forEach(t=>t.classList.remove('active'));
        thumb.classList.add('active');
      });
      thumb.addEventListener('keypress', function(e){ if(e.key==='Enter') thumb.click(); });
    });
    // set first thumb active by default
    if(shopThumbs.length > 0) {
      shopThumbs.forEach(t=>t.classList.remove('active'));
      shopThumbs[0].classList.add('active');
    }
  });
});
// === Cookie banner RGPD ===
(function() {
  var ACCEPT_KEY = 'mu_cookies_accepted';

  function createCookieBanner() {
    if (document.getElementById('cookieBanner')) return;
    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = "<p>We use cookies to improve your experience and to analyze our traffic. By clicking ‘Accept’, you consent to the use of cookies in accordance with our Privacy Policy.</p><button id='cookieAccept'>Accept</button>";
    document.body.appendChild(banner);

    var btn = document.getElementById('cookieAccept');
    btn.addEventListener('click', function() {
      try {
        localStorage.setItem(ACCEPT_KEY, 'true');
      } catch(e) {}
      banner.style.display = 'none';
    });
  }

  try {
    if (localStorage.getItem(ACCEPT_KEY) === 'true') {
      // already accepted
      return;
    }
  } catch(e) {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCookieBanner);
  } else {
    createCookieBanner();
  }
})();