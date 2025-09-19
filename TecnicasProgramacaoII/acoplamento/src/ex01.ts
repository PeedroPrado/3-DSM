class ContaBancaria {
    private saldo: number;

    constructor(saldoInicial: number){
        this.saldo = saldoInicial;
    }

    depositar(valor: number): void {
    if (valor > 0) {
      
      this.saldo += valor;
      console.log(`Depósito de R$${valor},00 realizado. Novo saldo: R$${this.saldo},00`);
    } else {
      console.log("O valor do depósito deve ser positivo.");
    }
  }

    sacar (valor: number):void {
        if (valor > 0 && this.saldo >= valor ){
            this.saldo -= valor;
            console.log(`Saque o valor R$${valor},00 realizado. Novo saldo R$${this.saldo},00`)
    } else if (valor > 0 && this.saldo < valor ){
            console.log(`Saldo insuficiente para o saque.`);
    } else {
        console.log("O valor deve ser positivo")
    }
}
getSaldo(): number {
    return this.saldo
}
}

// Classe Cliente

class Cliente{
    private nome: string
    private cpf: string
    private nasc: Date
    private nomemae: string
    private conta: ContaBancaria

    constructor(nome: string, cpf:string, nasc:Date, nomemae: string, conta:ContaBancaria){
        this.nome = nome
        this.cpf = cpf
        this.nasc = nasc
        this.nomemae = nomemae
        this.conta = conta
        
    }

    getConta(): ContaBancaria{
        return this.conta;
    }
}

// Implementação 

const minhaConta = new ContaBancaria(0);
const cliente = new Cliente("Pedro", "45586223848", new Date("1995-08-26"), "Rita", minhaConta);

console.log("--- Testando Conta Bancária");

// Deposito

cliente.getConta().depositar(100);

cliente.getConta().sacar(50);

cliente.getConta().sacar(40);

cliente.getConta().sacar(20);