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
