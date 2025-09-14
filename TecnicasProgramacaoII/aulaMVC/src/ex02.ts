class Contato {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    status: boolean

    constructor(id: number, nome: string, telefone: string, email: string, status: boolean){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.status = status;
    }
}

// Armazena os dados da classe contato
class AgendaModel {
    public contato: Contato [];

    constructor(){
        this.contato = []
    }
}

// Visão (View)

class ContatoView {
    mostrarContatos (contatos: Contato[]): void {
        console.log("--- Lista de Contatos ---");
        if (contatos.length === 0){
            console.log("Nenhum contato cadastrado");
        } else {
            contatos.forEach ( contato => {
                const statusTexto = contato.status ? "Ativo" : "Desativado";
                console.log(`ID: ${contato.id}, Nome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}, Status? ${statusTexto}`)
            });
        }
    }
}

// Controlador 

class ContatoController{
    private modelo: AgendaModel;
    private visao: ContatoView;
    private proximoId: number = 1;

    constructor(modelo: AgendaModel, visao: ContatoView){
        this.modelo = modelo;
        this.visao = visao;
    }

    adicionarContato(nome: string, telefone: string, email:string): void{
        const novoContato = new Contato(this.proximoId++, nome, telefone, email, true);
        this.modelo.contato.push(novoContato);
        this.visao.mostrarContatos(this.modelo.contato);
    }

    alterarStatus(id: number, status:boolean): void{
        const contato = this.modelo.contato.find( c => c.id === id);
        if (contato){
            contato.status = status;
        }
        this.visao.mostrarContatos(this.modelo.contato);
    }
}

// Execução

const agendaModel = new AgendaModel();
const contatoView = new ContatoView();
const contatoController = new ContatoController(agendaModel, contatoView);

console.log("--- Adicionando Conta--- ");
contatoController.adicionarContato("Ana", "1292187-9786", "ana@email.com");
contatoController.adicionarContato("Pedro", "98192-9773", "pedro@pedro.com");
contatoController.adicionarContato("Henrique", "12345-5678", "henrique@henrique.com");

console.log("\n--- Alterando o status do contato com ID 3 para 'Desativado' ---");
contatoController.alterarStatus(3, false);