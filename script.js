let perfil="";
let classificacao="Intermediário";

function entrar(){

    if(document.getElementById("senha").value==="RKS2026"){

        document.getElementById("login").style.display="none";

        document.getElementById("sistema").style.display="block";

    }else{

        document.getElementById("erro").innerText="Senha incorreta!";
    }
}

function detectar(){

    let ua = navigator.userAgent;
    let uaLower = ua.toLowerCase();

    let ram = (typeof navigator.deviceMemory !== "undefined")
    ? navigator.deviceMemory : 4;

    let cpu = navigator.hardwareConcurrency || 4;

    let largura = screen.width;
    let altura = screen.height;

    let marca="Desconhecido";
    let modelo="Não identificado";

    let versaoAndroid="";

    let androidMatch = ua.match(/Android\s([0-9\.]+)/);

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

    }else if(uaLower.includes("mi ")){

        marca="Xiaomi";
        modelo="Mi";

    }else if(uaLower.includes("realme")){

        marca="Realme";
        modelo="Realme";

    }else if(uaLower.includes("oppo")){

        marca="Oppo";
        modelo="Oppo";

    }else if(uaLower.includes("vivo")){

        marca="Vivo";
        modelo="Vivo";
    }

    if(ua.includes("iPhone")){

        marca="Apple";
        modelo="iPhone";

        versaoAndroid="";
    }

    if(ram<=3 && cpu<=4){

        classificacao="Básico (Fraco)";

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

    document.getElementById("info").innerHTML=

    "Marca: "+marca+"<br>"+
    "Modelo: "+modelo+"<br>"+
    (versaoAndroid ? "Android: "+versaoAndroid+"<br>" : "")+
    "Resolução: "+largura+"x"+altura+" ("+tipoTela+")<br>"+
    "Memória RAM: <b>"+ram+"GB</b><br>"+
    "CPU: "+cpu+" núcleos<br>"+
    "Desempenho: <span style='color:"+cor+"'>"+classificacao+"</span>";
}

function selecionarPerfil(p){

    perfil=p;

    document.getElementById("perfilEscolhido").innerHTML=
    "Perfil selecionado: <b style='color:red'>"+
    p.toUpperCase()+"</b>";
}

function rand(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;
}

function gerar(forcado){

    if(perfil===""){

        alert("Escolha um perfil primeiro!");
        return;
    }

    let ram = (typeof navigator.deviceMemory !== "undefined")
    ? navigator.deviceMemory : 4;

    let base = 160;

    if(ram<=3){

        base=170;

    }else if(ram<=6){

        base=180;

    }else{

        base=190;
    }

    if(perfil==="rush") base+=10;

    if(perfil==="preciso") base-=5;

    if(forcado) base+=5;

    let html="";

    for(let i=1;i<=3;i++){

        let geral = rand(base-5,base+5);

        let red = rand(geral-10,geral-5);

        let x2 = rand(geral-20,geral-15);

        let x4 = rand(geral-30,geral-25);

        let awm = rand(geral-40,geral-35);

        let olho = rand(geral+5,200);

        let dpi =
        ram<=3 ? "520–560"
        : ram<=6 ? "560–600"
        : "600–650";

        let botao =
        larguraPequena() ? "55%" : "50%";

        html +=

        "<b>OPÇÃO "+i+"</b><br>"+

        criarBarraHS("Geral", geral)+

        criarBarraHS("Red Dot", red)+

        criarBarraHS("2x", x2)+

        criarBarraHS("4x", x4)+

        criarBarraHS("AWM", awm)+

        criarBarraHS("Olhadinha", olho)+

        criarBarraHS("Garantia", rand(90,100))+

        "DPI Recomendada: "+dpi+"<br>"+

        "Botão de Tiro: "+botao+"<br><br>";
    }

    document.getElementById("resultado").innerHTML=html;

    document.getElementById("armas").innerHTML=

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
    <p>${nome}: ${limite(valor)}</p>

    <div class="hs-bar">

    <div class="hs-fill"
    style="width:${pct}%"></div>

    </div>`;
}

function limite(valor){

    if(valor>200) return 200;

    if(valor<100) return 100;

    return valor;
}

function larguraPequena(){

    return screen.width < 400;
}