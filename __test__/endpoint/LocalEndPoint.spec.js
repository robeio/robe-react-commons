import LocalEndPoint from "endpoint/LocalEndPoint";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

const data = [
    {
        oid: "1",
        name: "Luffy",
        surname: "Monkey D."
    },
    {
        oid: "2",
        name: "Zoro",
        surname: "Roronoa"
    },
    {
        oid: "3",
        name: "Nami",
        surname: ""
    },
    {
        oid: "4",
        name: "Usop",
        surname: ""
    },
    {
        oid: "5",
        name: "Sanji",
        surname: ""
    },
    {
        oid: "6",
        name: "Chopper",
        surname: "Tony Tony"
    },
    {
        oid: "7",
        name: "Robin",
        surname: "Nico"
    },
    {
        oid: "8",
        name: "Franky",
        surname: ""
    },
    {
        oid: "9",
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

        localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, data.length);
        });
    });
    it("read - q", () => {
        let query = { q: "Luffy" };
        localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 1);
        });
    });
    it("read - sort", () => {
        let query = {};
        query.sort = [["oid", "DESC"], ["name", "ASC"], ["name", "NOPE"], undefined];
        localEndPoint.read(query, (response: Object) => {
            let count = response.totalCount;
            chai.assert.equal(count, 9);
            let localData = response.data;
            chai.assert.equal(localData[0].oid, "9");
        });
        query.sort = [["oid", 1]];
        localEndPoint.read(query, (response: Object) => {
            let count = response.totalCount;
            chai.assert.equal(count, 9);
            let localData = response.data;
            chai.assert.equal(localData[0].oid, "9");
        }, (error: string) => { chai.assert.isOk(true," undefined Sort Must throw read error.") });
    });
    it("read - offset,limit", () => {
        let query = {};
        query.offset = 5;
        localEndPoint.read(query, (response: Object) => {
            let count = response.totalCount;
            chai.assert.equal(count, 4);
            let localData = response.data;
            chai.assert.equal(localData[0].oid, "5");
        });
        query.limit = 3;
        localEndPoint.read(query, (response: Object) => {
            let count = response.totalCount;
            chai.assert.equal(count, 3);
            let localData = response.data;
            chai.assert.equal(localData[0].oid, "5");
        });


    });


    it("read - __filter", () => {
        let query = {};
        let filters = [["oid", "=", "1"], undefined, ["oid", "NOPE", "1"]];
        query.filters = filters;

        let result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 1);
        });


        filters = [["oid", "!=", "1"], ["oid", "=", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 8);
        });

        filters = [["oid", "~=", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 1);
        });


        filters = [["oid", "=~", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 1);
        });

        filters = [["oid", "~", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 1);
        });

        filters = [["oid", "<", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 0);
        });

        filters = [["oid", "<=", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 1);
        });

        filters = [["oid", ">", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 8);
        });

        filters = [["oid", ">=", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 9);
        });

        filters = [["oid", "|=", "1"]];
        query.filters = filters;

        result = localEndPoint.read(query, (response: Object) => {
            chai.assert.equal(response.data.length, 8);
        });
    });
    it("create", () => {
        let data = {
            name: "Frodo",
            surname: "Baggins"
        };
        chai.assert.doesNotThrow(() => { localEndPoint.create(data) }, "Create without callback must return true");

        data = {
            name: "Bilbo",
            surname: "Baggins"
        };
        localEndPoint.create(data, (response: Object) => { chai.assert.equal(response.data.name, data.name); });

        localEndPoint.create(data, (response: Object) => { chai.assert.isNotOk(response, "Undefined data must throw error"); });

        localEndPoint.create(data,
            (response: Object) => { chai.assert.isNotOk(response, "Undefined data must throw error"); },
            (error: Object) => { chai.assert.isOk(error, "Undefined data must throw error"); });
    });

    it("update", () => {
        let data = {
            oid: "9",
            name: "Frodo",
            surname: "Baggins"
        };
        chai.assert.doesNotThrow(() => { localEndPoint.update(data, "oid") }, "Create without callback must return true");
        data = {
            oid: "9",
            name: "Frodo",
            surname: "Baggins"
        };
        localEndPoint.update(data, "oid", (response: Object) => { chai.assert.equal(response.data.name, data.name); });

        data = {
            oid: "10",
            name: "Frodo",
            surname: "Baggins"
        };
        localEndPoint.update(data, "oid", (response: Object) => { chai.assert.isNotOk(response, "Undefined data must throw error"); });

        localEndPoint.update(data, "oid",
            (response: Object) => { chai.assert.isNotOk(response, "Undefined data must throw error"); },
            (error: Object) => { chai.assert.isOk(error, "Undefined data must throw error"); });
    });
    it("delete", () => {
        let data = {
            oid: "9",
            name: "Frodo",
            surname: "Baggins"
        };
        chai.assert.doesNotThrow(() => { localEndPoint.delete(data, "oid") }, "Create without callback must return true");
        data = {
            oid: "8",
            name: "Frodo",
            surname: "Baggins"
        };
        localEndPoint.delete(data, "oid", (response: Object) => { chai.assert.equal(response.data.name, data.name); });

        data = {
            oid: "10",
            name: "Frodo",
            surname: "Baggins"
        };
        localEndPoint.delete(data, "oid", (response: Object) => { chai.assert.isNotOk(response, "Undefined data must throw error"); });

        localEndPoint.delete(data, "oid",
            (response: Object) => { chai.assert.isNotOk(response, "Undefined data must throw error"); },
            (error: Object) => { chai.assert.isOk(error, "Undefined data must throw error"); });
    });

});
