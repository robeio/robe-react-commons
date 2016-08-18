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

        query.offset = 5;
        result = localEndPoint.read(query);
        chai.assert.equal(result, true);

        query.limit = 3;
        result = localEndPoint.read(query);
        chai.assert.equal(result, true);

        result = localEndPoint.read(query, function (response) {
            chai.assert.equal(response.data.length, data.length);
        });

        query.sort = ["ASC", ""];
        result = localEndPoint.read(query, undefined, function (code, message) {
            chai.assert.isNumber(code, "error code");
        });

        // let filters = [{ key="name", value="Chopper", operator="=" }];
        // query.filters = filters;
        // result = localEndPoint.read(query, function (response) {
        //     chai.assert.equal(response.data.length, data.length);
        // });
    });

    it("sort", () => {

    });

    it("filter", () => {

    });
});
