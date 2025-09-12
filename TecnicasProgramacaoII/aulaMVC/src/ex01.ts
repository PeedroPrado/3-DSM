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

