const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const mongoose = require("mongoose");
const common = require("../helpers/common");
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(config.SALT_ROUND);
mongooseErrorHandler = require('mongoose-error-handler');

const formidable = require("formidable");
module.exports = {
    register: async function (req, res) {

        const data = new userSchema({
            _id: mongoose.Types.ObjectId(),
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            city: req.body.city,
            address: req.body.address,

        })
        let email_chk = await userSchema.findOne({ email: req.body.email });
        if (!email_chk) {

            data.save().then((result) => {
                return res.success("User created successfully.", result, config.SUCCESS_STATUS_CODE);

            }).catch((error) => {
                return res.error("Something went wrong please try after some time.", mongooseErrorHandler.set(error, req.t), config.BAD_REQUEST_STATUS_CODE);
            });

            // data.save().then(
            //     (result) => {
            //         return res.success("User created successfully.", result, config.SUCCESS_STATUS_CODE);

            //     }, (error) => {
            //         return res.error("Something went wrong please try after some time.", mongooseErrorHandler.set(error, req.t), config.BAD_REQUEST_STATUS_CODE);
            //     });
        } else {
            return res.error("The email address is already registered, please use another email id.", 'User not created.', config.BAD_REQUEST_STATUS_CODE);
        }
    },

    users: async function (req, res) {
        await userSchema.find((err, result) => {
            if (err) {
                return res.error("Something went wrong please try after some time.", '', config.BAD_REQUEST_STATUS_CODE);
            }
            else {
                if (result)
                    return res.success("User found successfully.", result, config.SUCCESS_STATUS_CODE);
                return res.success("User not foud.", [], config.NOT_FOUND_STATUS_CODE);
            }
        });
    },

    edit: function (req, res) {
        let id = req.params.user_id;
        userSchema.findById(id, (err, result) => {
            if (err) {
                return res.error("Something went wrong please try after some time.", '', config.BAD_REQUEST_STATUS_CODE);
            }
            else {
                if (result)
                    return res.success("User found successfully.", result, config.SUCCESS_STATUS_CODE);
                return res.success("User not found.", [], config.NOT_FOUND_STATUS_CODE);
            }
        });

    },

    delete: function (req, res) {
        userSchema.findOneAndDelete({ _id: req.params.user_id }, (err, result) => {
            if (err) {
                return res.error("Something went wrong please try after some time.", '', config.BAD_REQUEST_STATUS_CODE);
            }
            else {
                if (result)
                    return res.success("User delete successfully.", result, config.SUCCESS_STATUS_CODE);
                return res.success("User not found.", [], config.NOT_FOUND_STATUS_CODE);
            }
        });
    },

    update: async function (req, res) {

        let id = req.params.user_id;
        let user = await userSchema.findOne({ _id: id });
        if (user) {

            user.f_name = req.body.f_name,
                user.l_name = req.body.l_name,
                user.email = req.body.email,
                user.city = req.body.city,
                user.address = req.body.address,

                await user.save().then(
                    (result) => {
                        return res.success("User update successfully.", result, config.SUCCESS_STATUS_CODE);

                    }, (error) => {
                        return res.error("Something went wrong please try after some time.", mongooseErrorHandler.set(error, req.t), config.BAD_REQUEST_STATUS_CODE);
                    });
        } else {
            return res.success("User not found.", '', config.NOT_FOUND_STATUS_CODE);
        }
    },




}


