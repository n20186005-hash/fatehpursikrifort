import test from "node:test";
import assert from "node:assert/strict";
import { choiceStore } from "../client/src/lib/analytics";
function storage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
}
test("denial, confirmed grant, withdrawal and regrant", () => {
  const local = storage(),
    session = storage();
  const choice = choiceStore(
    () => local,
    () => session
  );
  assert.equal(choice.read(), false);
  assert.equal(choice.save(true).granted, true);
  assert.equal(choice.read(), true);
  assert.equal(choice.save(false).granted, false);
  assert.equal(choice.read(), false);
  assert.equal(choice.save(true).granted, true);
  assert.equal(
    choiceStore(
      () => local,
      () => storage()
    ).read(),
    true
  );
  local.removeItem("fs-cookie-analytics");
  assert.equal(choice.read(), false);
});
test("read failures and unverifiable writes stay denied, including a fresh tab", () => {
  for (const old of [false, true])
    for (const boundary of [
      "local-read",
      "session-read",
      "local-write",
      "session-clear",
    ]) {
      const local = storage(old ? { "fs-cookie-analytics": "granted" } : {}),
        session = storage({ "fs-analytics-veto": "denied" });
      const shared = {
        ...local,
        ...(boundary === "local-read"
          ? {
              getItem() {
                throw new Error("blocked");
              },
            }
          : {}),
        ...(boundary === "local-write" ? { setItem() {} } : {}),
      };
      const tab = {
        ...session,
        ...(boundary === "session-read"
          ? {
              getItem() {
                throw new Error("blocked");
              },
            }
          : {}),
        ...(boundary === "session-clear" ? { removeItem() {} } : {}),
      };
      const choice = choiceStore(
        () => shared,
        () => tab
      );
      const result = choice.save(true);
      assert.equal(result.granted, false, boundary);
      assert.equal(choice.read(), false);
      if (!result.otherTabsMayRemain)
        assert.equal(
          choiceStore(
            () => local,
            () => storage()
          ).read(),
          false
        );
    }
});
test("readback refusal and failed refusal/removal report possible retained permission", () => {
  const local = { getItem: () => "granted", setItem() {}, removeItem() {} };
  const choice = choiceStore(
    () => local,
    () => storage()
  );
  const result = choice.save(false);
  assert.equal(result.granted, false);
  assert.equal(result.saved, false);
  assert.equal(result.otherTabsMayRemain, true);
});
test("runtime denial and loaded-library regrant do not duplicate the loader or config", async () => {
  const local = storage(),
    session = storage();
  const scripts: any[] = [];
  const listeners = new Map();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: local,
      sessionStorage: session,
      dataLayer: [],
      addEventListener: (name: string, cb: any) => listeners.set(name, cb),
      removeEventListener: (name: string) => listeners.delete(name),
    },
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      querySelector: () => scripts[0] ?? null,
      createElement: () => ({ dataset: {} }),
      head: { appendChild: (script: any) => scripts.push(script) },
    },
  });
  const analytics = await import("../client/src/lib/analytics");
  const cleanup = analytics.initializeAnalytics();
  assert.equal(scripts.length, 0);
  assert.equal(analytics.saveAnalytics(true).granted, true);
  assert.equal(scripts.length, 1);
  assert.equal(analytics.saveAnalytics(false).granted, false);
  assert.equal((window as any)["ga-disable-G-HXM22WWPKP"], true);
  assert.equal(analytics.saveAnalytics(true).granted, true);
  assert.equal(scripts.length, 1);
  assert.equal(
    window.dataLayer!.filter((entry: any) => entry[0] === "config").length,
    1
  );
  local.removeItem("fs-cookie-analytics");
  listeners.get("storage")({ key: "fs-cookie-analytics" });
  assert.equal((window as any)["ga-disable-G-HXM22WWPKP"], true);
  cleanup();
});
test("late read failure rolls back an attempted grant and reports any unverified permission", () => {
  const local = storage();
  let reads = 0;
  const failing = {
    ...local,
    getItem(key: string) {
      if (++reads >= 3) throw new Error("late failure");
      return local.getItem(key);
    },
  };
  const result = choiceStore(
    () => failing,
    () => storage()
  ).save(true);
  assert.equal(result.granted, false);
  assert.equal(result.saved, false);
  assert.equal(result.otherTabsMayRemain, true);
});
