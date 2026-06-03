/* OrbiTrack — script.js */

  // 1. RELÓGIO UTC
  function atualizarRelogio() {
    var agora = new Date();
    var h = String(agora.getUTCHours()).padStart(2, '0');
    var m = String(agora.getUTCMinutes()).padStart(2, '0');
    var s = String(agora.getUTCSeconds()).padStart(2, '0');
    var hora = h + ':' + m + ':' + s + ' UTC';
    var heroTs = document.getElementById('hero-ts');
    var footTs = document.getElementById('foot-ts');
    if (heroTs) heroTs.textContent = hora;
    if (footTs) footTs.textContent = hora + ' · –15.793 / –47.882';
  }
  setInterval(atualizarRelogio, 1000);
  atualizarRelogio();

  // 2. MENU MOBILE
  var navToggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var aberto = navToggle.classList.toggle('open');
      if (aberto) { navMobile.classList.add('open'); }
      else         { navMobile.classList.remove('open'); }
      navToggle.setAttribute('aria-expanded', aberto);
      navMobile.setAttribute('aria-hidden', !aberto);
    });
  }