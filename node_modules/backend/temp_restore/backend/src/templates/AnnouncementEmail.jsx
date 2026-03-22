export default function AnnouncementEmail({
  announcementTitle,
  details,
  buttonUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ padding: "20px", background: "#f3e8ff" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>{announcementTitle}</Heading>
          <Text>{details}</Text>
          <Button href={buttonUrl}>Learn More</Button>
        </Container>
      </Body>
    </Html>
  );
}
