# desafio-backend
_Serviços de pagamento simplificado_

## Regras de negocio

### Usuário:
- Nome completo
- CPF / CNPJ
- email
- Senha
---
- _documento e email unicos_.
- _Lojistas só recebem transferências, não enviam dinheiro para ninguém_.
- _Validar se o usuário tem saldo antes da transferência_.
- _Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo, use este mock https://util.devi.tools/api/v2/authorize para simular o serviço utilizando o verbo GET_.
- _A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o dinheiro deve voltar para a carteira do usuário que envia_.
- _No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um serviço de terceiro e eventualmente este serviço pode estar indisponível/instável. Use este mock https://util.devi.tools/api/v1/notify)) para simular o envio da notificação utilizando o verbo POST_.
- _Este serviço deve ser RESTFul._

## Detalhes técnicos
- Linguagem principal: Rust
- Conteinerização: Docker
- Mensageria: ?
- Cache: Redis
- Banco de dados: Postgresql
- Arquitetura: MVC
- Cobertura de testes atual: 0%

## Tasks primárias
- [ ] Arquitetura e Modelagem de Dados
- [ ] Banco de dados
- [ ] Cache
- [ ] Cadastro
- [ ] Login
- [ ] Transferência

## Tasks secundárias
- [ ] Containerização
- [ ] Mensageria
