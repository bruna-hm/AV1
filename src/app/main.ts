import Mensagens from "../fileUtils/Mensagem"
import { leitor } from "../fileUtils/utils"
import { menuA, menuP, menuF, menuE, menuT, menuR } from "../fileUtils/SubMenus"

let msg = new Mensagens()

export function iniciar() {
    msg.menu()
    leitor.question("\nDigite o número da opção: ", (valor) => {
        switch (valor) {
            case "1":
                menuA()
                break;
            case "2":
                menuP()
                break;
            case "3":
                menuE()
                break;
            case "4":
                menuF()
                break;
            case "5":
                menuT()
                break;
            case "6":
                menuR()
                break;
            case "7":
                leitor.close()
                console.log('\nFechando AeroCode')
                break;
            default:
                msg.boasVindas()
                iniciar()
                break;
        }
    })
}

msg.boasVindas()
iniciar()