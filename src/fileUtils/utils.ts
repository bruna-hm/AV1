import * as readline from 'readline'
import Aeronave from '../modelos/Aeronave'
import Peca from '../modelos/Peca'
import Funcionario from '../modelos/Funcionario'
import Etapa from '../modelos/Etapa';
import Teste from '../modelos/Teste';
import Relatorio from '../modelos/Relatorio';
import { menuA, menuE, menuF, menuP, menuT } from '../fileUtils/SubMenus';

//Listas
export const aeronaves: Aeronave[] = [];
export const pecas: Peca[] = [];
export const funcionarios: Funcionario[] = [];
export const etapas: Etapa[] = [];
export const testes: Teste[] = [];
export const relatorios: Relatorio[] = [];

//Leitor
export const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Funções pra encontrar nas listas compartilhadas
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
            console.log("\nEtapa não encontrada.");
            menuT()
        }
    });
}