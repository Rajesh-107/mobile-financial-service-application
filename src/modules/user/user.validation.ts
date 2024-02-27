import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(1),
  pin: z.string().length(5),
  mobileNumber: z.string().length(11),
  email: z.string().email(),
  nid: z.string().length(10),
});

const validateRegistration = (data) => {
  try {
    registrationSchema.parse(data);
    return null;
  } catch (error) {
    return error.errors[0];
  }
};

export default validateRegistration;
