![](https://img.shields.io/github/last-commit/Leonardocpn/Next-Level-Week.svg?color=red)
![](https://img.shields.io/github/languages/top/Leonardocpn/Next-Level-Week.svg?color=yellow)
![](https://img.shields.io/github/languages/count/Leonardocpn/Next-Level-Week.svg?color=lightgrey)
![](https://img.shields.io/github/languages/code-size/Leonardocpn/Next-Level-Week.svg)
![](https://img.shields.io/github/repo-size/Leonardocpn/Next-Level-Week?color=blueviolet)
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

# Projeto Ecoleta da Next Level Week

Minha implementação do projeto Ecoleta, um sistema de ajuda para encontrar e cadastrar pontos
de coleta de diferente resíduos.

- Frontend com React e Typescript
- Backend com Node.js, Typescript e SQLite como banco de dados
- Mobile com o Expo
- Testes com Jest

## Executando a Aplicação:

```sh
  # Instale as dependências
  $ npm install

  ## Crie o banco de dados
  $ cd server
  $ npm run knex:migrate
  $ npm run knex:seed

  # Inicie a API
  $ npm run dev

  # Inicie a aplicação web
  $ cd web
  $ npm start

  # Inicie a aplicação mobile
  $ cd mobile
  $ npm start
```

OBS:

- É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado na máquina
- Também, é **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
- Por fim, é **essencial** ter o **[Expo](https://expo.io/)** instalado de forma global na máquina

## Resultado

<h1 align="center">
    <img alt="Home Web" src="assets/home-web.png" width="900px">
</h1>

<h1 align="center">
    <img alt="Cadastro Web" src="assets/cadastro-web.png" width="900px">
</h1>

<h1 align="center">
    <img alt="Cadastro Web" src="assets/cadastro-web2.png" width="900px">
</h1>

<h1 align="center">
    <img alt="Home Mobile" src="assets/home-mobile.jpg" width="900px">
</h1>

<h1 align="center">
    <img alt="Ponto Mobile" src="assets/ponto-mobile.jpg" width="900px">
</h1>

## Cobertura dos testes

<h1 align="center">
    <img alt="Cobertura Teste" src="assets/test_coverage.png" width="900px">
</h1>
