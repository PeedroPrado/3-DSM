class CarrinhoDeCompras{
   private itens: string [] = []

    adicionarItem(item:string):void{
        this.itens.push(item);
        console.log(`"${item}" adicionado ao carrinho.`);
    }

    removerItem(item:string):void{
        const index = this.itens.indexOf(item);
        if (index > -1){
            this.itens.splice(index, 1);
            console.log(`"${item}" removido do carrinho.`); 
        }   else {
            console.log(`"${item}" não encontrado no carrinho.`);
    }
}

    imprimir():void{
        console.log("Itens no carrinho: ");
        if (this.itens.length > 0){
            this.itens.forEach(item => console.log(`- ${item}`));
    } else {
        console.log("O carrinho está vazio.");
    }
}
}

const carrinho = new CarrinhoDeCompras(); 
carrinho.adicionarItem("Camiseta"); 
carrinho.adicionarItem("Calça"); 
carrinho.adicionarItem("Meia"); 
carrinho.removerItem("Camiseta"); 
console.log(carrinho.imprimir()); 