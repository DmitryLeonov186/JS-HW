const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});
describe("Books names test suit negative", () => {
  it("Naming a workbook without sorting", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Волшебник изумрудного города",
        "Гарри Поттер",
      ])
    ).toEqual(["Волшебник изумрудного города", "Гарри Поттер", "Гарри Поттер"]);
  });
});
