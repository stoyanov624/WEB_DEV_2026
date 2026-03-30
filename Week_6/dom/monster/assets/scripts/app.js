// const MONSTER_HEALTH = 100;
// const PLAYER_HEALTH = 100;
// const MONSTER_MAX_ATTACK = 10;
// const PLAYER_MAX_ATTACK = 10;
// const PLAYER_MAX_STRONG_ATTACK = 20;
// const PLAYER_HEAL = 500;

// function startNewGame() {
//   setMonsterHealth(MONSTER_HEALTH);
//   setPlayerHealth(PLAYER_HEALTH);
// }

// function handleEndOfTurn() {
//   if (playerHealth.value <= 0 && monsterHealth.value > 0) {
//     alert('YOU DIED! MONSTER WON!');
//     startNewGame();
//   } else if (monsterHealth.value <= 0 && playerHealth.value > 0) {
//     alert('MONSTER DIED! YOU WON!');
//     startNewGame();
//   } else if (monsterHealth.value <= 0 && playerHealth.value <= 0) {
//     alert('DRAW!');
//     startNewGame();
//   }
// }

// function handleAttackTurn() {
//   attackMonster(Math.floor(Math.random() * PLAYER_MAX_ATTACK));
//   attackPlayer(Math.floor(Math.random() * MONSTER_MAX_ATTACK));
//   handleEndOfTurn();
// }

// function handleStrongAttackTurn() {
//   attackMonster(Math.floor(Math.random() * PLAYER_MAX_STRONG_ATTACK));
//   attackPlayer(Math.floor(Math.random() * MONSTER_MAX_ATTACK));
//   handleEndOfTurn();
// }

// function handleHealTurn() {
//   healPlayer(Math.floor(Math.random() * PLAYER_HEAL));
//   attackPlayer(Math.floor(Math.random() * MONSTER_MAX_ATTACK));
//   handleEndOfTurn();
// }

// startNewGame();
// attackButton.addEventListener('click', handleAttackTurn);
// strongAttackButton.addEventListener('click', handleStrongAttackTurn);
// healButton.addEventListener('click', handleHealTurn);

// Constants
const MAX_VALUES = {
  monsterHealth: 100,
  playerHealth: 100,
  monsterAttack: 10,
  playerAttack: 10,
  playerStrongAttack: 20,
  playerHeal: 60,
};

// Base Character class
class Character {
  constructor(name, health, maxAttack) {
    this.name = name;
    this.health = health;
    this.maxAttack = maxAttack;
  }

  attack(target, maxDamage = this.maxAttack) {
    const damage = Math.floor(Math.random() * maxDamage) + 1;
    target.takeDamage(damage);
    return damage;
  }

  takeDamage(damage) {
    this.health = Math.max(this.health - damage, 0);
  }

  isAlive() {
    return this.health > 0;
  }
}

// Player class
class Player extends Character {
  constructor(name, health, maxAttack, maxStrongAttack, maxHeal) {
    super(name, health, maxAttack);
    this.maxStrongAttack = maxStrongAttack;
    this.maxHeal = maxHeal;
  }

  strongAttack(target) {
    return this.attack(target, this.maxStrongAttack);
  }

  heal() {
    const healValue = Math.floor(Math.random() * this.maxHeal) + 1;
    this.health = Math.min(this.health + healValue, MAX_VALUES.playerHealth);
    return healValue;
  }
}

// Monster class
class Monster extends Character {
  constructor(name, health, maxAttack) {
    super(name, health, maxAttack);
  }
}

// Game Engine
class GameEngine {
  constructor(player, monster) {
    this.player = player;
    this.monster = monster;
    this.combatLog = [];
  }

  // Player attacks
  playerAttack(strong = false) {
    let actionLog = '';
    if (strong) {
      const damage = this.player.strongAttack(this.monster);
      actionLog += `Player hits Monster STRONGLY for ${damage} damage.\n`;
    } else {
      const damage = this.player.attack(this.monster);
      actionLog += `Player hits Monster for ${damage} damage.\n`;
    }

    if (this.monster.isAlive()) {
      const damage = this.monster.attack(this.player);
      actionLog += `Monster attacks Player for ${damage} damage.\n`;
    }

    this.combatLog.push(actionLog.trim());
    return actionLog;
  }

  // Player heals
  playerHeal() {
    const healValue = this.player.heal();
    let actionLog = `Player heals for ${healValue} HP.\n`;

    if (this.monster.isAlive()) {
      const damage = this.monster.attack(this.player);
      actionLog += `Monster attacks Player for ${damage} damage.\n`;
    }

    this.combatLog.push(actionLog.trim());
    return actionLog;
  }

  checkEndOfGame() {
    if (!this.player.isAlive() && !this.monster.isAlive()) return 'DRAW';
    if (!this.player.isAlive()) return 'MONSTER_WON';
    if (!this.monster.isAlive()) return 'PLAYER_WON';
    return 'CONTINUE';
  }

  reset() {
    this.player.health = MAX_VALUES.playerHealth;
    this.monster.health = MAX_VALUES.monsterHealth;
    console.log(this.combatLog);
    this.combatLog = [];
  }
}

class GameUI {
  constructor(gameEngine) {
    this.game = gameEngine;

    // DOM Elements
    this.playerHealthEl = document.getElementById('player-health');
    this.monsterHealthEl = document.getElementById('monster-health');
    this.attackBtn = document.getElementById('attack-btn');
    this.strongAttackBtn = document.getElementById('strong-attack-btn');
    this.healBtn = document.getElementById('heal-btn');
    this.logEl = document.getElementById('combat-log'); // optional <textarea> or <div>

    this.initEventListeners();
    this.updateUI();
  }

  initEventListeners() {
    this.attackBtn.addEventListener('click', () => this.handleAttack(false));
    this.strongAttackBtn.addEventListener('click', () =>
      this.handleAttack(true),
    );
    this.healBtn.addEventListener('click', () => this.handleHeal());
  }

  handleAttack(strong) {
    const log = this.game.playerAttack(strong);
    this.updateUI();
    this.appendLog(log);
    this.checkGameEnd();
  }

  handleHeal() {
    const log = this.game.playerHeal();
    this.updateUI();
    this.appendLog(log);
    this.checkGameEnd();
  }

  updateUI() {
    this.playerHealthEl.value = this.game.player.health;
    this.monsterHealthEl.value = this.game.monster.health;
  }

  appendLog(logText) {
    if (!this.logEl) return;
    this.logEl.value += logText + '\n---\n';
    this.logEl.scrollTop = this.logEl.scrollHeight;
  }

  checkGameEnd() {
    const result = this.game.checkEndOfGame();
    if (result !== 'CONTINUE') {
      alert(result.replace('_', ' '));
      this.game.reset();
      this.updateUI();
      if (this.logEl) this.logEl.value = '';
    }
  }
}

// Initialize
const player = new Player('Hero', 100, 10, 20, 60);
const monster = new Monster('Monster', 100, 10);
const engine = new GameEngine(player, monster);
const ui = new GameUI(engine);
