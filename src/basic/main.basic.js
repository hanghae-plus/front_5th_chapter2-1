import { createRootChildren, setUp } from "./app/index.js";

function main() {
  const root = document.getElementById("app");
  const cont = createRootChildren();
  root.appendChild(cont);

  setUp();
}

main();
