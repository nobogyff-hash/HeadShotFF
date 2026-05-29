let perfil="";

let classificacao="Intermediário";

function entrar(){

    if(
    document.getElementById("senha").value
    ==="RKS2026"
    ){

        document.getElementById("login")
        .style.display="none";

        document.getElementById("sistema")
        .style.display="block";

    }else{

        document.getElementById("erro")
        .innerText="Senha incorreta!";
    }
}

function detectar(){

    let ua = navigator.userAgent;

    let uaLower = ua.toLowerCase();

    let ram =
    (typeof navigator.deviceMemory !== "undefined")
    ? navigator.deviceMemory : 4;

    let cpu =
    navigator.hardwareConcurrency || 4;

    let largura = screen.width;

    let altura = screen.height;

    let marca="Desconhecido";

    let modelo="Não identificado";

    let versaoAndroid="";

    let androidMatch =
    ua.match(/Android\s([0-9\.]+)/);

    if(androidMatch && androidMatch[1]){

        versaoAndroid = androidMatch[1];
    }

    if(ua.includes("SM-")){

        marca="Samsung";

        let match = ua.match(/SM-\w+/);

        if(match && match[0]){

            modelo=match[0];
        }

    }else if(uaLower.includes("moto")){

        marca="Motorola";

        modelo="Moto Series";

    }else if(uaLower.includes("redmi")){

        marca="Xiaomi";

        modelo="Redmi";

    }else if(uaLower.includes("poco")){

        marca="Xiaomi";

        modelo="POCO";

    }else if(uaLower.includes("realme")){

        marca="Realme";

        modelo="Realme";

    }

    if(ua.includes("iPhone")){

        marca="Apple";

        modelo="iPhone";

        versaoAndroid="";
    }

    if(ram<=3 && cpu<=4){

        classificacao="Básico";

    }else if(ram<=6){

        classificacao="Intermediário";

    }else{

        classificacao="Avançado";
    }

    let tipoTela =
    largura < 400 ? "Pequena"
    : largura < 720 ? "Média"
    : "Grande";

    let cor =
    ram<=3 ? "lime"
    : ram<=6 ? "yellow"
    : "red";

    document.getElementById("info")
    .innerHTML=

    "Marca: "+marca+"<br>"+
    "Modelo: "+modelo+"<br>"+
    (versaoAndroid ?
    "Android: "+versaoAndroid+"<br>" : "")+

    "Resolução: "+
    largura+"x"+altura+
    " ("+tipoTela+")<br>"+

    "Memória RAM: <b>"+
    ram+"GB</b><br>"+

    "CPU: "+cpu+" núcleos<br>"+

    "Desempenho: "+
    "<span style='color:"+cor+"'>"+
    classificacao+
    "</span>";
}

function selecionarPerfil(p){

    perfil=p;

    document.getElementById("perfilEscolhido")
    .innerHTML=

    "Perfil selecionado: "+
    "<b style='color:red'>"+
    p.toUpperCase()+
    "</b>";
}

function rand(min,max){

    return Math.floor(
    Math.random()*(max-min+1)
    )+min;
}

function gerar(forcado){

    if(perfil===""){

        alert("Escolha um perfil primeiro!");

        return;
    }

    let ram =
    (typeof navigator.deviceMemory !== "undefined")
    ? navigator.deviceMemory : 4;

    let html="";

    for(let i=1;i<=3;i++){

        let geral;
        let red;
        let x2;
        let x4;
        let awm;
        let olho;

        // CELULAR FRACO
        if(ram<=3){

            geral = rand(175,185);

            red = rand(165,175);

            x2 = rand(155,165);

            x4 = rand(145,155);

            awm = rand(120,135);

            olho = rand(185,200);
        }

        // CELULAR MÉDIO
        else if(ram<=6){

            geral = rand(185,195);

            red = rand(175,185);

            x2 = rand(165,175);

            x4 = rand(150,165);

            awm = rand(125,145);

            olho = rand(190,200);
        }

        // CELULAR FORTE
        else{

            geral = rand(190,200);

            red = rand(180,190);

            x2 = rand(170,180);

            x4 = rand(160,170);

            awm = rand(130,150);

            olho = rand(195,200);
        }

        // PERFIS

        if(perfil==="rush"){

            geral += 3;

            red += 3;

            olho += 2;
        }

        if(perfil==="preciso"){

            x4 -= 5;

            awm -= 5;
        }

        if(perfil==="controlado"){

            geral -= 3;

            red -= 3;
        }

        if(forcado){

            geral += 2;

            red += 2;
        }

        geral = limite(geral);
        red = limite(red);
        x2 = limite(x2);
        x4 = limite(x4);
        awm = limite(awm);
        olho = limite(olho);

        let dpi =
        ram<=3 ? "520–560"
        : ram<=6 ? "560–600"
        : "600–650";

        let botao =
        larguraPequena()
        ? "55%" : "50%";

        html +=

        "<b>OPÇÃO "+i+"</b><br>"+

        criarBarraHS("Geral", geral)+
        criarBarraHS("Red Dot", red)+
        criarBarraHS("2x", x2)+
        criarBarraHS("4x", x4)+
        criarBarraHS("AWM", awm)+
        criarBarraHS("Olhadinha", olho)+
        criarBarraHS("Garantia", rand(95,100))+

        "DPI Recomendada: "+dpi+"<br>"+

        "Botão de Tiro: "+botao+
        "<br><br>";
    }

    document.getElementById("resultado")
    .innerHTML=html;

    document.getElementById("armas")
    .innerHTML=

    "<b>AR:</b> Base padrão<br>"+
    "<b>SMG:</b> +5 Red Dot<br>"+
    "<b>Shotgun:</b> Geral alto<br>"+
    "<b>Sniper:</b> AWM controlado<br>"+
    "<b>Pistolas:</b> Olhadinha alta<br>"+
    "<b>LMG:</b> Red Dot equilibrado<br>";
}

function criarBarraHS(nome, valor){

    let pct = (valor/200)*100;

    return `
    <p>${nome}: ${valor}</p>

    <div class="hs-bar">

    <div class="hs-fill"
    style="width:${pct}%"></div>

    </div>
    `;
}

function limite(valor){

    if(valor>200){

        return 200;
    }

    if(valor<100){

        return 100;
    }

    return valor;
}

function larguraPequena(){

    return screen.width < 400;
}