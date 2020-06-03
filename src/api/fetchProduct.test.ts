import fetchProduct from "./fetchProduct";
import assert from "assert";

describe("api/fetchProduct", () => {
  describe("GIVEN a successful API call", () => {
    const successfulResponse = {
      id: "123",
      name: "Foo Fighters Foo Bar",
    };

    beforeAll(() => {
      // @ts-ignore TODO: Figure out what TS is moaning about another time
      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ result: successfulResponse }),
        })
      );
    });

    it("SHOULD return product details", async () => {
      const result = await fetchProduct("1");
      expect(result).toBe(successfulResponse);
    });
  });

  describe("GIVEN a failed API call", () => {
    beforeAll(() => {
      jest
        .spyOn(global, "fetch")
        // @ts-ignore TODO: Figure out what TS is moaning about another time
        .mockImplementation(() => Promise.resolve({ ok: false }));
    });

    it("SHOULD throw", async () => {
      try {
        await fetchProduct("2");
        assert("Has not been reached");
      } catch (e) {
        assert("Function threw an error");
      }
    });
  });
});
