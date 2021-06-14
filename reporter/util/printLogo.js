const logo = [
  "     ___           ___           ___           ___           ___           ___     \n",
  "    |\\__\\         /\\  \\         /\\  \\         /\\__\\         /\\  \\         /\\  \\    \n",
  "    |:|  |       /::\\  \\       /::\\  \\       /::|  |       /::\\  \\        \\:\\  \\   \n",
  "    |:|  |      /:/\\:\\  \\     /:/\\:\\  \\     /:|:|  |      /:/\\:\\  \\        \\:\\  \\  \n",
  "    |:|__|__   /:/  \\:\\  \\   /::\\~\\:\\  \\   /:/|:|  |__   /::\\~\\:\\  \\       /::\\  \\ \n",
  "____/::::\\__\\ /:/__/ \\:\\__\\ /:/\\:\\ \\:\\__\\ /:/ |:| /\\__\\ /:/\\:\\ \\:\\__\\     /:/\\:\\__\\\n",
  "\\::::/~~/~    \\:\\  \\ /:/  / \\/_|::\\/:/  / \\/__|:|/:/  / \\:\\~\\:\\ \\/__/    /:/  \\/__/\n",
  " ~~|:|~~|      \\:\\  /:/  /     |:|::/  /      |:/:/  /   \\:\\ \\:\\__\\     /:/  /     \n",
  "   |:|  |       \\:\\/:/  /      |:|\\/__/       |::/  /     \\:\\ \\/__/     \\/__/      \n",
  "   |:|  |        \\::/  /       |:|  |         /:/  /       \\:\\__\\                  \n",
  `    \\|__|         \\/__/         \\|__|         \\/__/         \\/__/             v${require("../package.json").version}\n`,
];

// Joins the logo so that it has a rainbow effect.
console.log(logo.join("").rainbow);
