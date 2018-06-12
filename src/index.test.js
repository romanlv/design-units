import du from "./index";

const theme = {
  breakpoints: [320, 480, 640],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    blue: "#1A6EC1",
    green: "#427D00"
  },
  fonts: {
    serif: "athelas, georgia, times, serif"
  }
};

describe("breakpoints", () => {
  const props = {
    theme
  };

  it("should get space value", () => {
    expect(du({ padding: 2, margin: "0.2em" })(props)).toEqual({
      padding: "8px",
      margin: "0.2em"
    });
  });

  it("should split to breakpoints", () => {
    expect(du({ padding: [2, 3] })(props)).toEqual({
      "@media (min-width: 320px)": {
        padding: "8px"
      },
      "@media (min-width: 480px)": {
        padding: "16px"
      }
    });
  });

  it("should split to breakpoints, multi values", () => {
    expect(
      du({ padding: [2, 3], marginTop: 1, marginBottom: [1, 2] })(props)
    ).toEqual({
      marginTop: "4px",
      "@media (min-width: 320px)": {
        padding: "8px",
        marginBottom: "4px"
      },
      "@media (min-width: 480px)": {
        padding: "16px",
        marginBottom: "8px"
      }
    });
  });

  it("should return width in %", () => {
    expect(du({ width: 0.5 })(props)).toEqual({ width: "50%" });
    expect(du({ width: 1 })(props)).toEqual({ width: "100%" });
    expect(du({ width: 300 })(props)).toEqual({ width: "300px" });
  });

  it("should work with colors", () => {
    expect(du({ backgroundColor: "green" })(props)).toEqual({
      backgroundColor: "#427D00"
    });
  });

  it("should work even if theme is not defined", () => {
    expect(du({ backgroundColor: "green" })({})).toEqual({
      backgroundColor: "green"
    });
  });

  it("should return font", () => {
    expect(du({ fontFamily: "serif" })(props)).toEqual({
      fontFamily: "athelas, georgia, times, serif"
    });
  });
});
