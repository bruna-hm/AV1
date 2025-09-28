export default class Mensagens{
    public listarOpcoes = () => {
        console.log('1 - Cadastrar')
        console.log('2 - Salvar')
        console.log('3 - Carregar')
        console.log('4 - Remover')
    }
    public menu = () => {
        console.log('\n          MENU     ')
        console.log('1 - Gerenciar Aeronave')
        console.log('2 - Gerenciar Peças')
        console.log('3 - Gerenciar Etapa')
        console.log('4 - Gerenciar Funcionário')
        console.log('5 - Gerenciar Teste')
        console.log('6 - Relatórios')
        console.log('7 - Sair')
    }
    public boasVindas = () => {
        console.log('\n          __!__         ') 
        console.log('   ^----o--(_)--o----^  ')
        console.log('  ~~~~~ AeroCode ~~~~~  ')
    }
}   