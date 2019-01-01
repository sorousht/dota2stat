import { fulfilled, pending, rejected } from ".";

describe("async action helpers", () => {
  it("should append FULFILLED to the action name", () => {
    const action = "ACTION";
    const expected = `${action}_FULFILLED`;
    expect(fulfilled(action)).toBe(expected);
  });
  it("should append REJECTED to the action name", () => {
    const action = "ACTION";
    const expected = `${action}_REJECTED`;
    expect(rejected(action)).toBe(expected);
  });
  it("should append PENDING to the action name", () => {
    const action = "ACTION";
    const expected = `${action}_PENDING`;
    expect(pending(action)).toBe(expected);
  });
});
