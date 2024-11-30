import { z } from "zod"
 
export const formSchema = z.object({
  username: z.string().refine(data => {
    // Check if the username is admin
    if (data === "admin") {
        return true
        }
        return false
        }, {
        message: "Invalid username",

    }),
  password: z.string().refine(data => {
    // Check if the password is 12345
    if (data === "12345") {
        return true
        }
        return false
        }, {
        message: "Invalid password",
    }),

})

export type FormType = z.infer<typeof formSchema>