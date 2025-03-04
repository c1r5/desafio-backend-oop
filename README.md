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

## Tasks I

- [X] Arquitetura e Modelagem de Dados
    - [X] USUÁRIO
    - [x] TRANSFERENCIA
- [X] Banco de dados
    - [x] Inserção
    - [X] Deleção
    - [X] Atualização
- [ ] Rotas
    - [X] Cadastro
    - [ ] Login
    - [ ] Atualizar dados
    - [ ] Transferência
    - [ ] Validações
        - [ ] Entradas
        - [ ] Itens das regras de negócio
            - [ ] Lojistas só recebem (transferencias)
            - [ ] Validar se o usuário tem saldo (transferencias)
            - [ ] Consultar um serviço autorizador externo (transferencias)

## Tasks II

- [ ] Notificação ( No pagamento o usuário ou lojista precisa receber notificação )
    - [ ] Processo separado para tentar novamente caso o serviço externo esteja instável
    - [ ] Email
    - [ ] SMS
    - [ ] Transferencias
    - [ ] Verificação de Email | Telefone

## Exemplo de Arquitetura

![](https://github.com/c1r5/desafio-backend/blob/main/images/backend-challenge-arquitetura-inicial.png?raw=true)

## Exemplo de Entity Relationship Diagram

![](https://github.com/c1r5/desafio-backend/blob/main/images/backend-challenge-ERD.png?raw=true)