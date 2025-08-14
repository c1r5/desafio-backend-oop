# Desafio Backend - Pagamentos Simplificados

Este projeto oferece um sistema de transferências financeiras entre usuários com autenticação, autorização e notificações.

## Funcionalidades principais

- Cadastro e autenticação de usuários
- Lojistas só recebem pagamentos, não podem transferir
- Validação de saldo antes da transferência
- Autorização via serviço externo antes da transação
- Transferências seguras com rollback em caso de erro
- Notificação por email ou SMS ao receber pagamentos
- API RESTful

## Tecnologias

- Node.js + TypeScript
- PostgreSQL, Redis, Apache Kafka
- Docker
- Arquitetura DDD

## Tasks

### 🟢 Concluído
- Modelagem e banco de dados (Usuário, Transferência)
- Segurança: login, logout, sessão, permissões
- Cadastro e atualização de dados

### 🟡 Em andamento
- Transferência:
    - Verificar saldo
    - Consultar autorizador externo
    - Implementar rollback transacional
    - Enviar notificação (email/SMS)

### 🔴 A fazer
- Integração completa com serviço de notificação externo
- Testes para transferência e notificação
- Refatoração e cobertura de testes (meta: 80%)
- Refatorar aos poucos de OOP para FP.

## Mocks utilizados

- Autorizador externo (GET): https://util.devi.tools/api/v2/authorize
- Serviço de notificação (POST): https://util.devi.tools/api/v1/notify
