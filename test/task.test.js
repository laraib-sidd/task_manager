const app = require("../src/app");
const request = require("supertest");
const {
	setupDatabase,
	userOne,
	userOneId,
	userTwo,
	taskOne,
} = require("./fixtures/db");
const Task = require("../src/models/task");

beforeEach(setupDatabase);

test("Should create task", async () => {
	const response = await request(app)
		.post("/task")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: "Testing",
			progress: true,
			owner: userOneId,
		})
		.expect(201);
	const task = await Task.findById(response.body._id);

	// Further assertion to check if task is created.
	expect(task).not.toBeNull();
});

test("Should get user tasks", async () => {
	const response = await request(app)
		.get("/tasks")
		.set("Authorization", `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	// Further assertion to check the length of task
	expect(response.body.length).toEqual(2);
});

test("Try to delete first user's task by second user", async () => {
	const response = await request(app)
		.delete(`/task/${taskOne._id}`)
		.set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
		.send()
        .expect(404);
        
    // Further assertion to check if the task is still there
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
});
