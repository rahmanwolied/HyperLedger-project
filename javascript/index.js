/*
 * Module dependencies
 */
const express = require("express");
const cors = require("cors");
const query = require("./query");
const createCompany = require("./createCompany");
const changeCompanyInfo = require("./changeCompanyInfo");
const bodyParser = require("body-parser");

const app = express();

// To control CORSS-ORIGIN-RESOURCE-SHARING( CORS )
app.use(cors());
app.options("*", cors());

// To parse encoded data
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
);

// get all car
app.get("/get-company", function (req, res) {
    query
        .main(req.query)
        .then((result) => {
            const parsedData = JSON.parse(result);
            let companyList;

            // if user search company
            if (req.query.key) {
                companyList = [
                    {
                        Key: req.query.key,
                        Record: {
                            ...parsedData,
                        },
                    },
                ];
                res.send(companyList);
                return;
            }

            companyList = parsedData;
            res.send(companyList);
        })
        .catch((err) => {
            console.error({ err });
            res.send("FAILED TO GET DATA!");
        });
});

// create a new car
app.post("/create", function (req, res) {
    createCompany
        .main(req.body)
        .then((result) => {
            res.send({ message: "Created successfully" });
        })
        .catch((err) => {
            console.error({ err });
            res.send("FAILED TO LOAD DATA!");
        });
});

// change car owner
app.post("/update", function (req, res) {
    console.log(req.body);
    changeCompanyInfo
        .main(req.body)
        .then((result) => {
            res.send({ message: "Updated successfully" });
        })
        .catch((err) => {
            console.error({ err });
            res.send("FAILED TO LOAD DATA!");
        });
});

app.listen(3000, () => console.log("Server is running at port 3000"));
