
class Animal {
    // Estrutura estática que define as características de cada animal
    // Cada animal tem um tamanho, bioma(s) compatível(eis) e se é carnívoro ou não.
    static animais = {
        'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
        'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
        'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
        'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
        'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    };
}

// Exporta a classe Animal para ser usada em outros arquivos
export { Animal };
