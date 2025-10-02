import * as readline from 'readline'
import * as fs from 'fs';
import Aeronave, { TipoAeronave } from '../modelos/Aeronave'
import Peca, { StatusPeca, TipoPeca } from '../modelos/Peca'
import Funcionario, { NivelPermissao } from '../modelos/Funcionario'
import Etapa, { StatusEtapa } from '../modelos/Etapa';
import Teste, { ResultadoTeste, TipoTeste } from '../modelos/Teste';
import Relatorio from '../modelos/Relatorio';
import { menuA, menuE, menuF, menuP, menuT } from '../fileUtils/SubMenus';


export const aeronaves: Aeronave[] = [];
export const pecas: Peca[] = [];
export const funcionarios: Funcionario[] = [];
export const etapas: Etapa[] = [];
export const testes: Teste[] = [];
export const relatorios: Relatorio[] = [];


export const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


export function caseA(msg: string, callback: (a: Aeronave) => void) {
    leitor.question(msg, (cod: string) => {
        let a = aeronaves.find(av => av.codigo === cod);
        if (a) {
            callback(a);
        } else {
            console.log("\nAeronave não encontrada.");
            menuA()
        }
    });
}

export function caseP(msg: string, callback: (p: Peca) => void) {
    leitor.question(msg, (n: string) => {
        let p = pecas.find(pc => pc.nome === n);
        if (p) {
            callback(p);
        } else {
            console.log("\nPeça não encontrada.");
            menuP()
        }
    });
}

export function caseE(msg: string, callback: (e: Etapa) => void) {
    leitor.question(msg, (n: string) => {
        let e = etapas.find(et => et.nome === n);
        if (e) {
            callback(e);
        } else {
            console.log("\nEtapa não encontrada.");
            menuE()
        }
    });
}

export function caseF(msg: string, callback: (f: Funcionario) => void) {
    leitor.question(msg, (i: string) => {
        let f = funcionarios.find(fc => fc.id === i);
        if (f) {
            callback(f);
        } else {
            console.log("\nFuncionário não encontrada.");
            menuF()
        }
    });
}

export function caseT(msg: string, callback: (tt: Teste) => void) {
    leitor.question(msg, (tp: string) => {
        let t = testes.find(t => t.tipo === tp);
        if (t) {
            callback(t);
        } else {
            console.log("\nTeste não encontrada.");
            menuT()
        }
    });
}

export function validarCdg(codigo){
    leitor.question("\nCódigo: ", (cdg: string) => {
        const vld = aeronaves.some(c => c.codigo === cdg)
        const vldTxt = fs.existsSync(`../files/aeronaves/aeronave${cdg}.txt`)
        if (vld || vldTxt) {
            console.log("\nAeronave já existe! Digite outro código.")
            validarCdg(codigo)
        } else {
            codigo(cdg)
        }
    })
}

export function enTpAeronave(tp){
    leitor.question("Tipo da Aeronave(COMERCIAL / MILITAR): ", (tipo) => {
        if (tipo.toUpperCase() == 'COMERCIAL') {
            tipo = TipoAeronave.COMERCIAL
            tp(tipo)
        } else if (tipo.toUpperCase() == "MILITAR") {
            tipo = TipoAeronave.MILITAR
            tp(tipo)
        } else {
            console.log("\nTipo digitado INVÁLIDO!\n")
            enTpAeronave(tp)
        }
    })
}

export function enTpPeca(peca){
    leitor.question("Tipo(NACIONAL / IMPORTADA): ", (tipo) => {
        if (tipo.toUpperCase() == "NACIONAL"){
            tipo = TipoPeca.NACIONAL
            peca(tipo)
        } else if (tipo.toUpperCase() == "IMPORTADA") {
            tipo = TipoPeca.IMPORTADA
            peca(tipo)
        } else {
            console.log("\nTipo digitado INVÁLIDO!\n")
            enTpPeca(peca)
        }
    })
}

export function enStPeca(peca) {
    leitor.question("Status(EM_PRODUCAO / EM_TRANSPORTE / PRONTA): ", (status) => {
        if (status.toUpperCase() == "EM PRODUCAO") {
            status = StatusPeca.EM_PRODUCAO
            peca(status)
        } else if (status.toUpperCase() == "EM TRANSPORTE") {
            status = StatusPeca.EM_TRANSPORTE
            peca(status)
        }else if (status.toUpperCase() == "PRONTA") {
            status = StatusPeca.PRONTA
            peca(status)
        } else {
            console.log("\nStatus digitado INVÁLIDO!\n")
            enStPeca(peca)
        }
    })
} 

export function enStEtapa(etapa) {
    leitor.question("Status(PENDENTE / ANDAMENTO / CONCLUIDA): ", (status) => {
        if (status.toUpperCase() == "PENDENTE") {
            status = StatusEtapa.PENDENTE
            etapa(status)
        } else if (status.toUpperCase() == "ANDAMENTO") {
            status = StatusEtapa.ANDAMENTO
            etapa(status)
        } else if (status.toUpperCase() == "CONCLUIDA") {
            status = StatusEtapa.CONCLUIDA
            etapa(status)
        } else {
            console.log("\nStatus digitado INVÁLIDO!\n")
            enStEtapa(etapa)
        }
    })
}

export function enNvPerm(funcionario) {
    leitor.question("Nivel de permissão(ADMINISTRADOR / ENGENHEIRO / OPERADOR): ", (nivel) => {
        if (nivel.toUpperCase() == "ADMINISTRADOR") {
            nivel = NivelPermissao.ADMINISTRADOR
            funcionario(nivel)
        } else if (nivel.toUpperCase() == "ENGENHEIRO") {
            nivel = NivelPermissao.ENGENHEIRO
            funcionario(nivel)
        } else if (nivel.toUpperCase() == "OPERADOR") {
            nivel = NivelPermissao.OPERADOR
            funcionario(nivel)
        } else {
            console.log("\nNível de Permissão digitado INVÁLIDO!\n")
            enNvPerm(nivel)
        }
    })
}

export function enTpTeste(tipo) {
    leitor.question("\nDigite o tipo(ELETRICO, HIDRAULICO, AERODINAMICO): ", (tp) => {
        if (tp.toUpperCase() == "ELETRICO") {
            tp = TipoTeste.ELETRICO
            tipo(tp)
        } else if (tp.toUpperCase() == "HIDRAULICO") {
            tp = TipoTeste.HIDRAULICO
            tipo(tp)
        } else if (tp.toUpperCase() == "AERODINAMICO") {
            tp = TipoTeste.AERODINAMICO
            tipo(tp)
        } else {
            console.log("\nTipo de Teste digitado INVÁLIDO!\n")
            enTpTeste(tipo)
        }
    })
}

export function enRsTeste(resultado) {
    leitor.question("Digite o resultado(APROVADO, REPROVADO): ", (rlt) => {
        if (rlt.toUpperCase() == "APROVADO") {
            rlt = ResultadoTeste.APROVADO
            resultado(rlt)
        } else if (rlt.toUpperCase() == "REPROVADO") {
            rlt = ResultadoTeste.REPROVADO
            resultado(rlt)
        } else {
            console.log("\nResultdo digitado INVÁLIDO!\n")
            enRsTeste(resultado)
        }
    })
}