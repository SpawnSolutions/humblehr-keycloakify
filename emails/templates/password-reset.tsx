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

export const templateName = "Reset Password";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={`HumbleHR Reset Password`} locale={locale}>
        <Container style={container}>
            <Text style={paragraph}>
                Someone just requested to change your <b>{exp("user.email")}</b> account's
                credentials.
            </Text>
            <Text style={paragraph}>
                If this was you, click on the link below to reset them.
            </Text>
            <Section style={{ textAlign: "center", paddingBlock: "16px" }}>
                <Link href={exp("link")} style={{ fontSize: "18px" }}>
                    Link to reset password
                </Link>
            </Section>
            <Text style={paragraph}>
                This link will expire within{" "}
                <b>{exp("linkExpirationFormatter(linkExpiration)")}.</b>
            </Text>
            <Text style={paragraph}>
                If you don't want to reset your credentials, just ignore this message and
                nothing will be changed.
            </Text>
        </Container>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Reset password";
};
// import { GetSubject, GetTemplate } from "keycloakify-emails";

// export const getTemplate: GetTemplate = async (_props) => {
//   return "<p>This is a test message</p>";
// };

// export const getSubject: GetSubject = async (_props) => {
//   return "[KEYCLOAK] - SMTP test message";
// };
export default Template;
