<h1>Desafio Nave.rs back-end </h1>
</br>
<h2>Descrição</h2>
API RESTfull criada para a vaga de estágio backend da Nave.rs, que há como desafio criar um sistema que consiste em um banco de dados com navers e projetos correlacionados e cada um possuindo suas próprias informações.
</br>
<h2>Exercícios de lógica</h2>
<a href="https://codesandbox.io/s/exercicios-teste-estagio-navers-7dvcj" target="_blank">Codesandbox</a>
</br>
<h2>Acesso a API no Heroku</h2>
  <a href="https://navers-api.herokuapp.com/" traget="_blank">Navers API</a>
  </br>
<h3>Tecnologias utilizadas no projeto</h3>

<ul>
  <li>NodeJS</li>
  <li>Express</li>
  <li>Mongoose</li>
  <li>MongoDB Atlas</li>
  <li>Heroku</li>
  <li>Insomnia</li>
</ul>
</br>
<h2>Instruções para uso da API</h2>
É possivel testar a API de duas maneiras distintas:</br>
1° - realizando clone ou download o repositorio e executando o projeto localmente.</br>
2° - consumir a API no Insomnia (ou semelhantes) ou navegador através do link cedido em <a href="https://navers-api.herokuapp.com/" traget="_blank">Navers API</a>.
</br>
Se optar por utilizar a partir da primeira opção, é necessário instalar as dependências do projeto com yarn ou npm  e após executar com  npm start ou yarn start.
</br>
<h2>Endpoints da API</h2>
</br>
<h3>Navers:</h3></br>
<strong>GET</strong> /navers/index (retorna todos os navers).<br>

<strong>GET</strong> /navers/show/:id (retorna um único navers a partir da passagem do id).</br>

<strong>POST</strong> /navers/store (cadastra um navers e retorna um JSON com o conteudo inserido no banco.)

    {
        "name": String, 
        "birthdate": Date, //formato de Date: YYYY-MM-DD
        "admission_date": Date, //formato de Date: YYYY-MM-DD
        "job_role": String, 
        "projects: [{_id:String},]
    }
    
   * Projetos não são obrigatórios
