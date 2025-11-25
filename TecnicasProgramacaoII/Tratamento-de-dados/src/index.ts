import { promises as fs } from "fs";

const excecoes = new Set(["de", "da", "das", "do", "dos", "e"]);

function capitalizar(palavra: string): string {
  if (!palavra) return palavra;
  const [primeira, ...resto] = [...palavra];
  return (
    primeira.toLocaleUpperCase("pt-BR") +
    resto.join("").toLocaleLowerCase("pt-BR")
  );
}

function nomesCompostos(palavra: string): string {
  return palavra
    .split("-")
    .map((parte) =>
      parte.includes("'")
        ? parte.split("'").map(capitalizar).join("'")
        : capitalizar(parte)
    )
    .join("-");
}

function formatNomeCompleto(input: string): string {
  if (!input) return input;
  const ajustado = input
    .toLocaleLowerCase("pt-BR")
    .trim() //remove espaços extras no começo/fim
    .replace(/\s+/g, " "); //substitui múltiplos espaços por um só

  return ajustado
    .split(" ")
    .map((p) => (excecoes.has(p) ? p : nomesCompostos(p)))
    .join(" ");
}

async function main() {
  const caminhoEntrada = process.argv[2] ?? "src/nomes.csv";
  const caminhoSaida = process.argv[3] ?? "src/nomes_formatados.csv";

  const conteudo = await fs.readFile(caminhoEntrada, "utf8"); // lê o arquivo
  const linhas = conteudo.split(/\r?\n/).filter((l) => l.trim().length > 0); // quebra em linhas válidas

  const linhasFormatadas = linhas.map((linha) => formatNomeCompleto(linha));
  await fs.writeFile(caminhoSaida, linhasFormatadas.join("\n"), "utf8"); // salva novo arquivo

  console.log(`Arquivo gerado: ${caminhoSaida}`);
}

main().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});
