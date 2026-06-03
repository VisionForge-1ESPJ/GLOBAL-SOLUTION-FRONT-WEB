# OrbiTrack — Roteamento Preditivo Orbital

> Projeto desenvolvido para as disciplinas de **Frontend Design** e **Web Development**  
> Prof. Israel Marques · FIAP · 2026
> 
---

## Sobre o Projeto

O **OrbiTrack** é uma plataforma web que simula um sistema de roteamento preditivo para brigadas de combate a incêndios florestais, utilizando dados orbitais de sensoriamento térmico. O sistema combina dados de satélites como o GOES-19, modelos de propagação de incêndio e malha viária em tempo real para calcular a rota mais rápida e segura até o foco de calor.

---

## Equipe

| Nome | RM |
|------|----|
| Nicolas Belo | RM571063 |
| Leonardo Ursini | RM569812 |
| Gustavo Braga | RM569211 |
| Henry Gabriel | RM570063 |
| Matheus Carvalho | RM569454 |

---

## Funcionalidades implementadas (Web Development)

| Requisito | Implementação |
|-----------|---------------|
| Slideshow com 3 imagens | Slides com visuais CSS de: vigilância orbital, mapa de focos e despacho de brigada |
| Validação de formulário | Mensagens de erro por campo — bloqueia envio com campos vazios ou e-mail inválido |
| Quiz dinâmico com 10 perguntas | Perguntas sobre satélites, incêndios e o sistema OrbiTrack, com feedback imediato |
| Exibição do resultado final | Pontuação, porcentagem de acerto e mensagem personalizada ao terminar o quiz |
| 3 opções de tema de cor | Espaço (padrão), Floresta e Chama — persiste a escolha via localStorage |

---

## Estrutura de arquivos

```
GLOBAL-SOLUTION-FRONT-WEB/
├── index.html              # Página principal
├── equipe.txt              # Integrantes e link do repositório
├── AI.md                   # Registro de uso de IA
├── commit.md               # Histórico de commits comentado
├── readme.md               # Este arquivo
└── src/
    ├── css/
    │   └── style.css       # Estilos globais + slideshow + quiz + temas
    ├── js/
    │   └── script.js       # JavaScript puro (sem frameworks)
    └── pages/
        ├── tecnologia.html
        ├── plataforma.html
        ├── recursos.html
        ├── impacto.html
        └── contato.html
```

---

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (custom properties, grid, flexbox, animações)
- JavaScript puro (ES5/ES6 — sem frameworks)

---

## Como rodar

1. Clone o repositório
2. Abra o arquivo `index.html` diretamente no navegador (não precisa de servidor)

```bash
git clone [URL do repositório]
cd GLOBAL-SOLUTION-FRONT-WEB
# abra index.html no navegador
```

---

## Detalhes do JavaScript

### Slideshow
Troca automática de slides a cada 4 segundos com transição CSS. Controles de prev/next e dots de navegação. Usa `classList` para evitar pisca-pisca.

### Validação do formulário
Funções `mostrarErro()` e `limparErro()` criam e removem mensagens inline abaixo de cada campo. Validação de e-mail via regex. Nenhum `alert()` utilizado.

### Quiz
Array de 10 perguntas renderizado dinamicamente com `innerHTML`. Variável booleana `respondeu` impede duplo clique. Resultado exibido ao final com pontuação e porcentagem.

### Seletor de tema
Aplica `data-theme` no `<body>` e redefine as variáveis CSS. Escolha salva no `localStorage` e restaurada no próximo acesso.

---

## Uso de Inteligência Artificial

Este projeto utilizou IA como ferramenta de apoio ao desenvolvimento JavaScript. Todas as interações estão documentadas no arquivo `AI.md`, conforme exigido pela disciplina, incluindo o que foi solicitado, o que foi retornado e o que foi aceito ou rejeitado.

---

## Repositório GitHub

link após criar na Organização do GitHub

---

© 2026 OrbiTrack · FIAP · Web Development
