import { Animal } from './animal.js'; // Importa as informações dos animais

class Recinto {

    constructor(numero, bioma, tamanho, animais = []) {
        // Inicializa os atributos do recinto: número, bioma, tamanho total e animais presentes
        this.numero = numero;
        this.bioma = bioma.split(' e '); // Divide biomas compostos em uma lista (ex: 'savana e rio')
        this.tamanho = tamanho;
        this.animais = animais; // Lista de animais já presentes no recinto
    }

    // Verifica se o recinto pode acomodar um novo lote de animais
    podeAcomodar(animal, quantidade, animalInfo, espacoNecessario) {
        // Calcula o espaço ocupado pelos animais já presentes no recinto
        let espacoOcupado = this.animais.reduce((total, a) => total + (a.quantidade * Animal.animais[a.especie].tamanho), 0);
        const carnívorosNoRecinto = this.animais.some(a => Animal.animais[a.especie].carnivoro);

        // Verifica se o bioma do recinto é compatível com o bioma do animal
        if (!animalInfo.bioma.some(b => this.bioma.includes(b))) {
            return false;
        }

        // Regra para crocodilos: preferem biomas exclusivamente "rio"
        if (animal === 'CROCODILO' && this.bioma.length > 1 && this.bioma.includes('rio')) {
            return false;
        }

        // Verifica se o recinto já contém carnívoros diferentes do animal que está sendo adicionado
        if (animalInfo.carnivoro && this.animais.length > 0 && carnívorosNoRecinto && this.animais[0].especie !== animal) {
            return false;
        }

        // Evita que herbívoros sejam colocados em recintos com carnívoros
        if (!animalInfo.carnivoro && carnívorosNoRecinto) {
            return false;
        }

        // Regra especial para macacos: não podem ficar sozinhos em recintos vazios
        if (animal === 'MACACO' && quantidade === 1 && this.animais.length === 0) {
            return false;
        }

        espacoOcupado += espacoNecessario; // Adiciona o espaço necessário para o novo lote de animais

        // Se há mais de uma espécie no recinto, adiciona 1 de espaço extra
        if (this.animais.length > 0 && this.animais[0].especie !== animal) {
            espacoOcupado += 1;
        }

        // Verifica se o recinto tem espaço suficiente
        return espacoOcupado <= this.tamanho;
    }

    // Calcula o espaço restante no recinto após a adição de novos animais
    espacoRestante(espacoNovoAnimal) {
        let espacoOcupado = this.animais.reduce((total, a) => total + (Animal.animais[a.especie].tamanho * a.quantidade), 0);
        espacoOcupado += espacoNovoAnimal;
        // Se há mais de uma espécie, adiciona o espaço extra
        if (this.animais.length > 0 && this.animais[0].especie !== 'MACACO') {
            espacoOcupado += 1;
        }
        return this.tamanho - espacoOcupado; // Retorna o espaço livre no recinto
    }
}

export { Recinto };
