# desafio-backend

_Serviços de pagamento simplificado_

## Regras de negocio

---

1. _documento e email unicos_.
2. _Lojistas só recebem transferências, não enviam dinheiro para ninguém_.
3. _Validar se o usuário tem saldo antes da transferência_.
4. _Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo, use este
   mock https://util.devi.tools/api/v2/authorize para simular o serviço utilizando o verbo GET_.
5. _A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o
   dinheiro deve voltar para a carteira do usuário que envia_.
6. _No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um
   serviço de terceiro e eventualmente este serviço pode estar indisponível/instável. Use este
   mock https://util.devi.tools/api/v1/notify para simular o envio da notificação utilizando o verbo POST_.
7. _Este serviço deve ser RESTFul._

## Detalhes técnicos

- Linguagem principal: Node | Typescript
- Conteinerização: Docker
- Mensageria: Apache Kafka
- Cache: Redis
- Banco de dados: Postgresql
- Arquitetura: DDD
- Cobertura de testes atual: 0%

## Tasks

- [X] Arquitetura e Modelagem de Dados
    - [X] USUÁRIO
    - [x] TRANSFERENCIA
- [X] Banco de dados
    - [x] Inserção
    - [X] Deleção
    - [X] Atualização
- [ ] Features
    - [X] Segurança
        - [X] Autenticação
            - [X] Login
                - [X] Testes: Login com credenciais válidas retorna token, credenciais inválidas retorna erro
                - [X] Implementar JWT (geração e validação de tokens)
            - [X] Refatorar
                - [X] Testes: Validando entradas do usuário
                - [X] Validar entradas com Zod
        - [X] Logout
            - [X] Testes: Realizar logout e verificar se a sessão foi revogada
            - [X] Armazenar sessão no banco de dados
            - [X] Definir ID da sessão no JWT
            - [X] Revogar sessão
        - [X] Autorização
            - [X] Testes: Usuário sem permissão é bloqueado de realizar operações na aplicação
            - [X] Middle ware para validar o JWT
            - [X] Definir permissões
                - [X] Usuários devem estar com sessão ativa acessar a aplicação
                - [X] Usuários devem estar com status ativos para realizar operações:
                    - Transferir
                    - Receber
                    - Adicionar outras formas de pagamento
                - [X] Lojistas não podem realizar pagamentos
    - [X] Cadastro
        - [X] Testes: Cadastro bem-sucedido retorna 201, email e documento duplicados retorna erro
        - [X] Criar usuário básico (nome, documento, telefone, email, senha)
    - [X] Atualizar dados
        - [X] usuários inativos podem apenas mudar o telefone e email para verificação
    - [ ] Transferência
    - [ ] Notificação
        - [ ] Email
        - [ ] SMS

## Exemplo de Arquitetura

![](https://github.com/c1r5/desafio-backend/blob/main/images/backend-challenge-arquitetura-inicial.png?raw=true)

## Exemplo de Entity Relationship Diagram

![](https://github.com/c1r5/desafio-backend/blob/main/images/backend-challenge-ERD.png?raw=true)