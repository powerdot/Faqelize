import { describe, it, expect, vi } from "vitest";
import useDatabase from "../Database.ts";
import faqelizeConfig from "../../../faqelize.config";
import faqelizeCrypto from "../../../faqelize/plugins/crypto";

describe("Database", () => {
  it("get DATABASE_NOT_FOUND on fake route", async () => {
    const {
      pin,
      load,
      database,
      database_not_found,
      database_is_encrypted,
      pinned_ids,
      loading,
    } = new useDatabase({
      faqelizeConfig: {
        ...faqelizeConfig,
        database: "http://fakeroute:1234/database",
      },
      route: { query: {} },
      openItem: (item) => { },
      password: { value: "1234" },
      setPassword: (password) => { },
      passwordApplied: () => { },
      logout: () => { },
      SuggestPWAInstall: () => { },
    });

    await load();
    expect(database_not_found.value).toBe(true);
  });

  it("get INVALID_PASSWORD on real route", async () => {
    const {
      pin,
      load,
      database,
      database_not_found,
      database_is_encrypted,
      pinned_ids,
      loading,
    } = new useDatabase({
      faqelizeConfig: {
        ...faqelizeConfig,
        database: "https://powerdot.github.io/Faqelize/database_encrypted.json",
      },
      route: { query: {} },
      openItem: (item) => { },
      password: { value: "1235" },
      setPassword: (password) => { },
      passwordApplied: () => { },
      logout: () => { },
      SuggestPWAInstall: () => { },
    });

    await load();
    expect(database_not_found.value).toBe(false);
    expect(database.value.length).toBe(0);
  });

  it("get database on real route with raw password via route query", async () => {
    const password = { value: "" };
    const {
      pin,
      load,
      database,
      database_not_found,
      database_is_encrypted,
      pinned_ids,
      loading,
    } = new useDatabase({
      faqelizeConfig: {
        ...faqelizeConfig,
        database: "https://powerdot.github.io/Faqelize/database_encrypted.json",
        acceptPasswordParameter: true,
        passwordParameterKey: "password",
      },
      route: { query: { password: "1234" } },
      router: { push: (route) => { }, replace: (route) => { } },
      openItem: (item) => { },
      password,
      setPassword: (p) => {
        password.value = p.toString();
      },
      passwordApplied: () => { },
      logout: () => { },
      SuggestPWAInstall: () => { },
    });

    await load();

    expect(database_not_found.value).toBe(false);
    expect(database.value.length).not.toBe(0);
  });

  it("get database on real route with correct raw password", async () => {
    const {
      pin,
      load,
      database,
      database_not_found,
      database_is_encrypted,
      pinned_ids,
      loading,
    } = new useDatabase({
      faqelizeConfig: {
        ...faqelizeConfig,
        database: "https://powerdot.github.io/Faqelize/database_encrypted.json",
      },
      route: { query: {} },
      openItem: (item) => { },
      password: { value: "1234" },
      setPassword: (password) => { },
      passwordApplied: () => { },
      logout: () => { },
      SuggestPWAInstall: () => { },
    });

    await load();
    expect(database_not_found.value).toBe(false);
    expect(database.value.length).not.toBe(0);
  });

  it("get database on real route with hashed password via route query", async () => {
    const password = { value: "" };
    const {
      pin,
      load,
      database,
      database_not_found,
      database_is_encrypted,
      pinned_ids,
      loading,
    } = new useDatabase({
      faqelizeConfig: {
        ...faqelizeConfig,
        database: "https://powerdot.github.io/Faqelize/database_encrypted.json",
        acceptPasswordParameter: true,
        passwordParameterKey: "password",
      },
      route: { query: { password: faqelizeCrypto.hashPassword("1234") } },
      router: { push: (route) => { }, replace: (route) => { } },
      openItem: (item) => { },
      password,
      setPassword: (p) => {
        password.value = p.toString();
      },
      passwordApplied: () => { },
      logout: () => { },
      SuggestPWAInstall: () => { },
    });

    await load();
    expect(database_not_found.value).toBe(false);
    expect(database.value.length).not.toBe(0);
  });

  it("get database, pin first id and check pinned_ids", async () => {
    const {
      pin,
      load,
      database,
      database_not_found,
      database_is_encrypted,
      pinned_ids,
      loading,
    } = new useDatabase({
      faqelizeConfig: {
        ...faqelizeConfig,
        database: "https://powerdot.github.io/Faqelize/database_encrypted.json",
      },
      route: { query: {} },
      openItem: (item) => { },
      password: { value: "1234" },
      setPassword: (password) => { },
      passwordApplied: () => { },
      logout: () => { },
      SuggestPWAInstall: () => { },
    });

    await load();
    const first_id = database.value[0].id;
    pin({ id: first_id, pinned: true });
    expect(pinned_ids.value.length).toBe(1);
    expect(pinned_ids.value[0]).toBe(first_id);
  });

  it("get database, call openQuestion based on route query", async () => {
    const {
      pin,
      load,
      database,
      database_not_found,
      database_is_encrypted,
      pinned_ids,
      loading,
    } = new useDatabase({
      faqelizeConfig: {
        ...faqelizeConfig,
        database: "https://powerdot.github.io/Faqelize/database_encrypted.json",
      },
      route: { query: { q: "what_is_json_dict" } },
      openItem: (item) => {
        expect(item.id).toBe("what_is_json_dict");
      },
      password: { value: "1234" },
      setPassword: (password) => { },
      passwordApplied: () => { },
      logout: () => { },
      SuggestPWAInstall: () => { },
    });

    await load();
  });
});
