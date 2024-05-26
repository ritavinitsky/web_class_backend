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


import request from 'supertest';
import appInit from "../App";
import mongoose from "mongoose";
import {Express} from "express";
import User from '../models/user_model'



const user = {
    name: "abcd",
    age: "25",
    email: "abcd@gmail.com",
    password: "12345",
    //imgUrl: "url",
}

let app: Express;
let accessToken = "";
let refreshToken = "";
beforeAll(async() => {
    app = await appInit();
    console.log("beforeAll");
    User.deleteMany({email: user.email})
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});


describe("Auth tests", () => {
    test("Post /register", async() => {
        const res = await request(app).post("/auth/register").send(user);
        expect(res.statusCode).toBe(200);
    });

    test("Post /login", async() => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body)

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        const res2 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res2.statusCode).toBe(200);

        const fakeToken = accessToken + '0'
        const res3 = await request(app).get("/user").set('Authorization', 'Bearer ' + fakeToken);
        expect(res3.statusCode).not.toBe(200);
    });
    jest.setTimeout(100000);
    const timeout = (ms: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    test("refresh token", async () => {
        const res = await request(app).post("/auth/login").send(user);
        expect(res.statusCode).toBe(200);
        console.log(res.body)

        //const accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
        const res2 = await request(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res2.statusCode).toBe(200);
        accessToken = res.body.accessToken;
        const refreshToken2 = res.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken2).not.toBeNull();

        const res3 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
        await timeout(6000)
        const res4 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res4.statusCode).not.toBe(200);
    })

    test("refresh token after expiration", async () => {
        await timeout(6000);
        const res = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res.statusCode).not.toBe(200);
        const res1 = await request(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res1.statusCode).toBe(200);
        accessToken = res1.body.accessToken;
        refreshToken = res1.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();
        const res3 = await request(app).get("/user").set('Authorization', 'Bearer ' + accessToken);
        expect(res3.statusCode).toBe(200);
    })

    test("refresh token violation", async () => {
        await timeout(6000)
        const res1 = await request(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res1.statusCode).toBe(200);
        const oldRefreshToken = refreshToken;
        if(oldRefreshToken == res1.body.refreshToken)
            console.log("refresh token is the same")
        accessToken = res1.body.accessToken;
        refreshToken = res1.body.refreshToken;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        const res2 = await request(app).get("/auth/refresh").set('Authorization', 'Bearer ' + oldRefreshToken).send();
        expect(res2.statusCode).not.toBe(200);

        const res3 = await request(app).get("/auth/refresh").set('Authorization', 'Bearer ' + refreshToken).send();
        expect(res3.statusCode).not.toBe(200);
    })

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