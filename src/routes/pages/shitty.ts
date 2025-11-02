import { Router } from 'express';
const router = Router();

router.get('/shitty', (req, res) => {
  res
    .status(200)
    .set({
      'Content-Type': 'text/html',
      // ✅ allow inline <script> and external media (Dropbox, Minecraft Wiki)
      'Content-Security-Policy': `
        default-src 'self' data: blob: https://www.dropbox.com https://minecraft.wiki;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://esm.sh;
        connect-src 'self' https://esm.sh;
        media-src 'self' https://www.dropbox.com https://minecraft.wiki;
        style-src 'self' 'unsafe-inline';
        font-src 'self' data:;
      `.replace(/\n/g, ' '),
    })
    .header('Content-Type', 'text/html')
    .send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>💊 CHV Equipment Battle</title>
  <style>
    body {
      background-color: #1e1e1e;
      font-family: Arial, sans-serif;
      color: white;
      text-align: center;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    .container {
      padding: 2rem;
      font-weight: bold;
    }

    .btn {
      display: inline-block;
      padding: 15px 30px;
      margin: 10px;
      color: white;
      font-size: 1.1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;
      user-select: none;
    }

    .btn:hover {
      transform: scale(1.05);
    }

    .btn_clothes { background-color: #607d8b; }
    .btn_weapon { background-color: #f44336; }
    .btn_head { background-color: #3f51b5; }
    .btn_artifact { background-color: #9c27b0; }
    .btn_attack { background-color: #ff9800; }
    .btn_defend { background-color: #4caf50; }

    .win-text {
      font-size: 1.5rem;
      color: #4caf50;
      margin-top: 20px;
    }

    .item-info {
      margin-top: 1rem;
      font-style: italic;
      font-size: 1rem;
      color: #ccc;
    }

    .stats-box {
      background-color: #fff;
      color: #000;
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 10px;
      font-family: 'Copperplate', 'Papyrus', sans-serif;
      width: fit-content;
      margin-inline: auto;
    }

    @keyframes backgroundPulse {
      0% { background-color: #1e1e1e; }
      50% { background-color: #2e2e2e; }
      100% { background-color: #1e1e1e; }
    }

    body {
      animation: backgroundPulse 5s infinite;
    }
  </style>
</head>
<body>
  <div class="container">
    <div id="buttons"></div>
    <div id="stats"></div>
    <div id="equipped"></div>
    <div id="actions"></div>
    <div id="result"></div>
  </div>

  <audio id="no-sound" src="https://www.dropbox.com/scl/fi/sog10squzlcguksx62phv/CHV_audio19.mp3?raw=1"></audio>
  <audio id="psnay-dies" src="https://www.dropbox.com/scl/fi/zv66nv3yfq7ezg1ahefw9/TooLateBoy.mp3?raw=1"></audio>
  <audio id="attack-sound" src="https://www.dropbox.com/scl/fi/ysgouvg3kz9sh2fl6my5c/CHV_audio17-2.mp3?raw=1"></audio>
  <audio id="equip" src="https://minecraft.wiki/images/Equip_iron2.ogg"></audio>

  <script type="module">
    // === Player & Enemy base data ===
    const basePlayer = { hp: 100, atk: 99, def: 15 };
    let player = { ...basePlayer };
    let enemy = { hp: 100, atk: 20, def: 1 };
    let selectedItem = null;

    // === Utility functions ===
    const playSound = (id) => {
      const s = document.getElementById(id);
      if (s) {
        s.currentTime = 0;
        s.play().catch(() => {});
      }
    };

    const updateStats = () => {
      document.getElementById('stats').innerHTML = \`
        <div class="stats-box">
          CHV - HP: \${player.hp}, ATK: \${player.atk}, DEF: \${player.def}<br>
          Enemy: psnay - HP: \${enemy.hp.toFixed(1)}, ATK: \${enemy.atk}, DEF: \${enemy.def}
        </div>
      \`;
    };

    const updateEquipped = () => {
      const eq = document.getElementById('equipped');
      const sound = document.getElementById("equip");
      sound.currentTime = 0;
      sound.play();
      eq.innerHTML = selectedItem ? \`<div class="item-info">Equipped: \${selectedItem}</div>\` : '';
    };

    const updateActions = () => {
      const actions = document.getElementById('actions');
      if (enemy.hp > 0) {
        actions.innerHTML = \`
          <div class="btn btn_attack" id="attackBtn">Attack</div>
          <div class="btn btn_defend" id="defendBtn">Defend</div>
        \`;
        document.getElementById('attackBtn').onclick = handleAttack;
        document.getElementById('defendBtn').onclick = handleDefend;
      } else {
        actions.innerHTML = \`<div class="win-text">VICTORY! You defeated the enemy!</div>\`;
      }
    };

    // === Combat logic ===
    const handleAttack = () => {
      const damage = Math.max(player.atk - enemy.def, 0);
      const newHp = Math.max(enemy.hp - damage, 0);
      enemy.hp = newHp;
      playSound(newHp === 0 ? "psnay-dies" : "attack-sound");
      updateUI();
    };

    const handleDefend = () => {
      const damage = Math.max(enemy.atk - player.def, 0);
      const newHp = Math.max(player.hp - damage, 0);
      if (newHp === 0) {
        playSound("no-sound");
        player.hp = basePlayer.hp;
      } else player.hp = newHp;
      updateUI();
    };

    const applyEquipment = (bonus) => {
      player.atk = basePlayer.atk + (bonus.atk || 0);
      player.def = basePlayer.def + (bonus.def || 0);
      selectedItem = bonus.name;
      playSound("equip");
      updateUI();
    };

    // === UI rendering ===
    const updateUI = () => {
      updateStats();
      updateEquipped();
      updateActions();
    };

    const renderEquipmentButtons = () => {
      const btns = document.getElementById('buttons');
      btns.innerHTML = '';
      const equipments = [
        { label: 'Clothes', class: 'btn_clothes', bonus: { def: 15, name: 'Clothes +15 DEF' } },
        { label: 'Weapon', class: 'btn_weapon', bonus: { atk: 15, name: 'Weapon +15 ATK' } },
        { label: 'Head', class: 'btn_head', bonus: { def: 2, name: 'Helmet +2 DEF' } },
        { label: 'Artifact', class: 'btn_artifact', bonus: { atk: 5, def: 5, name: 'Artifact +5 ATK/DEF' } },
      ];

      equipments.forEach(eq => {
        const div = document.createElement('div');
        div.className = 'btn ' + eq.class;
        div.textContent = eq.label;
        div.onclick = () => applyEquipment(eq.bonus);
        btns.appendChild(div);
      });
    };

    // === Initialize ===
    renderEquipmentButtons();
    updateUI();
  </script>
</body>
</html>`);
});

export default router;
