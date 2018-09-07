const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should return a positive number if input is positive.", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative.", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0.", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message.", () => {
    const result = lib.greet("Mosh");
    expect(result).toContain("Mosh");
    expect(result).toMatch(/Mosh/);
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies.", () => {
    const result = lib.getCurrencies();

    // too general
    expect(result).toBeDefined();
    // too general
    expect(result).not.toBeNull();

    // too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");

    // too specific
    expect(result.length).toBe(3);

    // proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id.", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });

    // test for only these 2 properties if any more doesn't matter
    expect(result).toMatchObject({ id: 1, price: 10 });

    // be specific with type of property
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy.", () => {
    //Falsy in js::  Null, undefined, NaN, '', 0, false
    [null, undefined, NaN, "", 0, false].forEach(a =>
      expect(() => lib.registerUser(a)).toThrow()
    );
  });

  it("should return a user object if valid username is passed.", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points.", () => {
    // Mocking/ Faking the function
    db.getCustomerSync = customerId => {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer.", () => {
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error(".."));

    // Mocking/ Faking the function
    db.getCustomerSync = jest.fn().mockReturnValue({email:'a'});

    // Mocking/ Faking the function
    mail.send = jest.fn();

    const order = { customerId: 1 };
    lib.notifyCustomer(order);
    
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toContain('order');
  });
});
