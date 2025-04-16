import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "#advanced/styles/tailwind.css";
import MainPage from "#advanced/pages/Main";

const $root = document.getElementById("root");

if ($root) {
  const root = createRoot($root);

  root.render(
    <StrictMode>
      <MainPage />
    </StrictMode>,
  );
}
