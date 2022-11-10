const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static('public'))
app.use(cors());
app.use(express.json());

const jugadores = [];
let turno;

class Jugador {
  constructor(id) {
    this.id = id;
  }

  asingnarMoke(mokepon) {
    this.mokepon = mokepon;
  }
  actualizarPos(x, y) {
    this.x = x;
    this.y = y;
  }
  atacar(ataque, dmg, tipo, enemigoId, vida) {
    this.ataque = ataque;
    this.dmg = dmg;
    this.tipo = tipo;
    this.enemigoId = enemigoId;
    this.vida = vida;
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(id);
});

app.post("/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const nombre = req.body.moke || "";
  const mokepon = new Mokepon(nombre);
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asingnarMoke(mokepon);
  }
  console.log(jugadores);
  res.end();
});

app.post(`/:jugadorId/posicion`, (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPos(x, y);
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

  res.send({
    enemigos,
  });
});

app.post(`/:jugadorId/turno`, (req, res) => {
  const jugadorId = req.params.jugadorId;
  const ataque = req.body.ataqueJugador;
  const dmg = req.body.hitJugador;
  const tipo = req.body.tipoAtkJug;
  const vida = req.body.vidasJugador;
  const enemigoId = req.body.enemigoId;
  turno = enemigoId;
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].atacar(ataque, dmg, tipo, enemigoId, vida);
  }

  console.log(jugadores[jugadorIndex]);
  res.end();
});

app.get(`/:jugadorId/turno`, (req, res) => {
  const jugadorId = req.params.jugadorId;
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  const jugador = jugadores[jugadorIndex];
  const dmg = jugador.dmg;
  const tipo = jugador.tipo;
  const ataque = jugador.ataque;
  const vida = jugador.vida;

  const enemigoIndex = jugadores.findIndex(
    (enemigo) => jugador.enemigoId === enemigo.id
  );
  const enemigo = jugadores[enemigoIndex];

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({
    turno,
    dmg,
    tipo,
    ataque,
    vida,
  });
});

app.listen(8080, () => {
  console.log("servidor funcionando");
});
