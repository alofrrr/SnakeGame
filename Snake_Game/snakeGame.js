
    var stage = document.getElementById('stage');
    var ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);

    setInterval(game, 100);
    const vel = 1;
    var vx = vy = 0; //velocidade x e y
    var px = 10;
    var py = 15; //pontos x e y
    var tam = 30;
    var qtd = 20;
    var appleX = appleY = 15;
    var rastro = [];
    var cauda = 1;
    var pontos = 0;
    var iniciou = 0;
    var jog1 = 0;
    var morreu = 0;

    function game() {
        px += vx;
        py += vy;
        if (px < 0) {
            px = qtd - 1;
        }
        if (px > qtd - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qtd - 1;
        }
        if (py > qtd - 1) {
            py = 0;
        }

        ctx.fillStyle = "rgba(160, 98, 57, 0.925)";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "rgb(252, 49, 49)";
        ctx.beginPath();
        ctx.arc((appleX * tam) + (tam / 2), (appleY * tam) + (tam / 2), tam / 2.5, 0, 2 * Math.PI);
        ctx.fill();


        ctx.fillStyle = "rgb(28, 230, 21)";
        for (var i = 0; i < rastro.length; i++) {
            ctx.fillRect(rastro[i].x * tam, rastro[i].y * tam, tam - 1, tam - 1);
            if (pontos > 1) {
                if (rastro[i].x == px && rastro[i].y == py) {
                    vx = vy = 0;
                    cauda = 1;
                    iniciou = 0;
                    jog1 = 0;
                    morreu = 1;
                    clearInterval(game, 100);
                    const gameOver = `Game Over`;
                    ctx.font = '60pt sketchzone';
                    ctx.fillStyle = 'White';
                    ctx.fillText(gameOver, 110, 300);
                    const OverPontos = `Your score: ${pontos - 1}`
                    ctx.font = '25pt sketchzone';
                    ctx.fillStyle = 'White';
                    ctx.fillText(OverPontos, 200, 350);
                    const restart = `press space to restart!`
                    ctx.font = '20pt sketchzone';
                    ctx.fillStyle = 'White';
                    ctx.fillText(restart, 170, 400);
                }
            }
        }

        rastro.push({ x: px, y: py })
        while (rastro.length > cauda) {
            rastro.shift();
        }

        if (appleX == px && appleY == py) {
            cauda++;
            pontos = cauda;
            appleX = Math.floor(Math.random() * qtd);
            appleY = Math.floor(Math.random() * qtd);
        }

        if (cauda == 1 && jog1 == 0) {
            if (morreu != 1) {
                const Start = `press space to start!`
                ctx.font = '40pt sketchzone';
                ctx.fillStyle = 'White';
                ctx.fillText(Start, 40, 300);
            }
        }

        const score = `SCORE: ${cauda - 1}`;
        ctx.font = '15pt sketchzone';
        ctx.fillStyle = 'White';
        ctx.fillText(score, 518, 26);
    }

    function keyPush(event) {

        switch (event.keyCode) {
            case 37: //tecla left
                if (jog1 == 1) {
                    if (event.keyCode == 37 && vx != vel) {
                        jog1 = 1;
                        vx = -vel;
                        vy = 0;
                    }
                }
                break;
            case 38: //tecla up
                if (jog1 == 1) {
                    if (event.keyCode == 38 && vy != vel) {
                        jog1 = 1;
                        vx = 0;
                        vy = -vel;
                    }
                }
                break;
            case 39: //tecla right
                if (jog1 == 1) {
                    if (event.keyCode == 39 && vx != -vel) {
                        jog1 = 1;
                        vx = vel;
                        vy = 0;
                    }
                }
                break;
            case 40: //tecla down
                if (jog1 == 1) {
                    if (event.keyCode == 40 && vx != 0) {
                        jog1 = 1;
                        vx = 0;
                        vy = vel;
                    }
                }
                break;
            case 32:
                if (cauda == 1 && iniciou == 0) {
                    iniciou = 1;
                    vx = 0;
                    vy = -vel;
                    jog1 = 1;
                }
                break;
            default:
        }

    }
