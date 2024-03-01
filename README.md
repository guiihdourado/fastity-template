# Template NodeJS Fastity
## 📄 Finalidade

> Facilitar a criação de novos projetos já pré-configurados com Fastify, Typescript e PrismaORM, uma estrutura de pastas já definidas e melhor separação do código.

## 🧪 Principais Tecnologias usadas

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Fastity](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)

## 🚀 Como iniciar a aplicação

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalando dependências:
$ yarn

# Criar apartir do .env.example, o arquivo .env
$ copy .env.example .env

# Dentro do arquivo .env, adicione o caminho na variável de ambiente DATABASE_URL
DATABASE_URL="postgresql://postgres:123123@localhost:5432/postgres?schema=public"

# Ainda no arquivo .env, adicione qual porta você quer que o projeto inicie. No exemplo abaixo vai iniciar na porta 3333
PORT=3333

# Rodando em modo de desenvolvimento:
$ yarn dev

O app estará disponível no seu browser pelo endereço http://localhost:3333 assim que iniciado.
```

## Authors

- [@guiihdourado](https://github.com/guiihdourado)