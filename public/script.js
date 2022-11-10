//Seccion de Declaracion de Variables y funciones
let mokeponesArr = [];
let elementosMoke = [];
let ataques = [];
let ataquesEnemigo = [];
let mokeEnemigosLive = [];
let ataqueJugador = "";
let ataqueEnemigo = "";
let vidasEnemigo;
let vidasJugador;
let seleccionado = "";
let enemigo = "";
let usoHealing = 3;
let usoHealingE = 3;
let jugadorId = null;
let enemigoId = null;
let turno = false;
let hitJugador;
let tipoAtkJug = "";
let hitEnemigo;
let tipoAtkEne = "";
let contenedorMokepones;
let contenedorElegidoJugador;
let contenedorElegidoEnemigo;
let capipepo;
let hipodoge;
let ratigueya;
let langostelvis;
let tucapalma;
let pydos;
let dragosaurio;
let zalamander;
let flamix;
let botones;
let interval;
let anchoMapa;
let altoProposional;
let anchoMaximoMapa = 600;
const mascotaJugador = document.getElementById("mascota-jugador");
const mascotaEnemigo = document.getElementById("mascota-enemigo");
const tarjetasMokepones = document.querySelector(".tarjetas-mokepones");
const tipoAtaqueJugador = document.getElementById("tipo-ataque-jugador");
const tipoAtaqueEnemigo = document.getElementById("tipo-ataque-enemigo");
const vidaMascotaJugador = document.getElementById("vida-mascota-jugador");
const vidaMascotaEnemigo = document.getElementById("vida-mascota-enemigo");
const botonMascota = document.getElementById("boton-mascotas");
const botonReiniciar = document.getElementById("boton-reiniciar");
const seccionAtaque = document.getElementById("seleccionar-ataque");
const seccionMensajes = document.getElementById("mensajes");
const seccionReiniciar = document.getElementById("reiniciar");
const contenedorSeleccion = document.getElementById("contenedor-seleccion");
const imgJugador = document.querySelector(".img-jugador");
const imgEnemigo = document.querySelector(".img-enemigo");
const contenedorBotonesAtaques = document.querySelector(
  ".contenedor-botones-ataque"
);
const turnoTxt = document.getElementById("turno");
const verMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
const lienzo = mapa.getContext("2d");
const moveUp = document.getElementById("move-up");
const moveDown = document.getElementById("move-dw");
const moveRight = document.getElementById("move-rg");
const moveLeft = document.getElementById("move-lf");
const mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";

anchoMapa = window.innerWidth - 20;
altoProposional = (anchoMapa * 600) / 800;

if (window.innerWidth > anchoMaximoMapa) {
  anchoMapa = anchoMaximoMapa;
  altoProposional = (anchoMapa * 600) / 800;
}
mapa.width = anchoMapa;
mapa.height = altoProposional;

class Mokepon {
  constructor(nombre, id, tipo, imagen, vida, avatar, flag = null) {
    this.flag = flag;
    this.nombre = nombre;
    this.id = id;
    this.tipo = tipo;
    this.imagen = imagen;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 30;
    this.alto = 30;
    this.x = random(0, anchoMapa - this.ancho);
    this.y = random(0, altoProposional - this.alto);
    this.mapImg = new Image();
    this.mapImg.src = avatar;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMoke() {
    lienzo.drawImage(this.mapImg, this.x, this.y, this.alto, this.ancho);
  }
}

class Ataques {
  constructor(nombre, tipo, id, dmg) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.id = id;
    this.dmg = dmg;
  }
}

