import { Body, Container, Head, Html, Img, Preview, Section } from "jsx-email";
import { PropsWithChildren } from "react";

const main = {
    backgroundColor: "#F1F3F5",
    color: "#050508",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    textAlign: "center" as const
};

const container = {
    color: "#050508",
    backgroundColor: "#ffffff",
    border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "0 5px 10px rgba(20,50,70,.2)",
    width: "480px",
    maxWidth: "100%",
    margin: "0 auto",
    marginTop: "30px",
    padding: "80px 0 80px"
};

const logoImage = {
    width: "180px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center" as const
};

export const EmailLayout = ({
    locale,
    children,
    preview
}: PropsWithChildren<{ preview: string; locale: string }>) => {
    return (
        <Html lang={locale}>
            <Head />
            <Preview>{preview}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section>
                        <Img
                            style={logoImage}
                            src="https://cdn.dev.humble.hr/HumbleHR-Logo-Light.png"
                        />
                    </Section>
                    <>{children}</>
                </Container>
            </Body>
        </Html>
    );
};
