function UnityProgress(gameInstance, progress) {
  if (!gameInstance.Module) return;

  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
    gameInstance.container.appendChild(gameInstance.logo);
  }

  if (!gameInstance.statusText) {
    gameInstance.statusText = document.createElement("div");
    gameInstance.statusText.style.cssText = "position: absolute; left: 50%; top: 70%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); color: #FFFFFF; text-align: center; font-size: 16px; font-family: Arial;";
    gameInstance.container.appendChild(gameInstance.statusText);
    gameInstance.statusText.textContent = "Loading Engine...";
  }

  if (typeof progress === 'string') {
    gameInstance.statusText.textContent = progress;
  }

  if (progress === 1) {
    if (gameInstance.logo) gameInstance.logo.style.display = 'none';
    if (gameInstance.statusText) gameInstance.statusText.style.display = 'none';
  }
}