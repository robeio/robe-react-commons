import QueryParams from "connections/QueryParams";
import chai from "chai";

describe("QueryParams.js", () => {
    it("stringify", () => {
        let params = {
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
        let url = QueryParams.stringify(params);
        chai.assert.equal(url, "url?_offset=2&_limit=5&_q=Full Text Search&_fields=field1,field3&_sort=+field1,-field2&_filter=field1=4,field1=~il,field1=~kam,field1~mi,field1!=kamil,field2<3,field2<=3,field2>3,field2>=3,field2|=kamil|seray");
    });
});
