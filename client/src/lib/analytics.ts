const KEY = "fs-cookie-analytics";
const VETO = "fs-analytics-veto";
const ID = "G-HXM22WWPKP";
type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export function choiceStore(local: () => Store, session: () => Store) {
  let pageDenied = false;
  function read() {
    try {
      return (
        !pageDenied &&
        session().getItem(VETO) !== "denied" &&
        local().getItem(KEY) === "granted"
      );
    } catch {
      return false;
    }
  }
  function refuse() {
    pageDenied = true;
    let tab = false,
      shared = false;
    try {
      session().setItem(VETO, "denied");
      tab = session().getItem(VETO) === "denied";
    } catch {}
    try {
      local().setItem(KEY, "denied");
      shared = local().getItem(KEY) === "denied";
    } catch {}
    if (!shared)
      try {
        local().removeItem(KEY);
        shared = local().getItem(KEY) === null;
      } catch {}
    return {
      granted: false,
      saved: shared && tab,
      otherTabsMayRemain: !shared,
      tabOnly: !tab,
    };
  }
  function save(granted: boolean) {
    if (!granted) return refuse();
    pageDenied = true;
    try {
      // A grant is effective only after both stores confirm the complete choice.
      local().getItem(KEY);
      session().getItem(VETO);
      local().removeItem(KEY);
      if (local().getItem(KEY) !== null) throw new Error("old permission");
      session().removeItem(VETO);
      if (session().getItem(VETO) !== null) throw new Error("veto");
      local().setItem(KEY, "granted");
      if (
        local().getItem(KEY) !== "granted" ||
        session().getItem(VETO) !== null
      )
        throw new Error("unconfirmed");
      pageDenied = false;
      return {
        granted: true,
        saved: true,
        otherTabsMayRemain: false,
        tabOnly: false,
      };
    } catch {
      return refuse();
    }
  }
  return { read, save };
}
let choices: ReturnType<typeof choiceStore> | undefined;
function store() {
  return (choices ??= choiceStore(
    () => window.localStorage,
    () => window.sessionStorage
  ));
}
function gtag(...args: unknown[]) {
  (window.dataLayer ??= []).push(args);
}
let configured = false;
function apply(granted: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${ID}`] = !granted;
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  if (granted && !configured) {
    configured = true;
    gtag("js", new Date());
    gtag("config", ID, { anonymize_ip: true });
    if (!document.querySelector("script[data-fs-ga]")) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
      script.dataset.fsGa = ID;
      document.head.appendChild(script);
    }
  }
}
export function analyticsChoice() {
  return store().read();
}
export function saveAnalytics(granted: boolean) {
  apply(false);
  const result = store().save(granted);
  apply(result.granted);
  return result;
}
export function initializeAnalytics() {
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  apply(store().read());
  const listener = (event: StorageEvent) => {
    if (event.key === KEY || event.key === null) apply(store().read());
  };
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}
declare global {
  interface Window {
    dataLayer?: unknown[][];
  }
}
