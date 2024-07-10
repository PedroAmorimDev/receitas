import http from "node:http"
import fs from "node:fs"
import { v4 as uuidv4 } from "uuid"

const PORT = 3333

const server = http.createServer((request, response) => {
     const { method, url } = request;
     if (method === 'GET' && url === '/receitas') {
          fs.readFile('receitas.json', 'utf8', (err, data) => {
               if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ message: 'não foi possivel acessar a base de dados' }));
                    return
               }
               response.writeHead(200, { 'Content-Type': 'application/json' });
               response.end(data);
          });
     } else if (method === 'POST' && url === '/receitas') {
          let body = '';
          request.on('data', (chunk) => {
               body += chunk
          });
          request.on('end', () => {
               const novoLivro = JSON.parse(body)
               fs.readFile('receitas.json', 'utf8', (err, data) => {
                    if (err) {
                         response.writeHead(500, { 'Content-Type': 'application/json' });
                         response.end(JSON.stringify({ message: 'não foi possivel acessar a base de dados' }));
                         return
                    }
                    const receitas = JSON.parse(data)

                    novoLivro.id = uuidv4()
                    receitas.push(novoLivro)
                    fs.writeFile("receitas.json", JSON.stringify(receitas, null, 2), (err) => {
                         if (err) {
                              response.writeHead(500, { "Content-Type": "application/json" })
                              response.end(JSON.stringify({ message: "arquivo não encontrado" }))
                         }
                         response.writeHead(200, { "Content-Type": "application/json" })
                         response.end(JSON.stringify(novoLivro))
                    })
               }); 
          });
     } else if (false) {

     } else if (false) {

     } else if (method === 'GET' && url.startsWith('/receitas/')) {
     } else {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: 'pagina não encontrada' }));
     }
})

server.listen(PORT, () => {
     console.log(`servidor on http//:localhost:${PORT}`)
})

console.log("ola")