"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const registrationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    pin: zod_1.z.string().length(5),
    mobileNumber: zod_1.z.string().length(11),
    email: zod_1.z.string().email(),
    nid: zod_1.z.string().length(10),
});
const validateRegistration = (data) => {
    try {
        registrationSchema.parse(data);
        return null;
    }
    catch (error) {
        return error.errors[0];
    }
};
exports.default = validateRegistration;
