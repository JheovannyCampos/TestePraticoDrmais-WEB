//Aqui é onde é criada a API, o axios
//cria um servidor local. Para que funcione,
//O ip abaixo deve ser trocado para o ip da maquina,
//Para encontrar o ip da maquina, é só rodar o comando,
//"ipconfig" no prompt de comando

import axios from "axios";

export const api = axios.create({
    baseURL: "http://172.18.0.120:3333",
});

export default api;