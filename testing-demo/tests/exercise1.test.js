const lib = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw if input is not a number.", () => {
    expect(() => lib.fizzBuzz("1")).toThrow();
    expect(() => lib.fizzBuzz(null)).toThrow();
    expect(() => lib.fizzBuzz(undefined)).toThrow();
    expect(() => lib.fizzBuzz({})).toThrow();
  });

  it("should return FizzBuzz if input is divisible by 3 and 5.", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toContain("Fizz");
    expect(result).toContain("Buzz");
  });

  it("should return only Fizz if input is only divisible by 3.", () => {
    const result = lib.fizzBuzz(9);
    expect(result).toContain("Fizz");
    expect(result).not.toContain("Buzz");
  });

  it("should return only Buzz if input is only divisible by 5.", () => {
    const result = lib.fizzBuzz(10);
    expect(result).toContain("Buzz");
    expect(result).not.toContain("Fizz");
  });

  it("should return input if input is not divisible by 3 or 5.", () => {
    const result = lib.fizzBuzz(7);
    expect(result).toBe(7);
    expect(result).not.toContain("Buzz");
    expect(result).not.toContain("Fizz");
  });
});
