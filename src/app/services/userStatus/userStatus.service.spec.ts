import { TestBed } from "@angular/core/testing";
import { UserStatusService } from "./userStatus.service";

describe("AppdataService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: UserStatusService = TestBed.get(UserStatusService);
    expect(service).toBeTruthy();
  });
});
