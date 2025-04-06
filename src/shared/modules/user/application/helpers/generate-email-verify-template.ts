import * as fs from "node:fs";
import * as path from "node:path";
import * as handlebars from "handlebars";

export function generate_email_verify_template(
    verification_link: string
): string {
    const templatePath = path.resolve(
        __dirname,
        "../../view/email-verify-template.html"
    );
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(templateSource);

    return compiledTemplate({
        verification_link,
        year: new Date().getFullYear(),
    });
}