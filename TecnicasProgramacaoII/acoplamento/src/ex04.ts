
class Contato {
  constructor(public nome: string, public telefone: string, public email: string) {}
}


class Agenda {
  public contatos: Contato[] = [];

  // Adiciona um objeto Contato à lista.
  adicionarContato(contato: Contato): void {
    this.contatos.push(contato);
    console.log(`Contato "${contato.nome}" adicionado.`);
  }

  // Remove um contato da lista buscando pelo nome.
  // A lógica de busca e remoção é centralizada aqui.
  removerContato(nomeContato: string): void {
    const index = this.contatos.findIndex(contato => contato.nome === nomeContato);
    if (index > -1) {
      const contatoRemovido = this.contatos.splice(index, 1);
      if (contatoRemovido[0]) {
        console.log(`Contato "${contatoRemovido[0].nome}" removido.`);
      } else {
        console.log("Contato removido, mas não foi possível identificar o nome.");
      }
    } else {
      console.log(`Contato "${nomeContato}" não encontrado.`);
    }
  }
}


const minhaAgenda = new Agenda();

const contato1 = new Contato("Alice", "11987654321", "alice@email.com");
const contato2 = new Contato("Bob", "11912345678", "bob@email.com");

console.log("--- Testando Agenda de Contatos ---");
minhaAgenda.adicionarContato(contato1);
minhaAgenda.adicionarContato(contato2);


minhaAgenda.removerContato("Alice");

minhaAgenda.removerContato("Carlos");