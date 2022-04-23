import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { CategoryController } from "./CategoryController";
import { Server } from "../Server";

describe("CategoryController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [CategoryController]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /category", async () => {
     const response = await request.get("/category").expect(200);

     expect(response.text).toEqual("hello");
  });
});
