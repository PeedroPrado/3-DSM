class AutenticacaoDeUsuario {
  
  private usuarios: Map<string, string> = new Map();

  // O método para registrar um novo usuário.
 
  public registrarUsuario(usuario: string, senha: string): void {
    if (this.usuarios.has(usuario)) {
      console.log(`Usuário "${usuario}" já existe.`);
    } else {
      this.usuarios.set(usuario, senha);
      console.log(`Usuário "${usuario}" registrado com sucesso.`);
    }
  }

  // O método para autenticar um usuário.
  
  public autenticarUsuario(usuario: string, senha: string): boolean {
    const senhaArmazenada = this.usuarios.get(usuario);
    return senhaArmazenada === senha;
  }
}

// Tarefas de Implementação e Teste

const autenticacao = new AutenticacaoDeUsuario();

console.log("--- Testando Autenticação de Usuário ---");

autenticacao.registrarUsuario("alice", "senha123");
autenticacao.registrarUsuario("bob", "outrasenha");


const usuarioAutenticado = autenticacao.autenticarUsuario("alice", "senha123");

if (usuarioAutenticado) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}


const falhaAutenticacao = autenticacao.autenticarUsuario("alice", "senhaerrada");
if (falhaAutenticacao) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}