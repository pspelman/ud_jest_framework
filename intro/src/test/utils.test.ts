import { Utils } from "../app/utils";

describe("Utils test suite", () => {
  beforeAll(() => {
    console.log(`all tests about to run`);
  });

  beforeEach(() => {
    console.log(`Before each test...`);
  });

  test("first test", () => {
    const result = Utils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  test("check URL", () => {
    const parsedUrl = Utils.parseUrl("http://localhost:8080/login");
    expect(parsedUrl.href).toBe("http://localhost:8080/login");
    expect(parsedUrl.port).toBe("8080");
    expect(parsedUrl.protocol).toBe("http:");
    expect(parsedUrl.query).toEqual({});
  });

  test("parse URL with query", () => {
    const parsedUrl = Utils.parseUrl(
      "http://localhost:8080/login?user=user&password=pass"
    );
    const expectedQuery = {
      user: "user",
      password: "pass",
    };
    expect(parsedUrl.query).toEqual(expectedQuery);
  });

  test("invalid URL throws error", () => {
    function expectError() {
      Utils.parseUrl("");
    }

    expect(expectError).toThrowError();
    expect(expectError).toThrow("Empty URL");
  });

  test("invalid URL with arrow function throws error", () => {
    expect(()=>{
        Utils.parseUrl("");
    }).toThrowError();
  });


  test("invalid URL with try catch will throw error", () => {
    try {
      Utils.parseUrl("");

    } catch (error){
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Empty URL')
    }
  });



  // test.only("only this test", () => {
  //   console.log(`only running this test`);
  // });

  test.todo("need to write this test");
});
