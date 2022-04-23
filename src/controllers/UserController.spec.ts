import { PlatformTest } from "@tsed/common";
import { UserController } from "./UserController";

describe("UserController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<UserController>(UserController);
    // const instance = PlatformTest.invoke<UserController>(UserController); // get fresh instance

    expect(instance).toBeInstanceOf(UserController);
  });
});
