# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# Desafio 4

No desafio final você criará uma API REST com AdonisJS para um sistema de agendamentos de compromissos (calendário). Deixe toda estrutura com ESLint, EditorConfig, etc, que configuramos até agora pronta.

## Requisitos funcionais

 - O usuário deve poder criar uma conta com nome, e-mail e senha; 
 - O usuário deve poder se autenticar na aplicação com e-mail e senha;
 - O usuário deve poder alterar seu nome e senha informando a senha antiga, a senha nova e a confirmação da senha nova;
 - O usuário deve poder cadastrar eventos em seu calendário com título, localização, data e horário;
 - O usuário deve poder listar os eventos cadastrados por data;
 - O usuário deve poder excluir um compromisso;
 - O uário deve poder compartilhar um compromisso informando o e-mail do destinatário. Assim que compartilhado, o destinatário    deve receber todas informações do evento por e-mail;
 
 
## Requisitos não funcionais

 - Utilize banco de dados SQL;
 - Utilize fila com Redis para programar o envio de e-mails do compartilhamento de compromisso;
 
## Regras de negócio
 - O e-mail do usuário é único;
 - O usuário não pode alterar seu e-mail;
 - Não deve ser possível cadastrar dois eventos no mesmo horário no calendário de um usuário;
 - O usuário só pode ver/editar/deletar seus eventos;
 - O usuário não pode editar/deletar um evento que já passou;
 - Todos cadastros devem possuir validação de campos com mensagens legíveis;
