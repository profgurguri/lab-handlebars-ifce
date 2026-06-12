// 1. Mapeamos os elementos do HTML que vamos precisar
const divListaProfessores = document.getElementById('lista-professores');
const templateSource = document.getElementById('professor-template').innerHTML;

// 2. Compilamos o template do Handlebars UMA ÚNICA VEZ
const compilarTemplate = Handlebars.compile(templateSource);

// 3. Função assíncrona para buscar os dados na nossa API local
async function carregarProfessores() {
    try {
        // Faz a requisição HTTP GET para o JSON Server
        const resposta = await fetch('http://localhost:3000/professores');
        
        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados do servidor.');
        }

        // Converte a resposta para um array de objetos JavaScript
        const dadosProfessores = await resposta.json();

        // 4. Passamos os dados para o template compilado
        // O Handlebars devolve uma string gigante de HTML pronto
        const htmlGerado = compilarTemplate(dadosProfessores);

        // 5. Injetamos o HTML gerado na página, substituindo a mensagem de "Carregando"
        divListaProfessores.innerHTML = htmlGerado;

    } catch (erro) {
        console.error(erro);
        divListaProfessores.innerHTML = `
            <div style="color: red; text-align: center;">
                <h3>Oops! Não foi possível carregar os dados.</h3>
                <p>Verifique se o JSON Server está rodando na porta 3000.</p>
            </div>
        `;
    }
}

// 6. Chamamos a função assim que o script é carregado
carregarProfessores();