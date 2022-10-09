import { describe, it, expect, vi } from "vitest";
import usePassword from "../Password.ts";

describe("Password", () => {
  it("setPassword test", async () => {
    const search_query = { value: "" };
    const results = { value: [] };
    const { setPassword, passwordApplied, logout, password, password_applied } =
      usePassword({
        search_query,
        results,
      });

    setPassword("1234");
    passwordApplied();
    expect(password.value).toBe("1234");
    expect(password_applied.value).toBe(true);
  });

  it("logout test", async () => {
    const search_query = { value: "" };
    const results = { value: [] };
    const { setPassword, passwordApplied, logout, password, password_applied } =
      usePassword({
        search_query,
        results,
      });

    setPassword("1234");
    passwordApplied();
    search_query.value = "search";
    results.value = [{}];
    logout();

    expect(password.value).toBe("");
    expect(password_applied.value).toBe(false);
    expect(search_query.value).toBe("");
    expect(results.value.length).toBe(0);
  });
});
