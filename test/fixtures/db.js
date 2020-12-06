const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: "laraib",
	email: "l@il.com",
	password: "12345432re",
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
		},
	],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: "jeff",
	email: "je@il.com",
	password: "1234543e",
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
		},
	],
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: "First task",
	progress: true,
	owner: userOneId,
};

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: "Second task",
	progress: false,
	owner: userOneId,
};

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: "Third task",
	progress: false,
	owner: userTwoId,
};

const setupDatabase = async () => {
	await User.deleteMany();
	await Task.deleteMany();

	await new User(userOne).save();
	await new User(userTwo).save();

	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
};

module.exports = {
	userOne,
	userOneId,
	setupDatabase,
	userTwo,
	taskOne,
};
