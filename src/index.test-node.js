import du from "./index";

describe("design-units in node", () => {
  it("should not have document defined", () => {
    expect(typeof document).toBe("undefined");
  });

  it("should not add px or other units by default", () => {
    expect(du({ width: 200 })({})).toEqual({
      width: "200px"
    });
  });
});
