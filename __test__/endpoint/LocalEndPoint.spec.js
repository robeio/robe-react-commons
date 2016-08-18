import LocalEndPoint from "endpoint/LocalEndPoint";
import chai from "chai";
import { Criteria, Restrictions, Order } from "js-criteria";

const data = [
    {
        id: "1",
        name: "Luffy",
        surname: "Monkey D."
    },
    {
        id: "2",
        name: "Zoro",
        surname: "Roronoa"
    },
    {
        id: "3",
        name: "Nami",
        surname: ""
    },
    {
        id: "4",
        name: "Usop",
        surname: ""
    },
    {
        id: "5",
        name: "Sanji",
        surname: ""
    },
    {
        id: "6",
        name: "Chopper",
        surname: "Tony Tony"
    },
    {
        id: "7",
        name: "Robin",
        surname: "Nico"
    },
    {
        id: "8",
        name: "Franky",
        surname: ""
    },
    {
        id: "9",
        name: "Brook",
        surname: ""
    }
];


describe("LocalEndPoint.js", () => {

    let localEndPoint;

    it("constructors", () => {
        localEndPoint = new LocalEndPoint({ data: data });
    });

    it("read", () => {

        let result = localEndPoint.read();
        chai.assert.equal(result, true);

        let query = {};
        result = localEndPoint.read(query);
        chai.assert.equal(result, true);

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, data.length);
        });

        query.sort = [["id", "DESC"], ["name", "ASC"], ["name", "NOPE"], undefined];
        result = localEndPoint.read(query, function (response) {
            let count = response.totalCount;
            chai.assert.equal(count, 9);

            let data = response.data;

            chai.assert.equal(data[0].id, "9");
        });

        query.offset = 5;
        result = localEndPoint.read(query);
        chai.assert.equal(result, true);

        query.limit = 3;
        result = localEndPoint.read(query);
        chai.assert.equal(result, true);
    });


    it("__filter", () => {

        let result = localEndPoint.read();
        chai.assert.equal(result, true);

        let query = {};
        let filters = [{ operator: "=", key: "id", value: "1" }, undefined, { operator: "NOPE", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 1);
        });


        filters = [{ operator: "!=", key: "id", value: "1" }, { operator: "=", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 8);
        });

        filters = [{ operator: "~=", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 1);
        });


        filters = [{ operator: "=~", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 1);
        });

        filters = [{ operator: "~", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 1);
        });

        filters = [{ operator: "<", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 0);
        });

        filters = [{ operator: "<=", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 1);
        });

        filters = [{ operator: ">", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 8);
        });

        filters = [{ operator: ">=", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 9);
        });

        filters = [{ operator: "|=", key: "id", value: "1" }];
        query.filters = filters;

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, 8);
        });



    });
});
