# Delivery Much Challenge

## Requisitos:

- Docker deve estar instalado
- Docker Compose também deve estar instalado
- Crie um arquivo chamado `.env` no root do projeto

## Arquivo .env

Dentro do arquivo `.env` você deve colocar duas variáveis de ambiente:

```
PORT=3000
GIF_API_KEY=
```

Psiu: eu não sei se você precisa da chave do Giphy, se você precisar ela é essa `qfU2svKBNLHFxF149ErnLXiwrndGJ6lL`, mas essa chave é secreta, então não conta para ninguém ok? Fica só entre nós ;)

## Você está utilizando um sistema unix?

Se sim, primeiramente YEAH, segundamente, verifique se o arquivo `run.sh` encontrado no root do projeto tem permissão de execução, se o arquivo estiver sem permissão basta executar o comando `chmod +x run.sh`

Depois basta executar `./run.sh`

## Não usa unix? :(~

Show de bola, basta executar o comando `docker-compose up --build`

## Pesquisar por receitas

Basta acessar o endereço `http://localhost:3000/recipes?i=`. Nesse parâmetro `i` você pode passar até três ingredientes separados por vírgula. PS: os ingredientes precisam estar em inglês ¯\\\_(ツ)\_/¯.
