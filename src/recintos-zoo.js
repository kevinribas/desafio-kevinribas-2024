import { Animal } from './animal.js'; // Importa a definição dos animais
import { Recinto } from './recinto.js'; // Importa a classe Recinto para gerenciar os recintos

class RecintosZoo {

    constructor() {
        // Armazena os animais disponíveis, conforme definido na classe Animal
        this.animais = Animal.animais;

        // Definição dos recintos existentes no zoológico, com biomas, tamanhos e animais atuais
        this.recintos = [
            new Recinto(1, 'savana', 10, [{ especie: 'MACACO', quantidade: 3 }]),
            new Recinto(2, 'floresta', 5, []),
            new Recinto(3, 'savana e rio', 7, [{ especie: 'GAZELA', quantidade: 1 }]),
            new Recinto(4, 'rio', 8, []),
            new Recinto(5, 'savana', 9, [{ especie: 'LEAO', quantidade: 1 }])
        ];
    }

    // Método principal para analisar quais recintos são viáveis para um animal
    analisaRecintos(animal, quantidade) {
        // Verifica se o animal é válido
        if (!this.animais[animal]) {
            return { erro: 'Animal inválido' };
        }

        // Verifica se a quantidade é válida (deve ser um número inteiro positivo)
        if (!Number.isInteger(quantidade) || quantidade < 1) {
            return { erro: 'Quantidade inválida' };
        }

        const animalInfo = this.animais[animal]; // Obtém as informações do animal
        // Calcula o espaço necessário para os animais, adicionando 1 de espaço extra para grupos maiores
        const espacoNecessario = (animalInfo.tamanho * quantidade) + (quantidade > 1 ? 1 : 0);
        const recintosViaveis = [];

        // Itera sobre todos os recintos disponíveis
        for (const recinto of this.recintos) {
            // Verifica se o recinto pode acomodar o animal
            if (recinto.podeAcomodar(animal, quantidade, animalInfo, espacoNecessario)) {
                const espacoLivre = recinto.espacoRestante(animalInfo.tamanho * quantidade); // Calcula o espaço livre restante após acomodar os animais
                console.log(`Recinto ${recinto.numero} é viável com ${espacoLivre} espaço livre`);
                // Adiciona o recinto à lista de recintos viáveis com suas informações de espaço
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
            } else {
                console.log(`Recinto ${recinto.numero} não é viável`);
            }
        }

        // Retorna os recintos viáveis ou um erro caso nenhum recinto seja adequado
        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: 'Não há recinto viável' };
        }
    }
}

export { RecintosZoo as RecintosZoo };
