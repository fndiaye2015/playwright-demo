const { test } = require("@playwright/test");
const { TodoPage } = require("../pages/todoPageWithoutFixtures");

test.describe("todo tests", () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo("item1");
    await todoPage.addToDo("item2");
  });

  test.afterEach(async ({ page }) => {
    await todoPage.removeAll();
    await page.close();
  });

  test("should add an item", async () => {
    await todoPage.addToDo("my item");
    // ...
  });

  test("should remove an item", async () => {
    await todoPage.remove("item1");
    // ...
  });
});

