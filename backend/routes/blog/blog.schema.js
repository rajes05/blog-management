import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(4, "title must be atleast of 4 characters !"),
  content: z.string().min(1,"Content is required").max(300,"Content must be atmost of 300 characters !"),
  category: z.enum(['Technology','Health','Travel','Food','Lifestyle','Other'],{required_error:"Please select a category !"}),
});
