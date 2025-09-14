class Componente {
    private _id: number;
    private _descricao: string
    private _capacidade?: number | undefined
    private _unidade?: string | undefined
    private _status: boolean

    constructor(id: number, descricao: string, capacidade?: number, unidade?: string){
        this._id = id;
        this._descricao = descricao
        this._capacidade = capacidade;
        this._unidade = unidade;
        this._status = true //status iniciais 
    }

    get id(): number{ return this._id; }
    get descricao(): string {return this._descricao;  }
    get capacidade (): number | undefined {return this._capacidade; }
    get unidade (): string | undefined { return this._unidade; }
    get status (): boolean {return this._status; }

    set status (novoStatus: boolean){
        this._status = novoStatus;
    }
}

class Computador {
    private _marca: string;
    private _modelo: string;
    private _componentes: Componente [];

    constructor(marca: string, modelo: string, componentes: Componente[]){
        this._marca = marca;
        this._modelo = modelo;
        this._componentes = componentes;
    }

    get marca(): string {return this._marca; }
    get modelo(): string {return this._modelo; }
    get componentes (): Componente [] {return this._componentes}
}

// Visão (View)

class ComputadorView{
    mostrarComputador(computador: Computador): void{
        console.log(`\n--- Dados do Computador--- `);
        console.log(`Marca: ${computador.marca}, Modelo: ${computador.modelo}`);
        console.log(`\n --- Componentes --- `);
        computador.componentes.forEach( comp => {
            const statusTexto = comp.status ? "Funcionando" : "Com Defeito";
            const capacidadeTexto = comp.capacidade ? `${comp.capacidade} ${comp.unidade}` : "N/A"; 
            console.log(`ID: ${comp.id}, Descrição: ${comp.descricao}, Capacidade: ${capacidadeTexto}, Status: ${statusTexto}`)
        });
    }
}

// Controllers (Controller)

class ComputadorController {
    private modelo: Computador;
    private visao: ComputadorView
    private proximoIdComponente: number = 1;

    constructor(modelo: Computador, visao: ComputadorView){
        this.modelo = modelo;
        this.visao = visao
    }

    adicionarComponente(descricao: string, capacidade?: number, unidade?: string): void{
        const novoComponente = new Componente(this.proximoIdComponente++, descricao, capacidade, unidade);
        this.modelo.componentes.push(novoComponente);
        this.visao.mostrarComputador(this.modelo);
    }

    alterarStatusComponente(id: number, status: boolean): void {
        const componente = this.modelo.componentes.find(c => c.id === id);
        if(componente){
            componente.status = status;
        }
        this.visao.mostrarComputador(this.modelo)
    }
}

// Execução

const componentesDoPc: Componente[] = []
const computadorModel = new Computador("Dell", "XPS 15", componentesDoPc)
const computadorView = new ComputadorView();
const computadorController = new ComputadorController(computadorModel, computadorView);

console.log("--- Adicionando Computador --- ");
computadorController.adicionarComponente("Placa Mãe");
computadorController.adicionarComponente("Memória Ram", 16, "GB");
computadorController.adicionarComponente("HD SSD", 1, "TB");
computadorController.adicionarComponente("RTX 5090", 24, "GB-VRAM")

console.log("\n--- Alterando o status do HD SSD para 'Com Defeito' --- ")
computadorController.alterarStatusComponente(3, false);