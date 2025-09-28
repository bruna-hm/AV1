import { leitor, aeronaves, pecas, funcionarios, etapas, testes, relatorios, caseA, caseP, caseE, caseF, caseT } from '../fileUtils/utils'
import Aeronave from '../modelos/Aeronave'
import { TipoAeronave } from '../modelos/Aeronave'
import Peca from '../modelos/Peca'
import { TipoPeca, StatusPeca } from '../modelos/Peca'
import Etapa from '../modelos/Etapa'
import { StatusEtapa } from '../modelos/Etapa'
import Teste from '../modelos/Teste'
import { ResultadoTeste, TipoTeste } from '../modelos/Teste'
import { iniciar } from '../app/main'
import Mensagens from '../fileUtils/Mensagem'
import Funcionario, { NivelPermissao } from '../modelos/Funcionario'
import Relatorio from '../modelos/Relatorio'

let msg = new Mensagens()

export function menuA() {
    console.log("\n--- AERONAVE ---")
    msg.listarOpcoes()
    console.log("5 - Detalhes")
    console.log('6 - Voltar ao Menu Principal')

    leitor.question("\nDigite a opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                leitor.question("\nCódigo: ", (codigo) => {
                    leitor.question("Modelo: ", (modelo) => {
                        leitor.question("Tipo(COMERCIAL / MILITAR): ", (tipo) => {
                            leitor.question("Capacidade: ", (capacidade) => {
                                leitor.question("Alcance: ", (alcance) => {
                                    let novaA = new Aeronave(codigo, modelo, tipo.toUpperCase() as TipoAeronave, Number(capacidade), Number(alcance), [], [], [])
                                    aeronaves.push(novaA)
                                    console.log("\nAeronave CADASTRADA")
                                    menuA()
                                })
                            })
                        })
                    })
                })
                break;
            case "2":
                caseA("\nDigite o código da Aeronave: ", (a: Aeronave) => {
                    a.salvar()
                    menuA()
                })
                break;
            case "3":
                caseA("\nDigite o código da Aeronave: ", (a: Aeronave) => {
                    a.carregar()
                    menuA()
                })
                break;
            case "4":
                caseA("\nDigite o código da Aeronave: ", (a: Aeronave) => {
                    a.remover()
                    menuA()
                })
                break;
            case "5":
                caseA("\nDigite o código da Aeronave: ", (a: Aeronave) => {
                    a.detalhes()
                    menuA()
                })
                break;
            case "6":
                iniciar()
                break;
            default:
                menuA()
        }
    })
}

export function menuP() {
    console.log("\n--- Peça ---")
    msg.listarOpcoes()
    console.log('5 - Atualizar Status')
    console.log('6 - Voltar ao Menu Principal')

    leitor.question("\nDigite a opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                leitor.question("\nNome: ", (nome) => {
                    leitor.question("Tipo(NACIONAL / IMPORTADA): ", (tipo) => {
                        leitor.question("Fornecedor: ", (fornecedor) => {
                            leitor.question("Status(EM_PRODUCAO / EM_TRANSPORTE / PRONTA): ", (status) => {
                                let novaP = new Peca(nome, tipo as TipoPeca, fornecedor, status.toUpperCase() as StatusPeca)
                                pecas.push(novaP)
                                caseA("Digite o código da Aeronave associada: ", (c) => {
                                    c.pecas.push(novaP)
                                    console.log("\nPeça CADASTRADA")
                                    menuP()
                                })
                            })
                        })
                    })
                })
                break;
            case "2":
                caseP("\nDigite o nome da peça: ", (p: Peca) => {
                    caseA("Digite o código da Aeronave associada: ", (c) => {
                        p.salvar(c)
                        menuP()
                    })
                })
                break;
            case "3":
                caseP("\nDigite o nome da peça: ", (p: Peca) => {
                    caseA("Digite o código da Aeronave associada: ", (c) => {
                        p.carregar(c)
                        menuP()
                    })
                })
                break;
            case "4":
                caseP("\nDigite o nome da peça: ", (p: Peca) => {
                    caseA("Digite o código da Aeronave associada: ", (c) => {
                        p.remover(c)
                        menuP()
                    })
                })
                break;
            case "5":
                caseP("\nDigite o nome da peça: ", (p: Peca) => {
                    caseA("Digite o código da Aeronave associada: ", (c) => {
                        leitor.question("Digite o novo status(EM_PRODUCAO, EM_TRANSPORTE, PRONTA): ", (s) => {
                            p.atualizarStatus(s.toUpperCase() as StatusPeca, c)
                            menuP()
                        })
                    })
                })
                break;
            case "6":
                iniciar()
                break;
            default:
                menuP()
        }
    })
}

