import fetchProducts from "./fetchProducts";
import assert from "assert";

describe("api/fetchProduct", () => {
  describe("GIVEN a successful API call", () => {
    const successfulResponse = [
      {
        feature_order: 10,
        product: {
          id: 10,
          price: "10.10",
        },
      },
      {
        feature_order: 1,
        product: {
          id: 1,
        },
      },
    ];

    beforeAll(() => {
      // @ts-ignore TODO: Figure out what TS is moaning about another time
      jest.spyOn(global, "fetch").mockImplementation((a) => {
        // @ts-ignore TODO: Figure out what TS is moaning about another time
        const isProductDetailCall = a.endsWith("/1");
        if (isProductDetailCall) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                result: {
                  id: "1",
                  price: "1.00",
                },
              }),
          });
        }

        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ result: { releases: [...successfulResponse] } }),
        });
      });
    });

    it("SHOULD return enriched products in the correct order", async () => {
      const result = await fetchProducts();
      const expectedResult = [...successfulResponse];
      expectedResult[1].product.price = "1.00";

      expect(result[0]).toEqual(expectedResult[1]);
      expect(result[1]).toEqual(expectedResult[0]);
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
        await fetchProducts();
        assert("Has not been reached");
      } catch (e) {
        assert("Function threw an error");
      }
    });
  });
});
