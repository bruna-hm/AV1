import * as fs from 'fs';
import { funcionarios } from '../fileUtils/utils';

export enum NivelPermissao {
    ADMINISTRADOR = "ADMINISTRADOR",
    ENGENHEIRO = "ENGENHEIRO",
    OPERADOR = "OPERADOR"
}

export default class Funcionario {
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    nivelPermissao: NivelPermissao
    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }
    public autenticarUsuario(usuario: string, senha: string): boolean {
        if ((usuario === this.usuario && senha === this.senha)) {
            return true
        } else {
            return false
        }
    }
    public salvar() {
        const dados = JSON.stringify(this, null, 2)
        if (fs.existsSync(this.filePath())) {
            console.log('\nFuncionário já existe')
        } else {
            fs.writeFileSync(this.filePath(), dados, 'utf-8')
            console.log('\nFuncionário SALVADO')
        }
    }
    public static carregar(f, nome) {
        if (`../files/funcionarios/${f}${nome}.txt`) {
            const fl = fs.readFileSync(`../files/funcionarios/${f}${nome}.txt`, 'utf-8')
            const atributos = JSON.parse(fl)
            funcionarios.push(new Funcionario(atributos.id, atributos.nome, atributos.telefone, atributos.endereco, atributos.usuario, atributos.sennha, atributos.nivel))
            console.log("\nFuncionário CARREGADO")
        } else {
            console.log("\nFuncionário não encontrado")
        }
    }
    public remover() {
        const fc = funcionarios.findIndex((f) => f.id === this.id)
        if (fs.existsSync(this.filePath())) {
            fs.unlinkSync(this.filePath())
            console.log("\nArquivo do Funcionário REMOVIDO")
        } if (fc) {
            funcionarios.splice(fc, 1)
            console.log("\Funcionário REMOVIDO")
        } else {
            console.log("\Funcionário não encontrado")
        }
    }
    private filePath() {
        return `../files/funcionarios/${this.id}${this.nome}.txt`
    }
}