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

  // 3. ANIMAÇÃO DE REVELAÇÃO NO SCROLL
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    observer.observe(el);
  });

  // 4. SLIDESHOW
  (function () {
    var slides      = document.querySelectorAll('.slide');
    var dots        = document.querySelectorAll('.slide-dot');
    var btnAnterior = document.getElementById('slide-prev');
    var btnProximo  = document.getElementById('slide-next');
    if (!slides.length) return;

    var indiceAtual = 0;
    var timer       = null;

    function irPara(n) {
      slides[indiceAtual].classList.remove('active');
      dots[indiceAtual].classList.remove('active');
      indiceAtual = (n + slides.length) % slides.length;
      slides[indiceAtual].classList.add('active');
      dots[indiceAtual].classList.add('active');
    }

    function proximo()  { irPara(indiceAtual + 1); }
    function anterior() { irPara(indiceAtual - 1); }

    function iniciarAutoplay() {
      clearInterval(timer);
      timer = setInterval(proximo, 4000);
    }

    if (btnProximo)  btnProximo.addEventListener('click',  function () { proximo();  iniciarAutoplay();
  });
    if (btnAnterior) btnAnterior.addEventListener('click', function () { anterior(); iniciarAutoplay();
  });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        irPara(Number(dot.dataset.index));
        iniciarAutoplay();
      });
    });

    iniciarAutoplay();
  })();

// 5. VALIDAÇÃO DO FORMULÁRIO (melhorada após IA)
  (function () {
    var forms = document.querySelectorAll('#cta-form');
    forms.forEach(function (form) {

      function mostrarErro(input, mensagem) {
        var row = input.closest('.f-row');
        if (!row) return;
        row.classList.add('has-error');
        var erro = row.querySelector('.field-error');
        if (!erro) {
          erro = document.createElement('span');
          erro.className = 'field-error';
          row.appendChild(erro);
        }
        erro.textContent = mensagem;
      }

      function limparErro(input) {
        var row = input.closest('.f-row');
        if (!row) return;
        row.classList.remove('has-error');
        var erro = row.querySelector('.field-error');
        if (erro) erro.remove();
      }

      function emailValido(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var org   = form.querySelector('#org');
        var email = form.querySelector('#email');
        var valido = true;
        if (org)   limparErro(org);
        if (email) limparErro(email);
        if (org && !org.value.trim()) {
          mostrarErro(org, 'Informe o nome da organização.');
          valido = false;
        }
        if (email && !email.value.trim()) {
          mostrarErro(email, 'Informe o e-mail institucional.');
          valido = false;
        } else if (email && !emailValido(email.value)) {
          mostrarErro(email, 'Formato de e-mail inválido.');
          valido = false;
        }
        if (!valido) return;
        form.innerHTML =
          '<div class="form-success">' +
          '<div class="ok-icon">✓</div>' +
          '<h4>Proposta enviada!</h4>' +
          '<p>Verifique seu e-mail institucional para os próximos passos.</p>' +
          '</div>';
      });

      form.querySelectorAll('input').forEach(function (input) {
        input.addEventListener('input', function () { limparErro(input); });
      });
    });
  })();

  (function () {
    var caixaQuiz = document.getElementById('quiz-box');
    if (!caixaQuiz) return;

    var perguntas = [
      { q: 'Qual satélite o OrbiTrack usa como fonte principal?',                               ops:
  ['Hubble', 'ISS', 'GOES-19', 'Starlink'],             r: 2 },
      { q: 'A cada quantos minutos o satélite varre o território?',                             ops:
  ['30min', '15min', '10min', '5min'],                  r: 3 },
      { q: 'Qual é a resolução espacial dos focos térmicos detectados?',                        ops:
  ['1.000m', '750m', '500m', '375m'],                   r: 3 },
      { q: 'Qual é a taxa de precisão na detecção de focos?',                                   ops:
  ['78%', '85%', '90%', '94%'],                        r: 3 },
      { q: 'Quantos hectares estão sob monitoramento contínuo?',                                ops:
  ['500mil', '1,5mi', '3,2mi', '10mi'],                 r: 2 },
      { q: 'Qual o tempo médio de chegada da brigada após a detecção?',                         ops:
  ['22min', '14min', '8,4min', '3min'],                 r: 2 },
      { q: 'Em quanto o OrbiTrack reduz o ETA vs. protocolo convencional?',                     ops:
  ['–15%', '–30%', '–47%', '–70%'],                    r: 2 },
      { q: 'Quantas constelações de satélites o OrbiTrack combina?',                            ops:
  ['1', '2', '3', '4'],                                r: 3 },
      { q: 'Qual a área mínima de um foco que o sistema detecta?',                              ops:
  ['5ha', '2ha', '1ha', '0,4ha'],                      r: 3 },
      { q: 'Qual bioma possui a maior área monitorada pelo OrbiTrack?',                         ops:
  ['Mata Atlântica', 'Caatinga', 'Pantanal', 'Cerrado'], r: 3 }
    ];

    var indicePergunta = 0;
    var pontuacao      = 0;
    var respondeu      = false;

    function renderizarPergunta() {
      if (indicePergunta >= perguntas.length) { renderizarResultado(); return; }
      var p = perguntas[indicePergunta];
      var progr = Math.round((indicePergunta / perguntas.length) * 100);
      var opcoesHtml = '';
      p.ops.forEach(function (op, i) {
        opcoesHtml += '<button class="quiz-option" data-idx="' + i + '">' + op + '</button>';
      });
      caixaQuiz.innerHTML =
        '<div class="quiz-progress">' +
          '<span class="quiz-num">Pergunta ' + (indicePergunta + 1) + ' / ' + perguntas.length +
  '</span>' +
          '<div class="quiz-bar"><div class="quiz-bar-fill" style="width:' + progr + '%"></div></div>' +
        '</div>' +
        '<div class="quiz-question"><p>' + p.q + '</p></div>' +
        '<div class="quiz-options">' + opcoesHtml + '</div>' +
        '<div class="quiz-feedback" id="quiz-fb"></div>' +
        '<button class="btn btn-primary quiz-next" id="quiz-proximo" style="display:none">' +
          (indicePergunta < perguntas.length - 1 ? 'Próxima pergunta →' : 'Ver resultado →') +
        '</button>';
      respondeu = false;
      caixaQuiz.querySelectorAll('.quiz-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (respondeu) return;
          respondeu = true;
          var escolha = Number(btn.dataset.idx);
          caixaQuiz.querySelectorAll('.quiz-option').forEach(function (b) { b.disabled = true; });
          if (escolha === p.r) {
            pontuacao++;
            btn.classList.add('correct');
            document.getElementById('quiz-fb').innerHTML = '<span class="quiz-ok">✓ Correto!</span>';
          } else {
            btn.classList.add('wrong');
            caixaQuiz.querySelectorAll('.quiz-option')[p.r].classList.add('correct');
            document.getElementById('quiz-fb').innerHTML =
              '<span class="quiz-err">✗ Incorreto. Resposta: <b>' + p.ops[p.r] + '</b></span>';
          }
          document.getElementById('quiz-proximo').style.display = 'inline-flex';
        });
      });
      document.getElementById('quiz-proximo').addEventListener('click', function () {
        indicePergunta++;
        renderizarPergunta();
      });
    }})