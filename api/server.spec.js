//Importing supertest library
const supertest = require("supertest");

//Importing our server file
const server = require("./server");

//Database
const db = require("../data/dbConfig");

//Re-seeding our test
beforeEach(async () => {
  await db.seed.run();
});

//Testing our root route

test("home route", async () => {
  const res = await supertest(server).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body.message).toBe("all working");
  expect(res.body.message).toHaveLength(11);
  expect(res.body.message).toMatch(/all/i);
});

test("server enviroment", () => {
  expect(process.env.DB_ENV).toBe("testing")
})