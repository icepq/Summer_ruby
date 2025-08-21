// DOMの読み込み完了後に実行するための記述
document.addEventListener('DOMContentLoaded', () => {
  const reels = [
      document.getElementById('reel1'),
      document.getElementById('reel2'),
      document.getElementById('reel3')
  ];
  const spinButton = document.getElementById('spin-button');
  const resultDiv = document.getElementById('result');

  // spinButtonなどが存在しないページでエラーになるのを防ぐ
  if (!spinButton) return;

  const slotOptions = [1, 1, 1, 3, 3, 5, 10];

  let isSpinning = [false, false, false];
  let intervals = [null, null, null];
  let stopCount = 0;

  spinButton.addEventListener('click', () => {
      if (stopCount === 0) {
          startSpin();
      } else {
          stopReel();
      }
  });

  function startSpin() {
      spinButton.textContent = 'ストップ！';
      resultDiv.textContent = '';
      stopCount = 0;

      isSpinning.forEach((_, index) => {
          isSpinning[index] = true;
          reels[index].classList.add('spinning');
          intervals[index] = setInterval(() => {
              const randomIndex = Math.floor(Math.random() * slotOptions.length);
              reels[index].textContent = slotOptions[randomIndex];
          }, 100);
      });

      stopCount = 1;
  }

  function stopReel() {
      const reelToStop = stopCount - 1;

      if (isSpinning[reelToStop]) {
          clearInterval(intervals[reelToStop]);
          isSpinning[reelToStop] = false;
          reels[reelToStop].classList.remove('spinning');

          const randomIndex = Math.floor(Math.random() * slotOptions.length);
          reels[reelToStop].textContent = slotOptions[randomIndex];

          stopCount++;
      }

      if (stopCount > 3) {
          calculateResult();
          spinButton.textContent = '（＾-＾）';
          stopCount = 0;
      }
  }

  function calculateResult() {
      const value1 = parseInt(reels[0].textContent, 10);
      const value2 = parseInt(reels[1].textContent, 10);
      const value3 = parseInt(reels[2].textContent, 10);

      const total = value1 + value2 + value3;

      resultDiv.textContent = `今日私は、${total}km 散歩します！！`;
  }
});