let capipepoObj = new Mokepon(
  "Capipepo",
  "capipepo",
  "🌱",
  "./assets/capipepo.png",
  120,
  "./assets/capipepo_head.png"
);
let tucapalmaObj = new Mokepon(
  "Tucapalma",
  "tucapalma",
  "🌱",
  "./assets/tucapalma.png",
  120,
  "./assets/tucapalma_head.png"
);
let dragosaurioObj = new Mokepon(
  "Dragosaurio",
  "dragosaurio",
  "🌱",
  "./assets/dragosaurio.png",
  120,
  "./assets/dragosaurio_head.png"
);
let hipodogeObj = new Mokepon(
  "Hipodoge",
  "hipodoge",
  "💧",
  "./assets/hipodoge.png",
  120,
  "./assets/hipodoge_head.png"
);
let pydosObj = new Mokepon(
  "Pydos",
  "pydos",
  "💧",
  "./assets/pydos.png",
  120,
  "./assets/pydos_head.png"
);
let zalamanderObj = new Mokepon(
  "Zalamander",
  "zalamander",
  "💧",
  "./assets/zalamander.png",
  120,
  "./assets/zalamander_head.png"
);
let langostelvisObj = new Mokepon(
  "Langostelvis",
  "langostelvis",
  "🔥",
  "./assets/langostelvis.png",
  120,
  "./assets/langostelvis_head.png"
);
let ratigueyaObj = new Mokepon(
  "Ratigüeya",
  "ratigueya",
  "🔥",
  "./assets/ratigueya.png",
  120,
  "./assets/ratigueya_head.png"
);
let flamixObj = new Mokepon(
  "Flamix",
  "flamix",
  "🔥",
  "./assets/flamix.png",
  120,
  "./assets/flamix_head.png"
);

let infernalAtk = new Ataques("Fuego Infernal", "🔥", "inferno", 4);
let llamaradaAtk = new Ataques("Llamarada", "🔥", "llamarada", 3);
let vulcanoAtk = new Ataques("Vulcano", "🔥", "vulcano", 2);
let luzBrillanteAtk = new Ataques("Luz Brillante", "🔥", "bright", 1);
let hydrojetAtk = new Ataques("Hydrojet", "💧", "hydro", 1);
let tsunamiAtk = new Ataques("Tsunami", "💧", "tsunami", 2);
let lluviaAtk = new Ataques("Lluvia Torrencial", "💧", "lluvia", 3);
let ruedaAtk = new Ataques("Rueda de Agua", "💧", "rueda", 3);
let penonazolAtk = new Ataques("Peñonazo", "🌱", "penonazo", 3);
let terremotoAtk = new Ataques("Terremoto", "🌱", "terremoto", 5);
let pantanoAtk = new Ataques("Pantano Peligroso", "🌱", "pantano", 1);
let raicesAtk = new Ataques("Raices Traicioneras", "🌱", "raices", 2);
let healingAtk = new Ataques("Vigor", "✨", "healing", 5);

mokeponesArr.push(
  capipepoObj,
  hipodogeObj,
  langostelvisObj,
  pydosObj,
  ratigueyaObj,
  tucapalmaObj,
  dragosaurioObj,
  zalamanderObj,
  flamixObj
);

capipepoObj.ataques.push(lluviaAtk, pantanoAtk, raicesAtk, healingAtk);
tucapalmaObj.ataques.push(vulcanoAtk, penonazolAtk, terremotoAtk, healingAtk);
dragosaurioObj.ataques.push(terremotoAtk, pantanoAtk, raicesAtk, healingAtk);
hipodogeObj.ataques.push(luzBrillanteAtk, tsunamiAtk, ruedaAtk, healingAtk);
pydosObj.ataques.push(terremotoAtk, lluviaAtk, hydrojetAtk, healingAtk);
zalamanderObj.ataques.push(ruedaAtk, tsunamiAtk, lluviaAtk, healingAtk);
langostelvisObj.ataques.push(terremotoAtk, infernalAtk, vulcanoAtk, healingAtk);
ratigueyaObj.ataques.push(ruedaAtk, luzBrillanteAtk, vulcanoAtk, healingAtk);
flamixObj.ataques.push(infernalAtk, luzBrillanteAtk, llamaradaAtk, healingAtk);

