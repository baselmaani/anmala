import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { AuthController } from "./AuthController";
import { Server } from "../../Server";

describe("AuthController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [AuthController]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /auth", async () => {
     const response = await request.get("/auth").expect(200);

     expect(response.text).toEqual("hello");
  });
});
