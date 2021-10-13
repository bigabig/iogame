import express from "express";
import * as db from "../db/conn";

export const recordRoutes = express.Router();

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = db.getDb();
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, res) {
    let db_connect = db.getDb();
    let myobj = {
        person_name: req.body.person_name,
        person_position: req.body.person_position,
        person_level: req.body.person_level,
    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
        if (err) throw err;
    });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, res) {
    let db_connect = db.getDb();
    let myquery = { id: req.body.id };
    let newvalues = {
        $set: {
            person_name: req.body.person_name,
            person_position: req.body.person_position,
            person_level: req.body.person_level,
        },
    };
    db_connect
        .collection("records")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, res) => {
    let db_connect = db.getDb();
    let myquery = { id: req.body.id };
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
    });
});