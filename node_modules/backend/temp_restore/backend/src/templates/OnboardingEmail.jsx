export default function OnboardingEmail({
  stepTitle,
  stepDescription,
  actionUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ padding: "20px" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>{stepTitle}</Heading>
          <Text>{stepDescription}</Text>
          <Button href={actionUrl}>Complete Step</Button>
        </Container>
      </Body>
    </Html>
  );
}
