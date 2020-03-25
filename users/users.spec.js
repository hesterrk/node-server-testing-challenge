// /Importing supertest library
const supertest = require("supertest");

//Importing our server file
const server = require("../api/server");

//database
const db = require("../data/dbConfig");

//DELETE IF DONT USE 
var jwt = require('jsonwebtoken')


//Re-seeding our test
beforeEach(async () => {
  await db.seed.run();
});



//importing model file for model testing
const usersModel = require("./users-model");


test("get user, no auth header", async () => {
  const res = await supertest(server).get("/api/users")
  expect(res.statusCode).toBe(401);
  expect(res.type).toBe("application/json");
});



test("get user, with AUTH header", async () => {
  var token = jwt.sign({
    id: 1
  }, process.env.JWT_SECRET="hello")
    const res = await supertest(server).get("/api/users")
    .set('Authorization', token)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(3)
  });




test("register user, no token generated", async () => {
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "Werren", password: "1234" });
  expect(res.type).toBe("application/json");
});




test("register user, with AUTH header", async () => {
  var token = jwt.sign({
    id: 1
  }, process.env.JWT_SECRET="hello")
    const res = await supertest(server).post("/api/auth/register")
    .send({ username: "Berryi", password: "1234" })
    .set('Authorization', token)
    expect(res.statusCode).toBe(201)
  });





test("login user, no token", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "Mary", password: "1234" });
  expect(res.type).toBe("application/json");
  expect(res.statusCode).toBe(401);
  expect(res.body.message).toMatch(/invalid credentials/i);
  
});



test("testing protected route, no auth header", async () => {
  const res = await supertest(server).get("/api/auth/protected");
  expect(res.statusCode).toBe(401);
  expect(res.type).toBe("application/json");
  expect(res.unauthorized).toBe(true);
  expect(res.body.message).toMatch(/invalid credentials/i);
});


test("testing protected route, with AUTH header", async () => {
  var token = jwt.sign({
    id: 1
  }, process.env.JWT_SECRET="hello")
  const res = await supertest(server).get("/api/auth/protected")
  .set('Authorization', token)
  expect(res.statusCode).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.unauthorized).toBe(false);
  expect(res.body.message).toMatch(/welcome to this page, you are authorised/i);
});







test("testing find", async () => {
  const res = await usersModel.find();
  console.log(res);
  expect(res.length).toBe(3);
});

test("testing findbyId", async () => {
  const res = await usersModel.findById(1);
  expect(res.username).toBe("Hester");
  expect(res.username.length).toBe(6);
});

test("testing add", async () => {
  const res = await usersModel.add({ username: "hala", password: "4543224" });
  expect(res.username).toBe("hala");
});

test("testing remove", async () => {
  const del = await usersModel.remove(1);
  const users = await db("users").select();
  expect(users).toHaveLength(2);
  expect(del).toBe(1);
});
