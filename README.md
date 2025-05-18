# Backend Engineer Test

## Buildar aplicação

```
docker compose build
```

## Subir aplicação
```
docker compose up -d
```

## Teste

1. Enviar requisição POST para o endpoint da aplicação 1 que lê e envia os dados: 'http://localhost:3000/producer/read'

2. Enviar requisição GET para o endpoint da aplicação 2 que retorna os dados dos estados armazenados no banco de dados: 'http://localhost:3001/consumer/states'

Para limpar os dados armazenados pela aplicação 2, utilize o endpoint DELETE 'http://localhost:3001/consumer/states'.