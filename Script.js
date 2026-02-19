// script.js

let perfil = "";
let classificacao = "Intermediário";

// Função de login
function entrar() {
    const senha = document.getElementById("senha").value;
    if (senha === "RKS2026") {
        document.getElementById("login").style.display = "none";
        document.getElementById("sistema").style.display = "block";
    } else {
        document.getElementById("erro").innerText = "Senha incorreta!";
    }
}

// Detecta dispositivo, RAM, CPU e resolução
function detectar() {
    const ua = navigator.userAgent;
    const ram = navigator.deviceMemory || 4;
    const cpu = navigator.hardwareConcurrency || 4;
    const largura = screen.width;
    const altura = screen.height;

    let modelo = "Não identificado";

    if (ua.includes("SM-")) {
        const match = ua.match(/SM-\w+/);
        if (match) modelo = "Samsung " + match[0];
    } else if (ua.toLowerCase().includes("moto")) modelo = "Motorola";
    else if (ua.toLowerCase().includes("mi") || ua.toLowerCase().includes("redmi") || ua.toLowerCase().includes("poco")) modelo = "Xiaomi";
    else if (ua.includes("iPhone")) modelo = "iPhone";

    if (ram <= 3) classificacao = "Básico (2–3GB)";
    else if (ram <= 6) classificacao = "Intermediário (4–6GB)";
    else classificacao = "Avançado (8GB+)";

    const cor = ram <= 3 ? "lime" : ram <= 6 ? "yellow" : "red";

    document.getElementById("info").innerHTML =
        `<b>Modelo:</b> ${modelo}<br>` +
        `<b>Resolução:</b> ${largura}x${altura}<br>` +
        `<b>RAM:</b> ${ram}GB<br>` +
        `<b>CPU:</b> ${cpu} núcleos<br>` +
        `<b>Desempenho:</b> <span style='color:${cor}'>${classificacao}</span>`;
}

// Seleciona perfil de jogo
function selecionarPerfil(p) {
    perfil = p;
    document.getElementById("perfilEscolhido").innerHTML =
        `Perfil selecionado: <b style='color:red'>${p.toUpperCase()}</b>`;
}

// Gera número aleatório
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera opções de sensibilidade
function gerar(forcado) {
    if (!perfil) {
        alert("Escolha um perfil primeiro!");
        return;
    }

    const ram = navigator.deviceMemory || 4;
    let base = 160;

    if (ram <= 3) base = 170;
    else if (ram <= 6) base = 180;
    else base = 190;

    if (perfil === "rush") base += 10;
    if (perfil === "preciso") base -= 5;
    if (forcado) base += 5;

    let html = "";

    for (let i = 1; i <= 3; i++) {
        const geral = rand(base - 5, base + 5);
        const red = rand(geral - 10, geral - 5);
        const x2 = rand(geral - 20, geral - 15);
        const x4 = rand(geral - 30, geral - 25);
        const awm = rand(geral - 40, geral - 35);
        const olho = rand(geral + 5, 200);

        const dpi = ram <= 3 ? "520–560" : ram <= 6 ? "560–600" : "600–650";
        const botao = screen.width < 400 ? "55%" : "50%";

        html += `
        <div class="box">
            <h4>OPÇÃO ${i}</h4>
            <p><b>Geral:</b> ${limite(geral)}</p>
            <p><b>Red Dot:</b> ${limite(red)}</p>
            <p><b>2x:</b> ${limite(x2)}</p>
            <p><b>4x:</b> ${limite(x4)}</p>
            <p><b>AWM:</b> ${limite(awm)}</p>
            <p><b>Olhadinha:</b> ${limite(olho)}</p>
            <p><b>DPI Recomendada:</b> ${dpi}</p>
            <p><b>Botão de Tiro:</b> ${botao}</p>
        </div>`;
    }

    document.getElementById("resultado").innerHTML = html;

    document.getElementById("armas").innerHTML =
        `<b>AR:</b> Base padrão<br>` +
        `<b>SMG:</b> +5 Red Dot<br>` +
        `<b>Shotgun:</b> Geral alto<br>` +
        `<b>Sniper:</b> AWM controlado<br>` +
        `<b>Pistolas:</b> Olhadinha alta<br>` +
        `<b>LMG:</b> Red Dot equilibrado<br>`;
}

// Limita valores entre 100 e 200
function limite(valor) {
    if (valor > 200) return 200;
    if (valor < 100) return 100;
    return valor;
      }
