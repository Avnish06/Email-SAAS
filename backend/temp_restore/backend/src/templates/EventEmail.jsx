
const html = render(
  EventEmail({ name: "Avnish" })
);



export default function EventEmail({
  eventName,
  eventDate,
  eventLink,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ padding: "20px" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>{eventName}</Heading>
          <Text>Date: {eventDate}</Text>
          <Button href={eventLink}>Register Now</Button>
        </Container>
      </Body>
    </Html>
  );
}
