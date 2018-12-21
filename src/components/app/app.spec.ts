import { BootMarkApp } from "./app";

describe("boot-mark", () => {
  it("builds", () => {
    expect(new BootMarkApp()).toBeTruthy();
  });
});
