import { PlatformTest } from "@tsed/common";
import { AuthController } from "./AuthController";

describe("AuthController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<AuthController>(AuthController);
    // const instance = PlatformTest.invoke<AuthController>(AuthController); // get fresh instance

    expect(instance).toBeInstanceOf(AuthController);
  });
});
