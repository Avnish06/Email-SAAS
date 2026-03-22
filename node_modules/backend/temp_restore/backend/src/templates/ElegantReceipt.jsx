// backend/src/templates/ElegantReceipt.js

import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Row,
  Column,
  Hr,
  Tailwind
} from "@react-email/components";

export default function ElegantReceipt({
  orderNumber = "#12345",
  customerName = "Valued Customer",
  totalAmount = "0.00",
  status = "Paid",
  primaryColor = "#000000"
}) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans py-12">
          <Container
            className="max-w-[580px] border-t-4 mx-auto px-4"
            style={{ borderColor: primaryColor }}
          >
            <Section className="py-8">
              <Text className="text-2xl font-bold">
                Thank you for your order, {customerName}!
              </Text>

              <Text className="text-gray-500">
                We've received your payment and are processing it now.
              </Text>
            </Section>

            <Section className="bg-gray-50 rounded-xl p-6 mb-6">
              <Row>
                <Column>
                  <Text className="text-xs text-gray-400 uppercase font-bold m-0">
                    Order ID
                  </Text>

                  <Text className="text-sm font-semibold m-0">
                    {orderNumber}
                  </Text>
                </Column>

                <Column className="text-right">
                  <Text className="text-xs text-gray-400 uppercase font-bold m-0">
                    Status
                  </Text>

                  <Text
                    className="text-sm font-semibold m-0"
                    style={{ color: primaryColor }}
                  >
                    {status}
                  </Text>
                </Column>
              </Row>

              <Hr className="my-4 border-gray-200" />

              <Row>
                <Column>
                  <Text className="text-lg font-bold m-0 text-gray-800">
                    Total Amount
                  </Text>
                </Column>

                <Column className="text-right text-lg font-bold m-0 text-gray-800">
                  ${totalAmount}
                </Column>
              </Row>
            </Section>

            <Text className="text-gray-400 text-xs text-center italic">
              First I need to put report Over there
            </Text>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
