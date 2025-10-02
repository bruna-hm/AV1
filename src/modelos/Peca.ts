import * as fs from 'fs';
import Aeronave from './Aeronave';
import { pecas } from '../fileUtils/utils';

export enum TipoPeca {
    NACIONAL = "NACIONAL",
    IMPORTADA = "IMPORTADA"
}

export enum StatusPeca {
    EM_PRODUCAO = "EM PRODUCAO",
    EM_TRANSPORTE = "EM TRANSPORTE",
    PRONTA = "PRONTA"
}

export default class Peca {
    public nome: string
    public tipo: TipoPeca
    public fornecedor: string
    public status: StatusPeca
    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }
    public atualizarStatus(novoStatus: StatusPeca, a: Aeronave) {
        const pc = a.pecas.find((p) => this.nome === p.nome)
        if (fs.existsSync(this.filePath(a))) {
            const dados = JSON.stringify(this, null, 2)
            fs.writeFileSync(this.filePath(a), dados)
            console.log('\Status da Peça ATUALIZADO no arquivo')
        } if (pc) {
            pc.status = novoStatus
            console.log('\nStatus da Peça ATUALIZADO')
        }
    }
    public salvar(a: Aeronave) {
        const dados = JSON.stringify(this, null, 2)
        if (fs.existsSync(this.filePath(a))) {
            console.log('\nPeça já existe')
        } else {
            fs.writeFileSync(this.filePath(a), dados, 'utf-8')
            console.log('\nPeça SALVADA')
        }
    }
    public static carregar(nome, codigo) {
        if (fs.existsSync(`../files/pecas/${nome}${codigo}.txt`)) {
            const fl = fs.readFileSync(`../files/pecas/${nome}${codigo}.txt`, 'utf-8')
            const atributos = JSON.parse(fl)
            pecas.push(new Peca(atributos.nome, atributos.tipo, atributos.fornecedor, atributos.status))
            console.log("\nPeça CARREGADA")
        } else {
            console.log("\nPeça não econtrada")
        }
    }
    public remover(a: Aeronave) {
        const pc = a.pecas.findIndex((p) => this.nome === p.nome)
        if (fs.existsSync(this.filePath(a))) {
            fs.unlinkSync(this.filePath(a))
            console.log("\nArquivo da Peça REMOVIDO")
            if (pc) {
                a.pecas.splice(pc, 1)
                console.log("\nPeça REMOVIDA da Aeronave")
            }
        } else {
            console.log("\nPeça não encontrada")
        }
    }
    private filePath(a: Aeronave) {
        return `../files/pecas/${this.nome}${a.codigo}.txt`
    }
}