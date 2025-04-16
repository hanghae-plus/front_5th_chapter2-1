import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "#advanced/styles/tailwind.css";

const $root = document.getElementById("root");

if ($root) {
  const root = createRoot($root);

  root.render(
    <StrictMode>
      <div className="text-red-500">Hello World</div>
    </StrictMode>,
  );
}
