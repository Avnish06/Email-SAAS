export default function ConfirmationEmail({
  confirmationMessage,
  confirmUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ padding: "20px" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>Confirm Your Action</Heading>
          <Text>{confirmationMessage}</Text>
          <Button href={confirmUrl}>Confirm</Button>
        </Container>
      </Body>
    </Html>
  );
}
