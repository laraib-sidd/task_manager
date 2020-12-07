const app = require("../src/app");
const request = require("supertest");
const User = require("../src/models/user");
const { setupDatabase, userOne, userOneId } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
	const response = await request(app)
		.post("/user/register")
		.send({
			name: "laraib",
			email: "done@amgil.com",
			password: "donet123142",
		})
		.expect(201);

	// Assert to check if the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assertions about the response
	expect(response.body).toMatchObject({
		user: {
			name: "laraib",
			email: "done@amgil.com",
		},
		token: user.tokens[0].token,
	});

	// Checking user password not stored plian
	expect(user.password).not.toBe("donet123142");
});

test("should login an existing user", async () => {
	const response = await request(app)
		.post("/user/login")
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);

	// Fetching user from database
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Checking the user token
	expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login non-existent user", async () => {
	await request(app).post("/user/login").send().expect(400);
});

test("Should get user profile", async () => {
	await request(app)
		.get("/user/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test("Should not get profile for unauthorized user", async () => {
	await request(app).get("/user/me").send().expect(401);
});

test("Should delete user", async () => {
	const response = await request(app)
		.delete("/users/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	// Assert that user is deleted
	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test("Should not delete for unauthorized user", async () => {
	await request(app).delete("/user/me").send().expect(401);
});

test("Should upload avatar image", async () => {
	await request(app)
		.post("/user/me/avatar")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.attach("avatar", "test/fixtures/profile-pic.png")
		.expect(200);

	// Checking that the avatar was uploaded
	const user = await User.findById(userOne._id);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update user fields", async () => {
	await request(app)
		.patch("/user/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send({ name: "larry" })
		.expect(200);

	// Checking the assertion for updates
	const user = await User.findById(userOne._id);
	expect(user.name).toBe("larry");
});

test("Should not update invalid user fields", async () => {
	await request(app)
		.patch("/user/me")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send({ location: "delhi" })
		.expect(404);
});