function iniciarJuego() {
  mokeponesArr.forEach((mok) => {
    contenedorMokepones = `
        <input type="radio" name="mascotas" id=${mok.id} class="radius-inputs">
                    <label for=${mok.id} class="mokepones">
                        <p>${mok.nombre}</p>
                        <img src=${mok.imagen} alt=${mok.nombre}>
                    </label>
            `;
    tarjetasMokepones.innerHTML += contenedorMokepones;
  });

  capipepo = document.getElementById("capipepo");
  hipodoge = document.getElementById("hipodoge");
  ratigueya = document.getElementById("ratigueya");
  langostelvis = document.getElementById("langostelvis");
  tucapalma = document.getElementById("tucapalma");
  pydos = document.getElementById("pydos");
  dragosaurio = document.getElementById("dragosaurio");
  zalamander = document.getElementById("zalamander");
  flamix = document.getElementById("flamix");

  elementosMoke.push(
    capipepo,
    hipodoge,
    langostelvis,
    pydos,
    ratigueya,
    tucapalma,
    dragosaurio,
    zalamander,
    flamix
  );

  botonReiniciar.addEventListener("click", reiniciarJuego);
  botonMascota.addEventListener("click", seleccionarMascotaJugador);
  seccionAtaque.style.display = "none";
  seccionMensajes.style.display = "none";
  seccionReiniciar.style.display = "none";
  verMapa.style.display = "none";

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://192.168.18.87:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function random(min, max) {
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}
function random2(min, max) {
  let random = Math.random() * (max - min + 1) + min;
  return random;
}

function seleccionarMascotaJugador() {
  for (let i = 0; i < elementosMoke.length; i++) {
    if (elementosMoke[i].checked) {
      contenedorElegidoJugador = `
            <label for=${mokeponesArr[i].id} class="mokepones">
                <p>${mokeponesArr[i].nombre}</p>
                <img src=${mokeponesArr[i].imagen} alt=${seleccionado}>
            </label>
            `;
      imgJugador.innerHTML = contenedorElegidoJugador;
      mascotaJugador.innerHTML = mokeponesArr[i].nombre;
      seleccionado = mokeponesArr[i];
      seleccionado.flag = jugadorId;
    }
  }
  if (seleccionado == "") {
    alert("Por favor selecciona una mascota");
  }
  if (seleccionado != "") {
    contenedorSeleccion.style.display = "none";
    verMapa.style.display = "flex";
    iniciarMapa();
    seleccionarMokepon(seleccionado);
  }
  vidasJugador = seleccionado.vida;
  vidaMascotaJugador.innerHTML = vidasJugador;
  ataques = seleccionado.ataques;
  ataquesEnemigo = enemigo.ataques;
  botonesDeAtaque(ataques);
}

function seleccionarMokepon(moke) {
  fetch(`http://192.168.18.87:8080/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moke: moke.nombre,
    }),
  });
}

function enviarId(
  enemigoId,
  ataqueJugador,
  hitJugador,
  tipoAtkJug,
  vidasJugador
) {
  fetch(`http://192.168.18.87:8080/${jugadorId}/turno`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enemigoId,
      ataqueJugador,
      hitJugador,
      tipoAtkJug,
      vidasJugador,
    }),
  });
}

function iniciarMapa() {
  crearMapa();

  interval = setInterval(crearMapa, 40);

  window.addEventListener("mousedown", (e) => {
    if (e.path[0].id === "move-up") {
      up();
    } else if (e.path[0].id === "move-dw") {
      down();
    } else if (e.path[0].id === "move-rg") {
      right();
    } else if (e.path[0].id === "move-lf") {
      left();
    }
  });

  window.addEventListener("touchstart", (e) => {
    if (e.path[0].id === "move-up") {
      up();
    } else if (e.path[0].id === "move-dw") {
      down();
    } else if (e.path[0].id === "move-rg") {
      right();
    } else if (e.path[0].id === "move-lf") {
      left();
    }
  });

  window.addEventListener("mouseup", (e) => {
    if (
      e.path[0].id === "move-up" ||
      e.path[0].id === "move-dw" ||
      e.path[0].id === "move-rg" ||
      e.path[0].id === "move-lf"
    ) {
      stop();
    }
  });

  window.addEventListener("touchend", (e) => {
    if (
      e.path[0].id === "move-up" ||
      e.path[0].id === "move-dw" ||
      e.path[0].id === "move-rg" ||
      e.path[0].id === "move-lf"
    ) {
      stop();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      up();
    } else if (e.key === "ArrowDown") {
      down();
    } else if (e.key === "ArrowRight") {
      right();
    } else if (e.key === "ArrowLeft") {
      left();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight"
    ) {
      stop();
    }
  });
}

