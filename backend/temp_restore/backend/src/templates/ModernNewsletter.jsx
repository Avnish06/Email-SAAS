import {
  Html, Head, Body, Container, Section, 
  Text, Link, Img, Button, Hr, Tailwind
} from "@react-email/components";

export default function ModernNewsletter({
  title = "Weekly Insights",
  heroImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
  content = "Stay ahead of the curve with our latest updates.",
  buttonText = "Read More",
  buttonUrl = "#",
  accentColor = "#4F46E5" // Users can customize this via your "color" field type
}) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-[600px] mx-auto">
            {/* Hero Image */}
            <Img src={heroImage} width="600" height="300" className="object-cover" />
            
            <Section className="px-10 py-8">
              <Text className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                Latest Update
              </Text>
              <Text className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                {title}
              </Text>
              <Text className="text-gray-600 text-lg leading-relaxed mb-6">
                {content}
              </Text>
              <Button 
                href={buttonUrl}
                style={{ backgroundColor: accentColor }}
                className="text-white px-6 py-3 rounded-md font-semibold text-center block w-full md:w-max"
              >
                {buttonText}
              </Button>
            </Section>
            
            <Hr className="border-gray-200 mx-10" />
            
            <Section className="px-10 py-6">
              <Text className="text-gray-400 text-sm text-center">
                © 2026 Your Company. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}