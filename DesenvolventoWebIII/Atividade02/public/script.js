const API_URL = "http://localhost:3000/compras";

// Utilitário para formatar valores como moeda
function formatarMoeda(valor) {
    // Garante que o valor é um número e formata com duas casas decimais
    const numero = parseFloat(valor);
    if (isNaN(numero)) {
        return 'R$ 0,00';
    }
    // Formata o número para o padrão de moeda brasileira
    return `R$ ${numero.toFixed(2).replace('.', ',')}`;
}

// Carregar produtos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);

const form = document.getElementById("produto-form");
form.addEventListener("submit", salvarProdutos);

// Adiciona um novo elemento para mostrar o total geral no final da tabela
const table = document.querySelector('table');
const totalGeralElement = document.createElement('tr');
totalGeralElement.innerHTML = `
    <td colspan="3" class="total-geral-label">Total Geral:</td>
    <td id="total-geral" class="total-geral-value">R$ 0,00</td>
    <td></td>
`;
table.appendChild(totalGeralElement);


// Buscar e exibir produtos
async function carregarProdutos() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
            throw new Error('Falha ao carregar os produtos.');
        }
        const produtos = await resposta.json();
        
        const lista = document.getElementById("produtos-lista");
        lista.innerHTML = "";
        
        produtos.forEach((produto) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${formatarMoeda(produto.preco)}</td>
                <td>${produto.quantidade}</td>
                <td>${formatarMoeda(produto.preco * produto.quantidade)}</td>
                <td>
                    <button onclick="editarProduto('${produto._id}', '${produto.nome}', '${produto.preco}', '${produto.quantidade}')">Editar</button>
                    <button onclick="excluirProduto('${produto._id}')">Excluir</button>
                </td>
            `;
            lista.appendChild(tr);
        });

        calcularTotalGeral();

    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

// Salvar Produtos (novo ou atualização)
async function salvarProdutos(e) {
    e.preventDefault();
    
    const id = document.getElementById("cliente-id").value;
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;
    
    const produto = { nome, preco, quantidade };
    
    if (id) {
        // Alterar (PUT)
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        });
    } else {
        // Criar (POST)
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        });
    }
    
    form.reset();
    document.getElementById("cliente-id").value = "";
    carregarProdutos();
}

// Preencher formulário para editar produto
function editarProduto(id, nome, preco, quantidade) {
    document.getElementById("cliente-id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("preco").value = preco;
    document.getElementById("quantidade").value = quantidade;
}

// Excluir produto
async function excluirProduto(id) {
    if (confirm("Deseja realmente excluir este produto?")) {
        try {
            const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!resposta.ok) {
                throw new Error(`Erro ao excluir: ${resposta.statusText}`);
            }
            carregarProdutos();
        } catch (error) {
            alert(`Erro ao excluir o produto: ${error.message}`);
            console.error(error);
        }
    }
}

// Função para calcular e exibir o total geral
function calcularTotalGeral() {
    const totais = document.querySelectorAll('#produtos-lista tr');
    let totalGeral = 0;
    
    totais.forEach(row => {
        // Encontra a célula do total de cada item
        const totalCell = row.querySelector('td:nth-child(4)'); 
        if (totalCell) {
            // Remove o R$ e a vírgula para converter para número
            const valorTexto = totalCell.textContent.replace('R$', '').replace(',', '.').trim();
            const valorNumerico = parseFloat(valorTexto) || 0;
            totalGeral += valorNumerico;
        }
    });
    
    document.getElementById('total-geral').textContent = formatarMoeda(totalGeral);
}