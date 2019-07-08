import du from "./index";

describe("design-units in react-native", () => {
  it("should have RN env setup properly", () => {
    expect(typeof document).toBe("undefined");
    expect(global.navigator).toHaveProperty("product", "ReactNative");
  });

  it("should add px by default", () => {
    expect(du({ width: 200 })({})).toEqual({
      width: 200
    });
  });
});
