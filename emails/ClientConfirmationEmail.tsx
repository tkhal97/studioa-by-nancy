import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const colors = {
  canvas: "#F7F4EE",
  linen: "#EDE7DC",
  stone: "#C9C0B2",
  clay: "#8E8273",
  ink: "#2A2622",
};

export function ClientConfirmationEmail({ firstName }: { firstName: string }) {
  return (
    <Html>
      <Head />
      <Preview>Thank you - Nancy will be in touch shortly.</Preview>
      <Body style={{ background: colors.canvas, margin: 0, padding: "40px 0" }}>
        <Container
          style={{
            background: colors.canvas,
            maxWidth: 580,
            margin: "0 auto",
            padding: "40px 36px",
            border: `1px solid ${colors.stone}`,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              margin: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: colors.clay,
              textTransform: "uppercase",
            }}
          >
            Studio · A · by · Nancy
          </Text>

          <Heading
            style={{
              margin: "24px 0 0",
              fontFamily: "Georgia, serif",
              fontSize: 36,
              lineHeight: 1.05,
              fontWeight: 400,
              color: colors.ink,
            }}
          >
            Thank you, {firstName}.
          </Heading>

          <Text
            style={{
              marginTop: 24,
              fontFamily: "Georgia, serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.ink,
            }}
          >
            Your inquiry has been received. I personally review every project
            request, and I will be in touch within two business days.
          </Text>

          <Text
            style={{
              marginTop: 18,
              fontFamily: "Georgia, serif",
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.ink,
            }}
          >
            In the meantime, you may enjoy spending an unhurried moment with the
            studio&apos;s recent work.
          </Text>

          <Section style={{ marginTop: 30 }}>
            <a
              href="https://studioabynancy.com/portfolio"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                background: colors.ink,
                color: colors.canvas,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 999,
                fontFamily: "Helvetica, Arial, sans-serif",
              }}
            >
              View Portfolio
            </a>
          </Section>

          <Text
            style={{
              marginTop: 40,
              fontFamily: "Georgia, serif",
              fontSize: 18,
              fontStyle: "italic",
              color: colors.ink,
            }}
          >
            With care,
            <br />- Nancy
          </Text>

          <hr
            style={{
              border: "none",
              borderTop: `1px solid ${colors.stone}`,
              margin: "32px 0 16px",
            }}
          />
          <Text style={{ margin: 0, fontSize: 11, color: colors.clay }}>
            Studio A by Nancy · By appointment · NY · LA · Aspen
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ClientConfirmationEmail;
