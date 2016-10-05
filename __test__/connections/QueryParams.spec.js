import QueryParams from "connections/QueryParams";
import chai from "chai";

describe("QueryParams.js", () => {
    const params = {
        offset: 2,
        limit: 5,
        q: "Full Text Search",
        fields: [
            "field1",
            "field3"
        ],
        sort: [
            ["field1", "ASC"],
            ["field2", "DESC"]
        ],
        filters: [
            ["field1", "=", "4"],
            ["field1", "=~", "il"],
            ["field1", "=~", "kam"],
            ["field1", "~", "mi"],
            ["field1", "!=", "kamil"],
            ["field2", "<", 3],
            ["field2", "<=", 3],
            ["field2", ">", 3],
            ["field2", ">=", 3],
            ["field2", "|=", ["kamil", "seray"]]
        ]
    };
    it("stringify", () => {
        let url = QueryParams.stringify(params);
        chai.assert.equal(url, "?_offset=2&_limit=5&_q=Full Text Search&_fields=field1,field3&_sort=+field1,-field2&_filter=field1=4,field1=~il,field1=~kam,field1~mi,field1!=kamil,field2<3,field2<=3,field2>3,field2>=3,field2|=kamil|seray");
    });

    it("stringify - sort", () => {
        let originalSort = params.sort;
        params.sort = undefined;
        chai.assert.doesNotThrow(() => {
            QueryParams.stringify(params);
        }, "Undefined sort must process");

        params.sort = null;
        chai.assert.doesNotThrow(() => {
            QueryParams.stringify(params);
        }, "Null sort must process");

        params.sort = {};
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given sort value ([object Object]) must a valid array.", undefined, "Sort must be array");

        params.sort = [undefined];
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given sort[0] item (undefined) must an array", undefined, "Sort items must be string array");

        params.sort = [1, 2];
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given sort[0] value (1) must a valid array.", undefined, "Sort items must be string array");

        params.sort = [{}, 2];
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given sort[0] value ([object Object]) must a valid array", undefined, "Sort items must be string array");

        params.sort = [[1, 2]];
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given sort[0] value at 0 (1) must a valid string.", undefined, "Sort items must be string");

        params.sort = [["field1", "ERROR"]];
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given sort item (field1,ERROR) must a ASC or DESC.", undefined, "Only ASC and DESC allowed");
        params.sort = originalSort;
    });

    it("stringify - filters", () => {
        let originalFilters = params.filters;
        params.filters = undefined;
        chai.assert.doesNotThrow(() => {
            QueryParams.stringify(params);
        }, "Undefined filters must process");

        params.filters = null;
        chai.assert.doesNotThrow(() => {
            QueryParams.stringify(params);
        }, "Null filters must process");

        params.filters = {};
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given filters value ([object Object]) must a valid array.", undefined, "Filters must be array");

        params.filters = [1, 2];
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given filters[0] value (1) must a valid array.", undefined, "Filters items must be string array");

        params.filters = [1, 2];
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given filters[0] value (1) must a valid array.", undefined, "Filters items must be string array");

        params.filters = originalFilters;
    });


    it("stringify - __integerValidation", () => {
        let original = params.offset;

        params.offset = undefined;
        chai.assert.doesNotThrow(() => {
            QueryParams.stringify(params);
        });

        params.offset = -1;
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given offset value (-1) must be > 0.", undefined, "Offset must be greater than 0");

        params.offset = "a";
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given offset value (a) is not a number !", undefined, "Offset must be number");
        params.offset = original;


        params.limit = "a";
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given offset value (a) is not a number !", undefined, "Limit must be number");
        params.limit = original;
    });

    it("stringify - __stringValidation", () => {
        let original = params.q;

        params.q = undefined;
        chai.assert.doesNotThrow(() => {
            QueryParams.stringify(params);
        });

        params.q = 42;
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given offset value (42) is not a string !", undefined, "q must be string");
    });

    it("stringify - __stringArrayValidation", () => {
        let original = params.q;

        params.q = undefined;
        chai.assert.doesNotThrow(() => {
            QueryParams.stringify(params);
        });

        params.q = 42;
        chai.assert.throws(() => {
            QueryParams.stringify(params);
        }, "Given offset value (42) is not a string !", undefined, "q must be string");
    });
});
