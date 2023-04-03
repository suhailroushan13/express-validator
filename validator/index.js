import { body, validationResult } from "express-validator";

function userRegisterValidation() {
  return [
    body("fname", "First Name should not be empty").notEmpty(),
    body("lname", "Last Name should not be empty").notEmpty(),
    body("age", "Age should be number")
      .notEmpty()
      .withMessage("Age is required")
      .isInt({ min: 18 })
      .withMessage("Age must be a positive integer")
      .isInt({ max: 100 })
      .withMessage("Age must be less than or equal to 100"),
    body("email", "Email is Invalid").isEmail(),
    body("phone", "Phone Number is Invalid").isMobilePhone(),
    body("address", "Address is Invalid")
      .notEmpty()
      .isLength({ min: 5, max: 50 }),
    body("password", "Password should be greater than 6 and cannot be empty")
      .notEmpty()
      .isLength({ min: 6 }),
    body("confirmpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password Does Not Match");
      }
      return true;
    }),
  ];
}

function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors["errors"] });
  }
  return next();
}

export { userRegisterValidation, errorMiddleware };
