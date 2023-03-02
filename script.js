var places = [];
var speed = 300;
var playerTurnIndex = 1;

function CreateBox(index, name, level, value, owner) {
  this.index = index;
  this.name = name; // property name
  this.level = level; // property level (0 = not property)
  this.value = value; // (property value)
  this.owner = owner; // (property owner)
  if (this.level != 0) {
    //add property name to html
    this.node = document.querySelector(".div" + index);
    this.node.firstElementChild.append(name);
  }
  places.push(this);
}

var players = [];
function CreatePlayer(name, order, money, state, stop, position) {
  this.name = name; //名字
  this.order = order; //行進順序
  this.money = money; //目前持有金錢
  this.state = state; //狀態：活躍或破產
  this.stop = stop; //隔離天數
  this.position = position; //當前位置
  this.rollDice = false;
  players.push(this);
}

function startGame() {
  const player1Name = document.getElementById("typePlayer1Name").value;
  const player2Name = document.getElementById("typePlayer2Name").value;
  const player3Name = document.getElementById("typePlayer3Name").value;
  const player4Name = document.getElementById("typePlayer4Name").value;
  new CreatePlayer(player1Name, 1, 15000, "active", 0, 0);
  new CreatePlayer(player2Name, 2, 15000, "active", 0, 0);
  new CreatePlayer(player3Name, 3, 15000, "active", 0, 0);
  new CreatePlayer(player4Name, 4, 15000, "active", 0, 0);
  document.querySelector("#player1Name").innerText = player1Name;
  document.querySelector("#player2Name").innerText = player2Name;
  document.querySelector("#player3Name").innerText = player3Name;
  document.querySelector("#player4Name").innerText = player4Name;
  document.querySelector(".startPage").classList.add("hide");
  document.getElementById("playernow").innerText = players[0].name;
  for (i = 1; i <= players.length; i++) {
    const node = document.createElement("div");
    node.setAttribute("id", `player${i}Chess`);
    const img = document.createElement("img");
    img.src = `img/player${i}.png`;
    node.classList.add("playerIcon", "chess");
    node.appendChild(img);
    document.querySelector(".div0").appendChild(node);
  }
}

//Updated by Aqua 02.28 7:00pm
new CreateBox(0, "GO", 0, 2000, null);
new CreateBox(1, "將軍澳", 1, 1500, null);
new CreateBox(2, "機會", 0, 0, null);
new CreateBox(3, "愉景灣", 1, 2500, null);
new CreateBox(4, "東涌", 1, 1000, null);
new CreateBox(5, "銅鑼灣", 1, 2000, null);
new CreateBox(6, "黃大仙", 1, 1500, null);
new CreateBox(7, "港燈", 0, 600, null);
new CreateBox(8, "觀塘", 1, 1500, null);
new CreateBox(9, "葵涌", 1, 1500, null);
new CreateBox(10, "入住糟糕灣", 0, 0, null);
new CreateBox(11, "黃埔", 1, 1800, null);
new CreateBox(12, "入息税", 0, 800, null);
new CreateBox(13, "藍田", 1, 1300, null);
new CreateBox(14, "啟德", 1, 1800, null);
new CreateBox(15, "粉嶺", 1, 1000, null);
new CreateBox(16, "馬灣", 1, 2000, null);
new CreateBox(17, "機會", 0, 0, null);
new CreateBox(18, "長洲", 1, 1500, null);
new CreateBox(19, "馬鞍山", 1, 1800, null);
new CreateBox(20, "命運之輪", 0, 0, null);
new CreateBox(21, "薄扶林", 1, 3000, null);
new CreateBox(22, "中環", 1, 3000, null);
new CreateBox(23, "淺水灣", 1, 2500, null);
new CreateBox(24, "尖沙咀", 1, 3500, null);
new CreateBox(25, "機會", 0, 0, null);
new CreateBox(26, "大嶼山", 1, 2500, null);
new CreateBox(27, "印花稅", 0, 600, null);
new CreateBox(28, "深井", 1, 1000, null);
new CreateBox(29, "天水圍", 1, 1000, null);
new CreateBox(30, "免費泊車", 0, 0, null);
new CreateBox(31, "西營盤", 1, 1200, null);
new CreateBox(32, "奢侈稅", 0, 500, null);
new CreateBox(33, "北角", 1, 1500, null);
new CreateBox(34, "太古", 1, 2000, null);
new CreateBox(35, "利東", 1, 1800, null);
new CreateBox(36, "康城", 1, 2000, null);
new CreateBox(37, "機會", 0, 0, null);
new CreateBox(38, "欣澳", 1, 1800, null);
new CreateBox(39, "奧運", 1, 1800, null);

