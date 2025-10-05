import * as fs from 'fs';
import Aeronave from './Aeronave';
import { testes } from '../fileUtils/utils';

export enum TipoTeste {
    ELETRICO = "ELETRICO",
    HIDRAULICO = "HIDRAULICO",
    AERODINAMICO = "AERODINAMICO"
}

export enum ResultadoTeste {
    APROVADO = "APROVADO",
    REPROVADO = "REPROVADO"
}

export default class Teste {
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo
        this.resultado = resultado
    }
    public salvar(a: Aeronave) {
        const dados = JSON.stringify(this, null, 2)
        if (fs.existsSync(this.filePath(a))) {
            console.log('\nTeste já existe')
        } else {
            fs.writeFileSync(this.filePath(a), dados, 'utf-8')
            console.log('\nTeste SALVADA')
        }
    }
    public static carregar(a, tipo) {
        if (`../files/testes/${a}${tipo}.txt`) {
            const fl = fs.readFileSync(`../files/testes/${a}${tipo}.txt`, 'utf-8')
            const atributos = JSON.parse(fl)
            testes.push(new Teste(atributos.tipo, atributos.resultado))
            console.log("\nTeste CARREGADO")
        } else {
            console.log("\nTeste não encontrado")
        }
    }
    public remover(a: Aeronave) {
        const av = a.historicoDeTestes.findIndex((t) => this.tipo === t.tipo)
        if (fs.existsSync(this.filePath(a))) {
            fs.unlinkSync(this.filePath(a))
            console.log("\nArquivo do Teste REMOVIDO")
            if (av) {
                a.historicoDeTestes.splice(av, 1)
                console.log("\nTeste REMOVIDO da Aeronave")
            }
        } else {
            console.log("\nTeste não encontrado")
        }
    }
    private filePath(a: Aeronave) {
        return `../files/testes/${a.codigo}${this.tipo}.txt`
    }
}
