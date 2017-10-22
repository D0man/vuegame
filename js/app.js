document.addEventListener('DOMContentLoaded',function(){
    const app = new Vue({
        el: '#app',
        data: {
            monster: 'Potwór',
            player: 'Bohater',
            playerHealth: 0,
            monsterHealth: 0,
            turns: [],
            showInput: true,
            textPlayer: {
                0: ' atakuje zadając',
                1: ' wykonuje efektowny kopniak z półobrotu zadając',
                2: ' wbija szpilkę pod pazury potwora zadając',
                3: ' kopię potwora w kroczę zadając',   
            },
            textMonster: {
                0: 'potwór atakuje zadając',
                1: 'smród wydobywający się z paszczy potwora zadaje',
                2: 'potwór przypadkiem zdeptał bohatera zadaje',
                3: 'potwór nie ma pomysłu na atak, ale i tak zadaje ',   
            }
        },
        methods:{
            changeInput() {
                if (this.player>15){
                this.player='you';
                alert('imie nie moze byc dluzsze niz 15 znakow');
                }
                else{
                    this.startFight();
                    return this.showInput=false;
                }
            },
            randomNumber(min,max) {
                return Math.max(Math.floor((Math.random()*max)),min)
            },
            monsterText(){
                let i = this.randomNumber(0,4)
                return this.textMonster[i];
            },
            playerText(){
                let i = this.randomNumber(0,4)
                return this.player+this.textPlayer[i];
            },
            restart(){
                if(confirm('Start new game?')){
                    this.showInput=true;
                }
            },
            isEnd() {
                if(this.playerHealth<=0){
                    this.playerHealth = 0;
                    setTimeout(function(){ alert("Przegrales"); }, 100);
                    this.restart();
                }
                if(this.monsterHealth<=0){
                    this.monsterHealth = 0;
                    setTimeout(function(){ alert("wygrales!"); }, 100);
                    this.restart();
                }
            },
            monsterAttack() {
                let dmg = this.randomNumber(1,20);
                this.turns.unshift({turn: this.monsterText() +' '+ dmg + ' obrazeń'});
                this.playerHealth-= dmg
               
            },
            playerAttack(){
                let dmg = this.randomNumber(2,15);
                this.turns.unshift({turn: this.playerText()+' '+ dmg+' obrażeń'});
                this.monsterHealth-= dmg
                
            },
            playerHeal(){
                let dmg = this.randomNumber(5,10);
                if(this.playerHealth+dmg>100){
                    this.playerHealth=100;
                    this.turns.unshift({turn: this.player+' w pełni wyleczony!'});
                }
                else{
                    this.turns.unshift({turn: this.player+' leczy się za '+ dmg+' hp'});
                    this.playerHealth+= dmg;
                }
            },
            attack(){
                if(this.playerHealth === 0||this.monsterHealth === 0){
                    return;
                }
                this.playerAttack();
                this.monsterAttack();
                this.isEnd();
            },
            heal(){
                if(this.playerHealth === 0||this.monsterHealth === 0){
                    return;
                }
                this.playerHeal();
                this.monsterAttack();
                this.isEnd();
            },
            surrender(){
                this.playerHealth = 0;
                this.isEnd();
            },
            startFight(){
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.turns= [];
            },
        }
    });
});