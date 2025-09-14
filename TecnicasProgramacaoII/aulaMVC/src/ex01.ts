class Pessoa{
    private _nome: string;
    private _idade: number;

    constructor(_nome: string, _idade: number){
        this._nome = _nome
        this._idade = _idade
    }

    get nome():string{
       return this._nome
    }

    get idade ():number{
        return this._idade
    }
}

class ClienteModel extends Pessoa{
    private _id: number
    private _status: boolean

    constructor(id: number, nome: string, idade: number, _status: boolean){
        super(nome, idade)
        this._id = id
        this._status = _status
    }

    get id (): number{
        return this._id
    }

    get status(): boolean{
        return this._status
    }

    set status(status: boolean){
        this._status = status
    }
}


// === Visao (Responsável por Exibir Clientes) ===
class ClienteView {
  mostrarClientes(clientes: ClienteModel[]): void {
    console.log("=== Lista de Clientes ===");
    if(clientes.length === 0){
        console.log("Nenhum cliente encontrado")
    } else {
        clientes.forEach(cliente => {
            const statusTexto = cliente.status ? "Ativo" : "Desativado";
            console.log(`ID: ${cliente.id}, Nome: ${cliente.nome}, Idade: ${cliente.idade}, Status: ${statusTexto}`);
        });
    }
  }}
// Controller (Gerancia a lógica do negócio)

class ClienteController {
    private modelo: ClienteModel[] = [];
    private visao: ClienteView;
    private proximoId: number = 1;

    constructor (modelo: ClienteModel[], visao: ClienteView){
        this.modelo = modelo;
        this.visao = visao;
    }

    adicionarCliente(nome: string, idade: number):void{
        const novoCliente = new ClienteModel (this.proximoId++, nome, idade, true);
        this.modelo.push(novoCliente);
        this.visao.mostrarClientes(this.modelo);
    }
    
    alterarStatus (id: number, status: boolean):void {
        const cliente = this.modelo.find(c => c.id === id);
        if (cliente){
            cliente.status = status; 
        }
        this.visao.mostrarClientes(this.modelo)
    }
} 

//Execução

const clientes: ClienteModel[] = [];
const clienteView = new ClienteView();
const clienteController = new ClienteController(clientes, clienteView);

console.log("--- Adicionando Clientes ---");
clienteController.adicionarCliente("João", 30);
clienteController.adicionarCliente("Maria", 20);
clienteController.adicionarCliente("Antonio", 50);

console.log("--- Alterando o status do cliente com ID 2 para 'Desativado' ---");
clienteController.alterarStatus(2, false);