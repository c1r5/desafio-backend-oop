import {z} from "zod";
import {CNPJ_REGEX, CPF_REGEX} from "@/shared/application/helpers";


export const LoginRequestSchema = z.object({
    document: z.string().refine(s => s.match(CPF_REGEX) || s.match(CNPJ_REGEX), {
        message: 'É necessário fornecer um documento válido.',
        path: ['document'],
    }).optional(),
    email: z.string().email('Email inválido').optional(),
    password: z.string().min(8, 'Senha é no minimo 8 caractéres')
}).refine(data => data.document || data.email, {
    message: 'É necessário fornecer um e-mail ou um documento.',
    path: ['document', 'email']
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>