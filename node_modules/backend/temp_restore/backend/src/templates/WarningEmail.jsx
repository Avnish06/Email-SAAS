export default function WarningEmail({
  title,
  message,
  actionText,
  actionUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#fff7ed", padding: "20px" }}>
        <Container style={{ background: "#ffffff", padding: "30px", borderRadius: "10px", border: "1px solid #f97316" }}>
          <Heading style={{ color: "#f97316" }}>{title}</Heading>
          <Text>{message}</Text>
          <Button href={actionUrl} style={{ background: "#f97316", color: "#fff", padding: "12px 20px" }}>
            {actionText}
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
