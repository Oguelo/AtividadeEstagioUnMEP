import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiAxios = () => {
  const [getData, setGetData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [putData, setPutData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  useEffect(() => {
 
    axios.get('http://localhost:3000/activity/all')
      .then(response => setGetData(response.data))
      .catch(error => console.error('Erro na requisição GET:', error));

    const postTask = { title: 'Nova Task', body: 'Conteúdo do novo post', userId: 1 };
    axios.post('http://localhost:3000/activity', postData)
      .then(response => setPostData(response.data))
      .catch(error => console.error('Erro na requisição POST:', error));

    // Exemplo de requisição PUT
    const putTask = { title: 'Task Atualizada', body: 'Conteúdo atualizado do post' };
    axios.put('https://jsonplaceholder.typicode.com/posts/1', putData)
      .then(response => setPutData(response.data))
      .catch(error => console.error('Erro na requisição PUT:', error));

    // Exemplo de requisição DELETE
    axios.delete('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => setDeleteData(response.data))
      .catch(error => console.error('Erro na requisição DELETE:', error));
  }, []); // A dependência vazia garante que o código seja executado apenas uma vez ao montar o componente

  return (
    <div>
      <h1>Exemplos de Requisições HTTP com Axios</h1>

      <h2>GET Data</h2>
      <pre>{JSON.stringify(getData, null, 2)}</pre>

      <h2>POST Data</h2>
      <pre>{JSON.stringify(postData, null, 2)}</pre>

      <h2>PUT Data</h2>
      <pre>{JSON.stringify(putData, null, 2)}</pre>

      <h2>DELETE Data</h2>
      <pre>{JSON.stringify(deleteData, null, 2)}</pre>
    </div>
  );
};

export default ApiExample;