function crearMapa() {
  seleccionado.x = seleccionado.x + seleccionado.velocidadX;
  seleccionado.y = seleccionado.y + seleccionado.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  seleccionado.pintarMoke();

  enviarPos(seleccionado.x, seleccionado.y);

  mokeEnemigosLive.forEach((moke) => {
    moke.pintarMoke();
    eventoColision(moke);
  });
}

function enviarPos(x, y) {
  fetch(`http://192.168.18.87:8080/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        mokeEnemigosLive = enemigos.map((enemigo) => {
          let mokeEnemigo = null;
          const enemigoNombre = enemigo.mokepon.nombre || "";
          if (enemigoNombre === "Capipepo") {
            mokeEnemigo = new Mokepon(
              "Capipepo",
              "capipepo",
              "🌱",
              "./assets/capipepo.png",
              120,
              "./assets/capipepo_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Dragosaurio") {
            mokeEnemigo = new Mokepon(
              "Dragosaurio",
              "dragosaurio",
              "🌱",
              "./assets/dragosaurio.png",
              120,
              "./assets/dragosaurio_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Hipodoge") {
            mokeEnemigo = new Mokepon(
              "Hipodoge",
              "hipodoge",
              "💧",
              "./assets/hipodoge.png",
              120,
              "./assets/hipodoge_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Pydos") {
            mokeEnemigo = new Mokepon(
              "Pydos",
              "pydos",
              "💧",
              "./assets/pydos.png",
              120,
              "./assets/pydos_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Zalamander") {
            mokeEnemigo = new Mokepon(
              "Zalamander",
              "zalamander",
              "💧",
              "./assets/zalamander.png",
              120,
              "./assets/zalamander_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Langostelvis") {
            mokeEnemigo = new Mokepon(
              "Langostelvis",
              "langostelvis",
              "🔥",
              "./assets/langostelvis.png",
              120,
              "./assets/langostelvis_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Ratigüeya") {
            mokeEnemigo = new Mokepon(
              "Ratigüeya",
              "ratigueya",
              "🔥",
              "./assets/ratigueya.png",
              120,
              "./assets/ratigueya_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Flamix") {
            mokeEnemigo = new Mokepon(
              "Flamix",
              "flamix",
              "🔥",
              "./assets/flamix.png",
              120,
              "./assets/flamix_head.png",
              enemigo.id
            );
          } else if (enemigoNombre === "Tucapalma") {
            mokeEnemigo = new Mokepon(
              "Tucapalma",
              "tucapalma",
              "🌱",
              "./assets/tucapalma.png",
              120,
              "./assets/tucapalma_head.png",
              enemigo.id
            );
          }
          mokeEnemigo.x = enemigo.x;
          mokeEnemigo.y = enemigo.y;
          return mokeEnemigo;
        });
      });
    }
  });
}

function up() {
  seleccionado.velocidadY = -5;
}

function down() {
  seleccionado.velocidadY = 5;
}

function left() {
  seleccionado.velocidadX = -5;
}

function right() {
  seleccionado.velocidadX = 5;
}

function stop() {
  seleccionado.velocidadX = 0;
  seleccionado.velocidadY = 0;
}

function eventoColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribajugador = seleccionado.y;
  const abajojugador = seleccionado.y + seleccionado.alto;
  const derechajugador = seleccionado.x + seleccionado.ancho;
  const izquierdajugador = seleccionado.x;

  if (
    abajojugador < arribaEnemigo ||
    arribajugador > abajoEnemigo ||
    derechajugador < izquierdaEnemigo ||
    izquierdajugador > derechaEnemigo
  ) {
    return;
  } else {
    stop();
    enemigo = enemigo;
    enemigoId = enemigo.flag;
    enviarId(enemigoId, "Esperando Ataque", null, null, vidasJugador);
    seleccionarMascotasEnemigo(enemigo);
    verMapa.style.display = "none";
    seccionAtaque.style.display = "grid";
    seccionMensajes.style.display = "flex";
    if (enemigoId < jugadorId) {
      turno = true;
    } else {
      turno = false;
    }
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    clearInterval(interval);
  }
  seleccionado.y = seleccionado.y * -1;
  seleccionado.x = seleccionado.x * -1;
  turnoAtaques();
}

function botonesDeAtaque(ataques) {
  ataques.forEach((ataque) => {
    contenedorBotonesAtaques.innerHTML += `
        <button id=${ataque.id} class='${ataque.tipo} botones'>${ataque.nombre} ${ataque.tipo}</button>
        `;
    ataque.boton = document.getElementById(ataque.id);
  });
  botones = document.querySelectorAll(".botones");

  activadorAtaques(botones);
}

function turnoAtaques() {
  if (turno) {
    turnoTxt.innerHTML = "Tu Turno";
    clearInterval(interval);
    botones.forEach((boton) => {
      boton.disabled = false;
      return;
    });
    turno = false;
  } else {
    turnoTxt.innerHTML = "Turno del Enemigo";
    botones.forEach((boton) => {
      boton.disabled = true;
      return;
    });
    turno = true;
  }
  interval = setInterval(traerId, 1000);
}

function traerId() {
  fetch(`http://192.168.18.87:8080/${enemigoId}/turno`).then(function (res) {
    if (res.ok) {
      res.json().then(function (respuesta) {
        hitEnemigo = respuesta.dmg;
        ataqueEnemigo = respuesta.ataque;
        tipoAtkEne = respuesta.tipo;
        vidasEnemigo = respuesta.vida;
        vidaMascotaEnemigo.innerHTML = vidasEnemigo
        tipoAtaqueEnemigo.innerHTML = ataqueEnemigo;
        let jugadorHabilitado = respuesta.turno;
        console.log(respuesta.dmg);
        if (jugadorHabilitado === jugadorId) {
          turnoTxt.innerHTML = "Tu Turno";
          clearInterval(interval);
          botones.forEach((boton) => {
            boton.disabled = false;
            return;
          });
          console.log(`turno de ${seleccionado.nombre}`);
        } else if (jugadorHabilitado === enemigoId) {
          turnoTxt.innerHTML = "Turno del Enemigo";
          botones.forEach((boton) => {
            boton.disabled = true;
            return;
          });
        }
      });
    }
  });
}

