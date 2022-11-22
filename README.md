# Trybe-futebol-clube
> A ideia do projeto é criar uma aplicação full-stack onde o usuário consiga fazer login, buscar por partidas e acompanhar os resultados dos jogos. A aplicação front-end simula uma tabela de brasileirão, e a parte de back-end tem as rotas necessárias para alterar os status da partidas, fazer buscas por melhor mandante, melhor visitante, classificação geral, buscar jogos em andamento, terminados, e todos os jogos. A parte de front-end foi desenvolvida pela Trybe.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] trazer um gif da aplicação funcionando
- [ ] implementar swagger
- [ ] implementar testes no front-end

### Tecnologias utilizadas:

- TypeScript
- Sequelize
- express
- jwt
- POO
- chai/sinon/mocha para aplicar os testes
- Docker

### Desafios

Realizar toda a parte do back-end usando arquitetura MSC(), aplicando SOLID e POO, usando express e testar de forma unitária 100% da aplicação. 

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.15.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16 --lts`
    - `nvm use 16`
    - `nvm alias default 16`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/course/back-end/docker/orquestrando-containers-com-docker-compose/6e8afaef-566a-47f2-9246-d3700db7a56a/conteudo/0006a231-1a10-48a2-ac82-9e03e205a231/instalacao/abe40727-6310-4ad8-bde6-fd1e919dadc0?use_case=side_bar);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>

<details>
<summary><strong>Rodando o projeto na sua máquina</strong></summary><br />

 ```
 git clone git@github.com:Rafael-Friedel/trybe-futebol-clube.git
 ```
 
 
 ```
 cd trybe-futebol-clube && npm run compose:up
 ```

 ```
 docker start app-frontend-1 app_backend db
 ```
 
 Para conferir a aplicação front-end basta acessar no seu navegador:
 ```
 http://localhost:3000/
 ```
 
 Para conferir a aplicação back-end basta acessar no seu navegador:
 ```
 http://localhost:3001/
 ```
</details>
