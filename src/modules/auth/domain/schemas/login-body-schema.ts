import {z} from "zod";
import {validate_document} from "@/helpers/document";

export const LoginBodySchema = z.object({
    document: z.string()
        .refine(validate_document, {
            message: 'É necessário fornecer um documento válido.',
            path: ['document'],
        }).optional(),
    email: z.string().email().optional(),
    password: z.string(),
}).refine(data => data.document || data.email, {
    message: 'É necessário fornecer um e-mail ou um documento.',
    path: ['document', 'email']
});


export type LoginBody = z.infer<typeof LoginBodySchema>

export const LoginResponseSchema = z.object({
    message: z.string(),
    access_token: z.string().optional(),
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>