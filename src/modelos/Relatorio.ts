import Aeronave from './Aeronave';
import * as fs from 'fs';

export default class Relatorio {
    public gerarRelatorio(aeronave: Aeronave, cliente:string) {
        const currentDate: Date = new Date() 
        const formattedDate = currentDate.toLocaleString()
        let dados = 'Cliente: ' + cliente + '\r\nData de entrega: ' + formattedDate + '\r\n'
        const av = '\r\n******** AERONAVE ********\r\n' + 'Código: ' + aeronave.codigo + '\r\nModelo: ' + aeronave.modelo + '\r\nTipo: ' + aeronave.tipo + '\r\nCapacidade: ' + aeronave.capacidade + '\r\nAlcance: ' + aeronave.alcance + '\r\n'
        dados += av
        for (let i = 0; i < aeronave.pecas.length; i++) {
            const pc = aeronave.pecas[i]
            let p = '\n------- Peça ------\r\n' + 'Nome: ' + pc.nome + '\r\nTipo: ' + pc.tipo + '\r\nFornecedor: ' + pc.fornecedor + '\r\nStatus: ' + pc.status + '\r\n'
            dados += p
        }
        for (let i = 0; i < aeronave.etapas.length; i++) {
            const et = aeronave.etapas[i]
            let e = '\n------- Etapas ------\r\n' + 'Nome: ' + et.nome + '\r\nPrazo: ' + et.prazo + '\r\nStatus: ' + et.status + '\r\n'
            dados += e
            for (let c = 0; c < et.funcionarios.length; c++) {
                const fc = et.funcionarios[c]
                let f = '\n- Funcionários '+ et.nome  + ' -\r\n' + 'ID: ' + fc.id + '\r\nNome: ' + fc.nome + '\r\n' + 'Nível de Permissão: ' + fc.nivelPermissao + '\r\n' 
                dados += f
            }
        }
        for (let i = 0; i < aeronave.historicoDeTestes.length; i++) {
            const tt = aeronave.historicoDeTestes[i]
            let t = '\n----- Testes -----\r\n' + 'Tipo: ' + tt.tipo + '\r\nResultado: ' + tt.resultado + '\r\n'
            dados += t
        }
        return dados
    }
    public salvarEmArquivo(a: Aeronave, cliente) {
        const filePath = `../files/relatorios/Aeronave${a.codigo}.txt`
        const dados = this.gerarRelatorio(a, cliente)
        fs.writeFileSync(filePath, dados, 'utf-8')
        console.log(fs.readFileSync(filePath, 'utf-8'))

    }
}