export function menuE() {
    console.log("\n--- Etapa ---")
    console.log("1 - Cadastrar")
    console.log("2 - Iniciar")
    console.log("3 - Finalizar")
    console.log("4 - Associar Funcionários")
    console.log("5 - Visualizar Funcionários")
    console.log("6 - Voltar ao Menu Principal")
    leitor.question("\nDigite a opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                leitor.question("\nNome: ", (nome) => {
                    leitor.question("Prazo: ", (prazo) => {
                        leitor.question("Status(PENDENTE / ANDAMENTO / CONCLUIDA): ", (status) => {
                            let novaE = new Etapa(nome, prazo, status.toUpperCase() as StatusEtapa, [])
                            etapas.push(novaE)
                            caseA("Digite o código da Aeronava associada: ", (c) => {
                                c.etapas.push(novaE)
                                console.log("\nEtapa CADASTRADA")
                                menuE()
                            })
                        })
                    })
                })
                break;
            case "2":
                caseE("\nDigite o nome da Etapa: ", (n) => {
                    n.iniciar()
                    menuE()
                })
                break;
            case "3":
                caseE("\nDigite o nome da Etapa: ", (n) => {
                    n.finalizar()
                    menuE()
                })
                break;
            case "4":
                caseE("\nDigite o nome da Etapa: ", (n) => {
                    caseF("Digite a ID do funcionário: ", (i) => {
                        n.associarFuncionario(i)
                        menuE()
                    })
                })
                break;
            case "5":
                caseE("\nDigite o nome da Etapa: ", (n) => {
                    console.log(n.listaFuncionarios())
                    menuE()
                })
                break;
            case "6":
                iniciar()
                break;
            default:
                menuE()
        }
    })
}

export function menuF() {
    console.log("\n--- Funcionário ---")
    msg.listarOpcoes()
    console.log('5 - Autenticar Usuário')
    console.log("6 - Voltar ao Menu Principal")
    leitor.question("\nDigite a opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                leitor.question("\nID: ", (id) => {
                    leitor.question("Nome: ", (nome) => {
                        leitor.question("Telefone: ", (telefone) => {
                            leitor.question("Endereço: ", (endereco) => {
                                leitor.question("Usuario: ", (usuario) => {
                                    leitor.question("Senha: ", (senha) => {
                                        leitor.question("Nivel de permissão(ADMINISTRADOR / ENGENHEIRO / OPERADOR): ", (nivel) => {
                                            let novaF = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel.toUpperCase() as NivelPermissao)
                                            funcionarios.push(novaF)
                                            console.log("\nFuncionário CADASTRADO")
                                            menuF()
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
                break;
            case "2":
                caseF("\nDigite o ID da Funcionário: ", (f) => {
                    f.salvar()
                    menuF()
                })
                break;
            case "3":
                caseF("\nDigite o ID da Funcionário: ", (f) => {
                    f.carregar()
                    menuF()
                })
                break;
            case "4":
                caseF("\nDigite o ID da Funcionário: ", (f) => {
                    f.remover()
                    menuF()
                })
                break;
            case "5":
                leitor.question("\nDigite o usuário do Funcionário: ", (u: string) => {
                    leitor.question("Digite a senha do funcionário: ", (s: string) => {
                        caseF("Digite a ID do funcionário: ", (f) => {
                            const r = f.autenticarUsuario(u, s)
                            if (r == true) {
                                console.log('\nFuncionário AUTENTICADO')
                            } else {
                                console.log('\nUsuário ou Senha INCORRETOS')
                            }
                            menuF()
                        })
                    })
                })
                break;
            case "6":
                iniciar()
                break;
            default:
                menuF()
        }
    })
}

export function menuT() {
    console.log("\n--- Teste ---")
    msg.listarOpcoes()
    console.log('5 - Voltar ao Menu Principal')
    leitor.question("\nDigite a opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                leitor.question("\nDigite o tipo(ELETRICO, HIDRAULICO, AERODINAMICO): ", (t) => {
                    leitor.question("Digite o resultado(APROVADO, REPROVADO): ", (r) => {
                        let novaT = new Teste(t.toUpperCase() as TipoTeste, r.toUpperCase() as ResultadoTeste)
                        testes.push(novaT)
                        caseA("Digite a Aeronave relacionada: ", (a) => {
                            a.historicoDeTestes.push(novaT)
                            console.log("\nTeste CADASTRADO")
                            menuT()
                        })
                    })
                })
                break;
            case "2":
                caseA("\nDigite o código da Aeronave verificada: ", (a) => {
                    caseT("Digite tipo do Teste: ", (tp) => {
                        tp.salvar(a)
                    })
                })
                break;
            case "3":
                caseA("\nDigite o código da Aeronave verificada: ", (a) => {
                    caseT("Digite tipo do Teste: ", (tp) => {
                        tp.carregar(a)
                    })
                })
                break;
            case "4":
                caseA("\nDigite o código da Aeronave verificada: ", (a) => {
                    caseT("Digite tipo do Teste: ", (tp) => {
                        tp.remover(a)
                    })
                })
                break;
            case "5":
                iniciar()
                break;
            default:
                menuT()
        }
    })
}

export function menuR() {
    console.log("\n--- Relatório ---")
    console.log("1 - Gerar")
    console.log("2 - Salvar")
    console.log('3 - Voltar ao Menu Principal')
    let r = new Relatorio()
    leitor.question("\nDigite a opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                caseA("\nDigite o código da Aeronave: ", (a) => {
                    console.log('Relatório: ')
                    console.log(r.gerarRelatorio(a))
                    menuR()
                })
                break;
            case "2":
                caseA("\nDigite o código da Aeronave: ", (a) => {
                    r.salvarEmArquivo(a)
                    console.log("Relatório SALVADO")
                    menuR()
                })
                break;
            case "3":
                iniciar()
                break;
            default:
                menuR()
        }
    })
}