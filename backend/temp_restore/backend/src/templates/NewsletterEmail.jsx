export default function NewsletterEmail({
  title,
  intro,
  articleTitle,
  articleDescription,
  articleUrl,
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", padding: "20px" }}>
        <Container style={{ background: "#ffffff", padding: "30px", borderRadius: "8px" }}>
          <Heading>{title}</Heading>
          <Text>{intro}</Text>
          <Heading style={{ fontSize: "18px" }}>{articleTitle}</Heading>
          <Text>{articleDescription}</Text>
          <Button href={articleUrl}>Read More</Button>
        </Container>
      </Body>
    </Html>
  );
}