function activadorAtaques(arrs) {
  arrs.forEach((arr) => {
    if (arr.classList[0] == "💧") {
      arr.addEventListener("click", atack);
    } else if (arr.classList[0] == "🌱") {
      arr.addEventListener("click", atack);
    } else if (arr.classList[0] == "🔥") {
      arr.addEventListener("click", atack);
    } else if (arr.classList[0] == "✨") {
      arr.addEventListener("click", atack);
    }
  });
}

function seleccionarMascotasEnemigo(enemigoSeleccionado) {
  enemigo = enemigoSeleccionado;
  let mascotaEnemigoSeleccionada = enemigoSeleccionado.id;
  contenedorElegidoEnemigo = `
        <label for=${mascotaEnemigoSeleccionada}" class="mokepones">
            <p>${enemigoSeleccionado.nombre}</p>
            <img src=${enemigoSeleccionado.imagen} alt=${mascotaEnemigoSeleccionada}>
        </label>
    `;
  imgEnemigo.innerHTML = contenedorElegidoEnemigo;
  mascotaEnemigo.innerHTML = enemigoSeleccionado.nombre;
  vidaMascotaEnemigo.innerHTML = vidasEnemigo;
  return enemigo;
}

function atack(i) {
  let ordenJugador = i.target;
  ataques.forEach((ataque) => {
    if (ataque.id === ordenJugador.id) {
      hitJugador = ataque.dmg * random2(random(0, 3), random(4, 6));
      ataqueJugador = ordenJugador.textContent;
    }
  });
  if (ordenJugador.classList[0] === "✨") {
    usoHealing--;
    ordenJugador.textContent = `Vigor ✨ ${usoHealing}/3`;
    if (usoHealing <= 0) {
      ordenJugador.style.borderColor = "#00aab37c";
      ordenJugador.style.color = "#00aab37c";
      ordenJugador.style.display = "none";
    }
  }
  let tipoAtkJug = ordenJugador.classList[0];

  enviarId(enemigoId, ataqueJugador, hitJugador, tipoAtkJug, vidasJugador);

  console.log(enemigoId, ataqueJugador, hitJugador, tipoAtkJug, vidasJugador);
  combate(ordenJugador.classList[0], tipoAtkEne, hitJugador, hitEnemigo);
  turnoAtaques();
}

