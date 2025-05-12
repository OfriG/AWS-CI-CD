const Supplier = require("../models/supplier.model.js");
const { body, validationResult } = require("express-validator");

exports.findAll = (req, res) => {
    Supplier.getAll((err, data) => {
        if (err)
            res.render("500", { message: "There was a problem retrieving the list of suppliers" });
        else res.render("supplier-list-all", { suppliers: data });
    });
};

exports.findOne = (req, res) => {
    Supplier.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Supplier with id ${req.params.id}.`
                });
            } else {
                res.render("500", { message: `Error retrieving Supplier with id ${req.params.id}` });
            }
        } else res.render("supplier-update", { supplier: data });
    });
};

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("500", { message: "Validation error" });
    }

    const supplier = new Supplier({
        name: req.body.name,
        contact: req.body.contact,
        phone: req.body.phone,
        email: req.body.email
    });

    Supplier.create(supplier, (err, data) => {
        if (err)
            res.render("500", { message: "There was a problem adding the supplier" });
        else res.redirect("/admin/suppliers");
    });
};

exports.update = (req, res) => {
    const supplier = new Supplier({
        id: req.body.id,
        name: req.body.name,
        contact: req.body.contact,
        phone: req.body.phone,
        email: req.body.email
    });

    Supplier.updateById(supplier, (err, data) => {
        if (err)
            res.render("500", { message: "There was a problem updating the supplier" });
        else res.redirect("/admin/suppliers");
    });
};

exports.remove = (req, res) => {
    Supplier.remove(req.params.id, (err, data) => {
        if (err)
            res.render("500", { message: "There was a problem deleting the supplier" });
        else res.redirect("/admin/suppliers");
    });
};
