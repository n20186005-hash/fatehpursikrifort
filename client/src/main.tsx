import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
hydrateRoot(
  document.getElementById("root")!,
  <App path={window.location.pathname} />
);
// Retire the old offline cache so releases and weather cannot remain stale.
if ("serviceWorker" in navigator)
  navigator.serviceWorker
    .getRegistrations()
    .then(registrations =>
      Promise.all(registrations.map(registration => registration.unregister()))
    )
    .catch(() => {});