//Roll two dices area
function rollDice() {
  // Generate a random number between 1 and 6 for each die
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;

  // Calculate the total value of both dice
  const total = die1 + die2;
  let i = 1;

  // PlayerMoveOnly
  playerMove(playerTurnIndex);
  // NextPlayer Here, need to define when nextplayer
  if (playerTurnIndex < players.length) {
    playerTurnIndex += 1;
  } else {
    playerTurnIndex = 1;
  }
  document.getElementById("playernow").innerText =
    players[playerTurnIndex - 1].name;

  function playerMove(index) {
    setTimeout(function () {
      if (players[index - 1].position < 39) {
        players[index - 1].position += 1;
      } else {
        players[index - 1].position = 0;
      }
      console.log(players[index - 1].position);
      document.getElementById(`player${index}Chess`).remove();
      const node = document.createElement("div");
      node.setAttribute("id", `player${index}Chess`);
      const img = document.createElement("img");
      img.src = `img/player${index}.png`;
      node.classList.add("playerIcon", "chess");
      node.appendChild(img);
      document
        .querySelector(`.div${players[index - 1].position}`)
        .appendChild(node);
      i++;
      if (i <= total) {
        playerMove(index);
      }
    }, speed);
  }

  // Return an object containing the values of both dice and their total
  return {
    die1: die1,
    die2: die2,
    total: total,
  };
}

function rollAndDisplayDice() {
  const result = rollDice();
  const diceContainer = document.getElementById("dice-container");

  // Clear any existing dice from the container
  diceContainer.innerHTML = "";

  // Create an image for each die and add it to the container
  const die1Img = document.createElement("div");
  die1Img.classList.add("die");
  die1Img.style.backgroundImage = `url('img/${result.die1}.svg')`;
  diceContainer.appendChild(die1Img);

  const die2Img = document.createElement("div");
  die2Img.classList.add("die");
  die2Img.style.backgroundImage = `url('img/${result.die2}.svg')`;
  diceContainer.appendChild(die2Img);
}

<<<<<<< HEAD
var players = []
function CreatePlayer(name, order, money, state, stop, img, position){
  this.name = name //名字
  this.order = order //行進順序
  this.money = money //目前持有金錢
  this.state = state //狀態：活躍或破產
  this.stop = stop //隔離天數
  this.img = img //角色棋子圖片
  this.position = position //當前位置
  players.push(this)
}

new CreatePlayer("Nana", 1, 15000, "active", 0, 'img/player1.png', 0)
new CreatePlayer("亞視一姐", 2, 15000, "active", 0, 'img/player2.png', 0)
new CreatePlayer("Happy 8", 3, 15000, "active", 0, 'img/player3.png', 0)
new CreatePlayer("港大美女", 4, 15000, "active", 0, 'img/player4.png', 0)
=======
//Controlling Speed
function speedControl() {
  if (speed == 300) {
    speed = 1;
    document.getElementById("speedControlBtn").innerText = "加速遊戲：快";
  } else {
    speed = 300;
    document.getElementById("speedControlBtn").innerText = "加速遊戲：正常";
  }
}
>>>>>>> 472ca2bcfb469568062bde5c1fe693e5622f97ed
