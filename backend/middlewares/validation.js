import {ZodError} from 'zod';


export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {

    console.log("zod error",err)
    if (err instanceof ZodError) {
      // Map the actual issues
      const errors = err.issues.map(issue => ({
        field: issue.path.join("."), // e.g., "title"
        message: issue.message,      // e.g., "title must be atleast of 4 characters !"
      }));

      return res.status(400).json({ errors });
    }

    res.status(500).json({ message: "Server error" });
  }
};
