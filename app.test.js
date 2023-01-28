const request = require('supertest');
const app = require('./server.js');

const token = "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDViOTI1ZWU0ZDU2NGU4MDFiNWM4MSIsImlhdCI6MTY1ODkzODgwOCwiZXhwIjoxNjYxNTMwODA4fQ.g6kEYmy1qCjqq5DF8xaLN-0fNU1REAuy8wJLiVr-3rE"

const adminToken= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDViOTI1ZWU0ZDU2NGU4MDFiNWM4MSIsImlhdCI6MTY1ODkzNTE3MiwiZXhwIjoxNjYxNTI3MTcyfQ.yyZwrY-G84rT-q5uhbD9TjrGX5mBjwhU_HFIJ0eQenY"

test("User login test", async () => {
    await request(app)
      .post("/api/users/login")
      .send({
        email: "testyal@gmail.com",
        password: "testyal"
      })
      .expect("Content-Type", /json/)
      .expect(200)
  });
  
  test("User register test", async () => {
    await request(app)
      .post("/api/users")
      .send({
        name: "Prabesh APIyal",
        email: "apitestyal7@gmail.com",
        password: "testyal"
      })
      .expect(201)
  })

  test("View single user", async () => {
    await request(app)
      .get("/api/users/62e0fb0f080bd9495c18fb5b")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)
  })

  test("View all post", async () => {
    await request(app)
      .get("/api/tweets")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)
  })

  test("POST a post", async () => {
    await request(app)
      .post("/api/tweets")
      .set("Authorization", token)
      .send({
        "tweetContent": "FROM TESTING"
      })
      .expect("Content-Type", /json/)
      .expect(201)
  })

  test("DELETE a post", async () => {
    await request(app)
      .delete("/api/tweets/62e145a93ce2f734b8e87d1d")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200)
  })

  test("UPDATE verify check mark", async () => {
    await request(app)
      .put("/api/user/verify/62d5a")
      .set("Authorization", adminToken)
      .send({
        message: 'verify'
      })
      .expect("Content-Type", /json/)
      .expect(200)
  })




