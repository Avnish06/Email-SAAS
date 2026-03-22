export default function TransactionalEmail({
  orderId,
  amount,
  status,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ padding: "20px" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>Order Confirmation</Heading>
          <Text>Order ID: {orderId}</Text>
          <Text>Amount: ${amount}</Text>
          <Text>Status: {status}</Text>
        </Container>
      </Body>
    </Html>
  );
}
