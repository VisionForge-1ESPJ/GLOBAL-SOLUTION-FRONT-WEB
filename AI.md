# AI.md — Registro de uso de Inteligência Artificial

Disciplina: Web Development  
Prof. Israel Marques  
Projeto: OrbiTrack — Roteamento Preditivo Orbital

---

## Interação 1

### O que foi solicitado para a IA

> "Eu escrevi esse código de slideshow e quiz em JavaScript, mas está com problema.
> O slideshow fica piscando quando troca de slide porque eu tô escondendo com
> `display:none` e mostrando de novo sem nenhuma transição. E o quiz não está
> guardando a pontuação corretamente — quando o usuário clica numa opção ele
> consegue clicar de novo antes de ir pra próxima pergunta.
> Pode melhorar esse trecho?"
>
> Código enviado:
>
> ```javascript
> // slideshow - versao inicial
> var slideAtual = 0;
> var todosSlides = document.getElementsByClassName('slide');
>
> function trocarSlide(n) {
>   for (var i = 0; i < todosSlides.length; i++) {
>     todosSlides[i].style.display = 'none';
>   }
>   todosSlides[n].style.display = 'block';
>   slideAtual = n;
> }
>
> setInterval(function() {
>   var proximo = slideAtual + 1;
>   if (proximo >= todosSlides.length) { proximo = 0; }
>   trocarSlide(proximo);
> }, 3000);
>
> trocarSlide(0);
>
> // quiz - versao inicial
> var quiz_index = 0;
> var quiz_score = 0;
>
> function responder(indice) {
>   var perguntaAtual = perguntas[quiz_index];
>   if (indice == perguntaAtual.r) {
>     quiz_score++;
>     alert('Certo!');
>   } else {
>     alert('Errado! A resposta era: ' + perguntaAtual.ops[perguntaAtual.r]);
>   }
>   quiz_index++;
>   renderizarPergunta();
> }
> ```

### O que a IA retornou

A IA sugeriu encapsular o slideshow dentro de uma IIFE (função auto-invocada) para
isolar o escopo, usar classes CSS com transição para evitar o "pisca-pisca" e
controlar o duplo-clique no quiz com uma variável booleana `respondeu` que bloqueia
novos cliques até o usuário avançar para a próxima pergunta. A IA também recomendou
usar `classList` ao invés de manipular `style.display` diretamente.

### O que foi aceito

- Uso da IIFE para isolar o escopo do slideshow e do quiz — aceito, melhora a organização.
- Controle de duplo-clique com variável `respondeu` — aceito, resolve o bug.
- Transição via classe CSS (`active`) — aceito, elimina o pisca-pisca.
- `clearInterval` antes de reiniciar o autoplay ao clicar em prev/next — aceito.

### O que foi alterado ou rejeitado

- A IA sugeriu usar `setTimeout` em vez de `setInterval` para o autoplay. Rejeitado:
  preferi manter `setInterval` com `clearInterval`, mais simples de entender para o nível do projeto.
- A IA sugeriu um sistema de "debounce" no botão de próxima pergunta. Rejeitado:
  a solução com `respondeu = false/true` já resolve o problema de forma mais direta.

---

## Interação 2

### O que foi solicitado para a IA

> "Meu formulário está usando `alert()` para mostrar que o campo está vazio,
> mas o professor pediu para não usar alert. Preciso mostrar uma mensagem de erro
> embaixo de cada campo que estiver vazio, igual aos formulários de sites
> profissionais. Também precisa validar o formato do e-mail."
>
> Código enviado:
>
> ```javascript
> var form = document.getElementById('cta-form');
> form.addEventListener('submit', function(e) {
>   e.preventDefault();
>   var org = document.getElementById('org').value;
>   var email = document.getElementById('email').value;
>
>   if (org == '' || email == '') {
>     alert('Preencha todos os campos obrigatórios!');
>     return;
>   }
>   if (email.indexOf('@') == -1) {
>     alert('E-mail inválido!');
>     return;
>   }
>
>   alert('Formulário enviado com sucesso!');
> });
> ```

### O que a IA retornou

A IA sugeriu criar funções `mostrarErro(input, mensagem)` e `limparErro(input)` que
manipulam um elemento `<span class="field-error">` inserido dinamicamente dentro do
`.f-row` correspondente a cada input. Para o e-mail, sugeriu usar uma expressão regular
(`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) para validação mais robusta. Também sugeriu substituir
o `alert()` de sucesso por uma mensagem visual inserida no próprio formulário via
`innerHTML`, e que os erros sejam limpos ao usuário começar a digitar no campo.

### O que foi aceito

- Funções `mostrarErro` e `limparErro` com `closest('.f-row')` — aceito, torna o código reutilizável.
- Regex para validar e-mail — aceito, substitui o `indexOf('@')` que era muito fraco.
- Mensagem de sucesso via `innerHTML` no lugar de `alert()` — aceito, experiência muito melhor.
- Limpar erro ao digitar (`input` event listener) — aceito, melhora o feedback em tempo real.

### O que foi alterado ou rejeitado

- A IA gerou um HTML de sucesso com emoji (✅). Rejeitado: troquei por texto simples (✓)
  para manter consistência com o estilo do projeto.
- A IA sugeriu validar também o campo `select` (bioma). Rejeitado: o bioma sempre tem
  um valor padrão selecionado, então não faz sentido validar como campo vazio.
- A IA sugeriu usar `classList.add('submitting')` no botão durante o envio. Rejeitado:
  sem backend real, esse estado não faria diferença visível no projeto estático.
