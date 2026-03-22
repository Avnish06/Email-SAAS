export default function EducationalEmail({
  topic,
  description,
  articleUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ padding: "20px", background: "#eff6ff" }}>
        <Container style={{ background: "#fff", padding: "30px" }}>
          <Heading>{topic}</Heading>
          <Text>{description}</Text>
          <Button href={articleUrl}>Read Article</Button>
        </Container>
      </Body>
    </Html>
  );
}
