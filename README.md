# Time Control

## Sobre o Projeto
Time Control é um sistema desenvolvido para facilitar o gerenciamento e controle de horas trabalhadas por cliente. Esta ferramenta é ideal para profissionais autônomos, freelancers e prestadores de serviço que precisam manter um registro organizado do tempo dedicado a cada cliente.

## Funcionalidades Principais

### Cadastro de Clientes
- Gerenciamento completo de clientes
- Armazenamento de informações essenciais dos clientes
- Interface intuitiva para adicionar, editar e visualizar clientes

### Registro de Horas
- Registro detalhado de horas trabalhadas
- Associação de registros a clientes específicos
- Controle de data e duração das atividades
- Acompanhamento mensal do tempo dedicado por cliente

## Tecnologias Utilizadas
- **Framework**: Nuxt 3
- **UI Framework**: Nuxt UI 3
- **Estilização**: TailwindCSS
- **Linguagem**: TypeScript
- **Testes E2E**: Playwright (planejado)

## Estrutura do Projeto
```
app/
  ├── modules/           # Módulos da aplicação
  │   ├── [module]/     # Módulo específico
  │   │   ├── components/
  │   │   ├── composables/
  │   │   └── screens/
  ├── components/       # Componentes globais
  ├── composables/      # Composables globais
  └── layouts/         # Layouts da aplicação
```

## Princípios de Desenvolvimento
- Arquitetura modular
- Componentes reutilizáveis
- Código limpo e bem documentado
- Testes unitários para funcionalidades críticas
- Princípios SOLID e Clean Code

## Próximos Passos
- [ ] Implementação de testes E2E com Playwright
- [ ] Relatórios mensais
- [ ] Dashboard com métricas
- [ ] Exportação de dados
- [ ] Categorização de atividades
- [ ] Múltiplos formatos de relatórios

## Como Executar o Projeto

1. Clone o repositório
```bash
git clone [url-do-repositório]
```

2. Instale as dependências
```bash
pnpm install
```

3. Execute o projeto em modo de desenvolvimento
```bash
pnpm dev
```

4. Para build de produção
```bash
pnpm build
```

## Testes
Os testes end-to-end (E2E) serão implementados utilizando Playwright, permitindo:
- Testes automatizados de fluxos completos da aplicação
- Validação da interface do usuário
- Testes em múltiplos navegadores
- Captura de screenshots e vídeos dos testes

> Nota: A implementação dos testes está planejada e será desenvolvida em breve.

## Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
