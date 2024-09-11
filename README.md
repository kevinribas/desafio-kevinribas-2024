# RECINTOS DO ZOO

## Descrição do Projeto

Este projeto é um sistema para gerenciar a alocação de animais em recintos de um zoológico, garantindo que os animais sejam colocados em recintos adequados de acordo com regras específicas de bioma, espaço disponível e convivência entre espécies.

### Estrutura do Projeto

O projeto foi dividido em três arquivos principais:

1. **[`animal.js`](./src/animal.js)** – Define as características dos animais tratados pelo zoológico.
2. **[`recinto.js`](./src/recinto.js)** – Gerencia a lógica e as verificações dos recintos.
3. **[`recintos-zoo.js`](./src/recintos-zoo.js)** – Função principal que faz a análise dos recintos e verifica quais são viáveis para acomodar novos animais.

### Arquivos

#### 1. `animal.js`
Este arquivo contém a definição dos animais que o zoológico pode acomodar.

- **Estrutura**: Cada animal tem um tamanho, bioma(s) compatível(eis) e uma indicação se é carnívoro ou não.
- **Exemplo**:
  ```js
  static animais = {
    'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
    'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
  };
  ```

#### 2. `recinto.js`
Gerencia a lógica dos recintos. Verifica se um recinto pode acomodar um novo animal com base em:
- **Bioma**: O bioma do recinto deve ser compatível com o do animal.
- **Espaço**: Deve haver espaço suficiente para o novo animal.
- **Carnívoros**: Carnívoros só podem conviver com outros animais da mesma espécie.
- **Macacos**: Um macaco não pode ser colocado sozinho em um recinto vazio.

#### 3. `recintos-zoo.js`
A função principal que verifica os recintos viáveis. Ela organiza os recintos e utiliza as informações de `animal.js` e `recinto.js` para determinar quais recintos podem acomodar um lote de animais.

### Regras de Alocação

1) Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
2) Animais carnívoros devem habitar somente com a própria espécie
3) Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
5) Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
6) Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
7) Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto (eles são muito apegados!).
Por exemplo, se chegar um lote de 12 macacos, não é possível colocar 6 em 2 recintos.

### Erros e Soluções

Durante o desenvolvimento, alguns erros foram encontrados:

1. **Erro `Animal is not defined`**:
   - **Causa**: A classe `Animal` não foi importada corretamente no arquivo `recintos-zoo.js`.
   - **Solução**: Adicionada a importação correta da classe `Animal`.

2. **Recintos incorretos para crocodilos**:
   - **Causa**: Crocodilos eram colocados em recintos com bioma "savana e rio", mas o correto era apenas "rio".
   - **Solução**: Ajustada a regra para que crocodilos prefiram recintos com bioma exclusivamente "rio".

3. **Número incorreto de recintos viáveis para macacos**:
   - **Causa**: Um recinto com um leão foi incluído na lista de recintos viáveis para macacos.
   - **Solução**: Corrigida a lógica para garantir que carnívoros não convivam com outras espécies.

### Testes

O projeto inclui testes unitários utilizando o framework Jest. Para rodar os testes:

```bash
npm test
```

Os testes verificam:
- Se animais inválidos e quantidades inválidas são rejeitados.
- Se a alocação de animais em recintos é feita corretamente.
- Se as regras de bioma, espaço e convivência são respeitadas.

### Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/kevinribas/desafio-kevinribas-2024.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute os testes:
   ```bash
   npm test
   ```

### Conclusão

Este projeto foi estruturado de forma para facilitar a manutenção e a expansão. A lógica principal é isolada em diferentes partes para garantir que cada responsabilidade seja clara e bem definida.

