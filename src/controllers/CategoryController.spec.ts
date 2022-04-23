import { PlatformTest } from "@tsed/common";
import { CategoryController } from "./CategoryController";

describe("CategoryController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<CategoryController>(CategoryController);
    // const instance = PlatformTest.invoke<CategoryController>(CategoryController); // get fresh instance

    expect(instance).toBeInstanceOf(CategoryController);
  });
});
