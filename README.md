# Distribar

Site de lançamento da **Distribar** — distribuidora de bebidas com e sem álcool.

## Sobre o projeto

Landing page responsiva para apresentação da marca, portfólio de produtos, parceiros e canal de contato. Desenvolvida em HTML, CSS e JavaScript puro, sem dependências de build.

### Funcionalidades

- Hero com estatísticas e mascote da marca
- Seção **Quem somos** com cards de diferenciais
- **9 categorias** de produtos: cervejas, energéticos, ice's, vodkas, whiskys, Keep Cooler, vinhos, espumantes e licores
- Carrossel interativo de **marcas parceiras** (logos SVG)
- **Cardápio interativo** com quantidade (+/−), preços e subtotal
- Formulário de contato e botão WhatsApp
- Gradientes animados no scroll e header laranja ao rolar
- Design mobile-first

## Estrutura

```
Projeto-Distribar/
├── index.html          # Página principal
├── css/styles.css      # Estilos e design system
├── js/main.js          # Interações e cardápio
└── assets/             # Logo, favicon, imagens e marcas SVG
```

## Como executar localmente

Abra o `index.html` no navegador ou use um servidor estático:

```bash
npx serve .
```

Para acesso na rede local (outros dispositivos):

```bash
npx serve -l tcp://0.0.0.0:8080 .
```

## Personalização

- **Contato:** atualize telefone, e-mail e link do WhatsApp em `index.html`
- **Preços do cardápio:** edite `data-price` nos itens do modal em `index.html`
- **Marcas:** logos SVG em `assets/marcas/`

## Licença

Projeto privado — Distribar © 2026
