import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { UserController } from "./UserController";
import { Server } from "../Server";

describe("UserController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [UserController]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should call GET /users", async () => {
     const response = await request.get("/users").expect(200);

     expect(response.text).toEqual("hello");
  });
});
