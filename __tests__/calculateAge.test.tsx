const { calculateAge } = require("../app/src/pages/TestFunction");

describe("calculateAge function", () => {
  it("calculates age correctly", () => {
    // Test case 1: Current date: 2024-07-03, dob: 2000-01-01
    expect(calculateAge("2000-01-01")).toBe(24);

    // Test case 2: Current date: 2024-07-03, dob: 2010-05-15
    expect(calculateAge("2010-05-15")).toBe(14);
  });
});
