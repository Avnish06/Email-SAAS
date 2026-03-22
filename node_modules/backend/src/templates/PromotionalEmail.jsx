export default function PromotionalEmail({
  offerTitle,
  offerDetails,
  discountCode,
  buttonUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ background: "#fefce8", padding: "20px" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>{offerTitle}</Heading>
          <Text>{offerDetails}</Text>
          <Text><strong>Use Code: {discountCode}</strong></Text>
          <Button href={buttonUrl}>Shop Now</Button>
        </Container>
      </Body>
    </Html>
  );
}
