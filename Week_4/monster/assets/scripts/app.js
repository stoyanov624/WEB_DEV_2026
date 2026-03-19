const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 20;
const HEAL_VALUE = 10;

let chosenMaxLife = 100;
let hasBonusLife;
let currentMonsterHealth;
let currentPlayerHealth;

const setMaxLife = () => {
  const enteredMaxLife = parseInt(prompt('Max life: ', '100'));

  if (!isNaN(enteredMaxLife) && enteredMaxLife >= 0) {
    chosenMaxLife = enteredMaxLife;
  }
};

const initiateNewGame = () => {
  setMaxLife();
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  hasBonusLife = true;

  adjustHealthBars(chosenMaxLife);
  addBonusLife();
};

const getDamageByAttackType = (attackType) => {
  if (attackType === 'ATTACK') {
    return ATTACK_VALUE;
  } else if (attackType === 'STRONG_ATTACK') {
    return STRONG_ATTACK_VALUE;
  }
  return ATTACK_VALUE;
};

const endRound = () => {
  const damageToPlayer = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= damageToPlayer;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = chosenMaxLife;
    setPlayerHealth(currentPlayerHealth);
    alert('Bonus life wasted!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('DRAW!');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    initiateNewGame();
  }
};

const attackMonster = (attackType) => {
  let maxDamage = getDamageByAttackType(attackType);
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  endRound();
};

const healPlayerHandler = () => {
  increasePlayerHealth(HEAL_VALUE);

  if (currentPlayerHealth + HEAL_VALUE >= chosenMaxLife) {
    currentPlayerHealth = chosenMaxLife;
  } else {
    currentPlayerHealth += HEAL_VALUE;
  }

  endRound();
};

const attackHandler = () => {
  attackMonster('ATTACK');
};

const strongAttackHandler = () => {
  attackMonster('STRONG_ATTACK');
};

initiateNewGame();
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
