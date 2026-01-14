import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  verifyLink?: string;
}

export const VerifyEmail = ({ verifyLink }: VerifyEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="bg-white border border-solid border-[#eee] rounded shadow-md mt-5 max-w-[360px] mx-auto my-0 pt-[68px] px-0 pb-[130px]">
          <Text className="text-[#0a85ea] text-[11px] font-bold h-4 tracking-[0] leading-[16px] mt-4 mb-2 mx-2 uppercase text-center">
            Verify Your Email
          </Text>
          <Heading className="text-black font-medium text-[20px] leading-[24px] my-0 text-center px-4">
            Click the button below to verify your email address.
          </Heading>
          <Section className="mx-auto mt-6 mb-4 text-center">
            <Button
              href={verifyLink}
              className="bg-[#0a85ea] text-white text-[14px] font-bold py-3 px-6 rounded"
            >
              Verify Email
            </Button>
          </Section>
          <Text className="text-[#444] text-[15px] leading-[23px] tracking-[0] py-0 px-10 m-0 text-center">
            Not expecting this email?
          </Text>
          <Text className="text-[#444] text-[15px] leading-[23px] tracking-[0] py-0 px-10 m-0 text-center">
            Contact{" "}
            <Link
              href="mailto:support@example.com"
              className="text-[#444] underline"
            >
              support@example.com
            </Link>{" "}
            if you did not create an account.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerifyEmail;
