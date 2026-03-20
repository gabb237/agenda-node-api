const express = require("express");
const app = express();

const sequelize = require("./database/db");
const Agenda = require("./models/Agenda");

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
  res.send("Está rodando");
});

// LISTAR TODOS OS COMPROMISSOS
app.get("/agenda", async (req, res) => {
  try {
    const dados = await Agenda.findAll();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// CRIAR COMPROMISSO
app.post("/agenda", async (req, res) => {
  try {
    const { titulo, descricao, data } = req.body;

    const novo = await Agenda.create({
      titulo,
      descricao,
      data,
    });

    res.json(novo);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// Conectar banco
sequelize
  .sync()
  .then(() => console.log("Banco conectado"))
  .catch((err) => console.log(err));

// Iniciar servidor
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Servidor rodando");
});
app.get("/visualizar", async (req, res) => {
  const dados = await Agenda.findAll();

  let html = "<h1>Agenda</h1>";

  dados.forEach((item) => {
    html += `
      <div>
        <h3>${item.titulo}</h3>
        <p>${item.descricao}</p>
        <small>${item.data}</small>
        <hr>
      </div>
    `;
  });

  res.send(html);
});
