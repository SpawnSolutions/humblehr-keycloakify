import { Container, Link, render, Section, Text } from "jsx-email";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { EmailLayout } from "../layout";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const paragraph: React.CSSProperties = {
    display: "block",
    // color: "#777",
    fontSize: "16px",
    lineHeight: "24px",

    textAlign: "center"
};

const container = {
    // color: "#050508",
    // backgroundColor: "#ffffff",
    // border: "1px solid #eee",
    // borderRadius: "5px",
    // boxShadow: "0 5px 10px rgba(20,50,70,.2)",
    // width: "480px",
    // maxWidth: "100%",
    // margin: "0 auto",
    // marginTop: "30px",
    padding: "16px"
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "humblehr"
};

export const templateName = "Email Verification";

const { exp } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={`Here is a preview`} locale={locale}>
        <Container style={container}>
            <Text style={paragraph}>
                Someone has created a <b>{exp("user.firstName")}</b> account with this
                email address. If this was you, click the link below to verify your email
                address
            </Text>
            <Section style={{ textAlign: "center", paddingBlock: "16px" }}>
                <Link href={exp("link")} style={{ fontSize: "18px" }}>
                    Click to verify e-mail address
                </Link>
            </Section>
            <Text style={paragraph}>
                This link will expire within{" "}
                <b>{exp("linkExpirationFormatter(linkExpiration)")}.</b>
            </Text>
            <Text style={paragraph}>
                If you didn't create this account, just ignore this message.
            </Text>

            {/* <Text style={paragraph}>
                <p>
                    Someone has created a {exp("user.firstName")} account with this email
                    address. If this was you, click the link below to verify your email
                    address
                </p>
                <p>
                    <a href={exp("link")}>Link to e-mail address verification</a>
                </p>
                <p>
                    This link will expire within{" "}
                    {exp("linkExpirationFormatter(linkExpiration)")}.
                </p>
                <p>If you didn't create this account, just ignore this message.</p>
            </Text> */}
        </Container>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Verify email";
};
// import { GetSubject, GetTemplate } from "keycloakify-emails";

// export const getTemplate: GetTemplate = async (_props) => {
//   return "<p>This is a test message</p>";
// };

// export const getSubject: GetSubject = async (_props) => {
//   return "[KEYCLOAK] - SMTP test message";
// };
export default Template;
