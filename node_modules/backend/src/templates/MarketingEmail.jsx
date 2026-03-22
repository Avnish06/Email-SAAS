import { Html, Head, Body, Container, Heading, Text, Button } from "@react-email/components";

export default function MarketingEmail({
  heading,
  content,
  buttonText,
  buttonUrl,
  brandColor = "#2563eb",
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f3f4f6", padding: "20px" }}>
        <Container style={{ background: "#ffffff", padding: "30px", borderRadius: "10px" }}>
          <Heading>{heading}</Heading>
          <Text>{content}</Text>
          <Button href={buttonUrl} style={{ background: brandColor, color: "#fff", padding: "12px 20px" }}>
            {buttonText}
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
