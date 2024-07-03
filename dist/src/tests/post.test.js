"use strict";
/*import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import Post from "../models/post_model";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;


const testUser = {
    _id: null,
    name: "abcd",
    age: "25",
    email: "abcd@gmail.com",
    password: "12345",
    //imgUrl: "url",
    accessToken: null
}

const post = {
    creator_id: testUser._id,
    post_id: null,
    post_title: "hello",
    post_text: "hello everybody",
    //imgUrl: "url"
}

const updatedPost = {
    post_title: "updated",
    post_text: "hello i updated this post",
    //imgUrl: "url1"
}


beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await Post.deleteMany();
    await User.deleteMany({ email: testUser.email });
    await request(app).post("/auth/register").send(testUser);
    const res = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = res.body.accessToken;
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});



describe("Post tests", () => {
    test("Get /post - empty collection", async () => {
        const res = await request(app).get("/post");
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    const post = {
        title: "this is post title",
        message: "this is my post message ..... ",
        owner: "Moshe"
    }

    test("Post /post - empty collection", async () => {
        const res = await request(app).post("/post")
            .set('Authorization', 'Bearer ' + testUser.accessToken)
            .send(post);
        expect(res.statusCode).toBe(201);
    });

});
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post_model"));
const user_model_1 = __importDefault(require("../models/user_model"));
const testUser = {
    _id: null,
    name: "abcd",
    age: "25",
    email: "abcd@gmail.com",
    password: "12345",
    imgUrl: "url",
    accessToken: null
};
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    yield user_model_1.default.deleteMany({ email: testUser.email });
    yield (0, supertest_1.default)(app).post("/auth/register").send(testUser);
    const res = yield (0, supertest_1.default)(app).post("/auth/login").send(testUser);
    const user = yield user_model_1.default.find({ email: testUser.email });
    testUser.accessToken = res.body.accessToken;
    testUser._id = user[0]._id.toString();
    yield post_model_1.default.deleteOne({ creator_id: testUser._id });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("Post tests", () => {
    test("Test Post get all", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/post").set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    }));
    const post = {
        creator_id: testUser._id,
        post_id: null,
        post_title: "hello",
        post_text: "hello everybody",
        imgUrl: "url"
    };
    const updatedPost = {
        post_title: "hello 2",
        post_text: "hello everybody 2",
        imgUrl: "url1"
    };
    test("POST new post to empty collection", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/post").set('Authorization', 'Bearer ' + testUser.accessToken).send(post);
        expect(res.statusCode).toBe(201);
        post.post_id = res.body._id;
    }));
    test("GET post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data.post_title).toEqual(post.post_title);
        expect(data.post_text).toEqual(post.post_text);
    }));
    test("PUT post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield (0, supertest_1.default)(app).put("/post/" + post.post_id).send(updatedPost).set('Authorization', 'Bearer ' + testUser.accessToken));
        expect(res.statusCode).toBe(201);
        expect(res.body.post_text).toEqual(updatedPost.post_text);
        expect(res.body.post_title).toEqual(updatedPost.post_title);
    }));
    test("DELETE /post - delete post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete("/post/" + post.post_id).set('Authorization', 'Bearer ' + testUser.accessToken).send(post);
        expect(res.statusCode).toBe(201);
    }));
});
//# sourceMappingURL=post.test.js.map