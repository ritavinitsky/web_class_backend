"use strict";
/*import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import { Express } from "express";
import User from "../models/user_model";


const user = {
    name: "test",
    email: "teszt@gmail.com",
    age: "40",
    password: "123456"
}

let app: Express;
let accessToken = "";
let refreshToken = "";

beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await User.deleteMany({ email: user.email });
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});


describe("Auth test", () => {
    test("Post /register", async () => {
        const res = await request(app).post("/auth/register").send(user);
        expect(res.statusCode).toBe(200);
    });

    test("Post /login", async () => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        const res2 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res2.statusCode).toBe(200);

        const fakeToken = accessToken + "0";
        const res3 = await request(app).get("/user").set('Authorization', 'Bearer ' + fakeToken);
        expect(res3.statusCode).not.toBe(200);
    });


    const timout = (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    jest.setTimeout(100000);

    test("refresh token", async () => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);

        //const accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        const res2 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + refreshToken)
            .send();

        expect(res2.statusCode).toBe(200);
        accessToken = res2.body.accessToken;
        refreshToken = res2.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        const res3 = await request(app).get("/user")
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);


    });


    test("refresh token after expiration", async () => {
        //sleep 6 sec check if token is expired
        await timout(6000);
        const res = await request(app).get("/user")
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res.statusCode).not.toBe(200);

        const res1 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + refreshToken)
            .send();
        expect(res1.statusCode).toBe(200);
        accessToken = res1.body.accessToken;
        refreshToken = res1.body.refreshToken;

        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        const res3 = await request(app).get("/user")
            .set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
    });

    test("refresh token violation", async () => {
        const res = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + refreshToken)
            .send();
        const oldRefreshToken = refreshToken;
        if (oldRefreshToken == res.body.refreshToken) {
            console.log("refresh token is the same");
        }
        expect(res.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        const res1 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + oldRefreshToken)
            .send();
        expect(res1.statusCode).not.toBe(200);

        const res2 = await request(app).get("/auth/refresh")
            .set('Authorization', 'Bearer ' + refreshToken)
            .send();
        expect(res2.statusCode).not.toBe(200);
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
const user_model_1 = __importDefault(require("../models/user_model"));
const user = {
    name: "ASDFG",
    age: "23",
    email: "teststudent@gmail.com",
    password: "123456",
    //imgUrl: "url",
};
let app;
let accessToken = "";
let refreshToken = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log("beforeAll");
    user_model_1.default.deleteMany({ email: user.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("Auth tests", () => {
    test("Post /register", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        expect(res.statusCode).toBe(200);
    }));
    test("Post /login", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res2.statusCode).toBe(200);
        const fakeToken = accessToken + '0';
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + fakeToken);
        expect(res3.statusCode).not.toBe(200);
    }));
    jest.setTimeout(100000);
    const timeout = (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };
    test("refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        //const accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        const res2 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        const refreshToken2 = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken2).not.toBeNull();
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
        yield timeout(6000);
        const res4 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res4.statusCode).not.toBe(200);
    }));
    test("refresh token after expiration", () => __awaiter(void 0, void 0, void 0, function* () {
        yield timeout(6000);
        const res = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res.statusCode).not.toBe(200);
        const res1 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res1.statusCode).toBe(200);
        accessToken = res1.body.accessToken;
        refreshToken = res1.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res3 = yield (0, supertest_1.default)(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
    }));
    test("refresh token violation", () => __awaiter(void 0, void 0, void 0, function* () {
        yield timeout(6000);
        const res1 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res1.statusCode).toBe(200);
        const oldRefreshToken = refreshToken;
        if (oldRefreshToken == res1.body.refreshToken)
            console.log("refresh token is the same");
        accessToken = res1.body.accessToken;
        refreshToken = res1.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res2 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + oldRefreshToken).send();
        expect(res2.statusCode).not.toBe(200);
        const res3 = yield (0, supertest_1.default)(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res3.statusCode).not.toBe(200);
    }));
    /*test("logout", async() => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body)
        refreshToken = res.body.refreshToken;
        const res2 = await request(app).post("/auth/logout").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(200);
    })

    test("logout without refresh tokens", async() => {
        const res2 = await request(app).post("/auth/logout").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(401);
    })
    */
});
//# sourceMappingURL=auth.test.js.map