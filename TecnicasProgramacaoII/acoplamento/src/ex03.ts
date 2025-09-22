class Item {
    descricao: string;
    valor: number;
    quantidade: number;
    constructor( descricao: string,  valor: number,  quantidade: number) { 
        this.descricao = descricao;
        this.valor = valor;
        this.quantidade = quantidade;
    }
}

//Implementação

class Carrinho {
    public itens: Item[] = [];

    adicionarItem(item: Item): void {
        this.itens.push(item);
    }

    removerItem(item: Item): void {
    const index = this.itens.indexOf(item);
    if (index > -1) {
      this.itens.splice(index, 1);
    }
  }

    calcularTotal(): number {
        let total = 0;
        for (const item of this.itens) {
            total += item.valor * item.quantidade;
        }
        return total
    }
}

// Implementação da classe Pagamento

class Pagamento{
    processarPagamento(total: number, forma: string): void{
        console.log(`Pagamento de R$${total} realizado com ${forma}.`)
    }
};

const carrinhoc = new Carrinho(); 
let item = new Item("Camiseta", 50,2); 
carrinhoc.adicionarItem(item); 
item = new Item("Calça", 130,1); 
carrinhoc.adicionarItem(item); 
item = new Item("Meia", 20,3); 
carrinhoc.adicionarItem(item); 
const total = carrinhoc.calcularTotal(); 

console.log(`Total do carrinho: R$${total}`);
