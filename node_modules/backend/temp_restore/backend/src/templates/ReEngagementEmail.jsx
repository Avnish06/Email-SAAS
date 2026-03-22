export default function ReEngagementEmail({
  message,
  actionUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ padding: "20px", background: "#fdf2f8" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>We Miss You 💔</Heading>
          <Text>{message}</Text>
          <Button href={actionUrl}>Come Back</Button>
        </Container>
      </Body>
    </Html>
  );
}