function healing(vidastotales, vidasRestantes, valor) {
  if (vidasRestantes == vidastotales) {
    vidasRestantes += valor * 0;
  } else if (vidasRestantes + valor <= vidastotales) {
    vidasRestantes += Math.floor(valor);
  } else {
    vidasRestantes += Math.floor(vidastotales - vidasRestantes);
  }
  return vidasRestantes;
}

function damageUp(tipoAtk, tipoMoke, hit, vidas) {
  if (tipoAtk === tipoMoke) {
    vidas -= Math.floor(hit * 1.6);
  } else {
    vidas -= Math.floor(hit * 1.3);
  }
  return vidas;
}

function damageDw(tipoAtk, tipoMoke, hit, vidas) {
  if (tipoAtk === tipoMoke) {
    vidas -= Math.floor(hit * 0.5);
  } else {
    vidas -= Math.floor(hit * 0.8);
  }
  return vidas;
}

function combate(tipoAtkJugador, tipoAtkEnemigo, hitJugador, hitEnemigo) {
  if (tipoAtkJugador === "✨") {
    vidasJugador = healing(seleccionado.vida, vidasJugador, hitJugador);
  } else if (tipoAtkEnemigo === "✨") {
    vidasEnemigo = healing(enemigo.vida, vidasEnemigo, hitEnemigo);
  } else if (
    (tipoAtkJugador === "💧" && enemigo.tipo === "🔥") ||
    (tipoAtkJugador === "🔥" && enemigo.tipo === "🌱") ||
    (tipoAtkJugador === "🌱" && enemigo.tipo === "💧")
  ) {
    vidasEnemigo = damageUp(
      tipoAtkJugador,
      seleccionado.tipo,
      hitJugador,
      vidasEnemigo
    );
    vidasJugador = damageDw(
      tipoAtkEnemigo,
      enemigo.tipo,
      hitEnemigo,
      vidasJugador
    );
  } else if (
    (tipoAtkEnemigo === "💧" && seleccionado.tipo === "🔥") ||
    (tipoAtkEnemigo === "🔥" && seleccionado.tipo === "🌱") ||
    (tipoAtkEnemigo === "🌱" && seleccionado.tipo === "💧")
  ) {
    vidasEnemigo = damageDw(
      tipoAtkJugador,
      seleccionado.tipo,
      hitJugador,
      vidasEnemigo
    );
    vidasJugador = damageUp(
      tipoAtkEnemigo,
      enemigo.tipo,
      hitEnemigo,
      vidasJugador
    );
  } else {
    vidasEnemigo -= Math.floor(hitJugador);
    vidasJugador -= Math.floor(hitEnemigo);
  }
  tipoAtaqueEnemigo.innerHTML = ataqueEnemigo;
  tipoAtaqueJugador.innerHTML = ataqueJugador;
  vidaMascotaJugador.innerHTML = vidasJugador;
  vidaMascotaEnemigo.innerHTML = vidasEnemigo;
  revisarVidas();
}

function revisarVidas() {
  if (vidasJugador <= 0) {
    vidaMascotaJugador.innerHTML = 0;
    crearMensaje(
      seccionMensajes,
      `<p><span class="PERDISTE">Perdiste!!!</span>, Tu ${seleccionado.nombre} es muy Debil aun.</p>`
    );
    seccionReiniciar.style.display = "flex";
    inhabilitarBotones();
  } else if (vidasEnemigo <= 0) {
    vidaMascotaEnemigo.innerHTML = 0;
    crearMensaje(
      seccionMensajes,
      `<p><span class="GANASTE">Ganaste!!!</span>, Tu ${seleccionado.nombre} es muy Fuerte.</p>`
    );
    seccionReiniciar.style.display = "flex";
    inhabilitarBotones();
  }
}

function crearMensaje(slector, textoHTML) {
  slector.innerHTML += textoHTML;
}

function inhabilitarBotones() {
  botones.forEach((boton) => {
    boton.disabled = true;
  });
  contenedorBotonesAtaques.style.display = "none";
}

function colocarAtributo(identificador, atributo, valorAtributo) {
  return identificador.setAttribute(atributo, valorAtributo);
}

function reiniciarJuego() {
  location.reload();
}

window.addEventListener("load", iniciarJuego);
