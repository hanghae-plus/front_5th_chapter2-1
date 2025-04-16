import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const $root = document.getElementById("root");

if ($root) {
  const root = createRoot($root);

  root.render(
    <StrictMode>
      <div>Hello World</div>
    </StrictMode>,
  );
}
