const monsterHealth = document.getElementById('monster-health');
const playerHealth = document.getElementById('player-health');
const bonusLife = document.getElementById('bonus-life');

const attackButton = document.getElementById('attack-btn');
const strongAttackButton = document.getElementById('strong-attack-btn');
const healButton = document.getElementById('heal-btn');
const showLogButton = document.getElementById('log-btn');

function setMonsterHealth(healthValue) {
  monsterHealth.max = healthValue;
  monsterHealth.value = healthValue;
}

function setPlayerHealth(healthValue) {
  playerHealth.max = healthValue;
  playerHealth.value = healthValue;
}

function attackMonster(attackValue) {
  monsterHealth.value -= attackValue;
}

function attackPlayer(attackValue) {
  playerHealth.value -= attackValue;
}

function healPlayer(healValue) {
  playerHealth.value += healValue;
}
