import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { IntakePayload } from "@/lib/intake/schema";
import { labels } from "@/lib/intake/schema";

const colors = {
  canvas: "#F7F4EE",
  linen: "#EDE7DC",
  stone: "#C9C0B2",
  clay: "#8E8273",
  ink: "#2A2622",
  obsidian: "#14110E",
};

export function NancyLeadEmail({
  data,
  leadId,
}: {
  data: IntakePayload;
  leadId?: string;
}) {
  const c = data.contact;
  return (
    <Html>
      <Head />
      <Preview>
        New {data.projectType} inquiry from {c.name}
      </Preview>
      <Body style={{ background: colors.canvas, margin: 0, padding: "32px 0" }}>
        <Container
          style={{
            background: colors.canvas,
            border: `1px solid ${colors.stone}`,
            borderRadius: 4,
            maxWidth: 640,
            margin: "0 auto",
            padding: 0,
          }}
        >
          <Section
            style={{
              padding: "28px 32px",
              borderBottom: `1px solid ${colors.stone}`,
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
                margin: "10px 0 0",
                fontFamily: "Georgia, serif",
                fontSize: 30,
                fontWeight: 400,
                color: colors.ink,
                lineHeight: 1.1,
              }}
            >
              New inquiry - {capitalize(data.projectType)}
            </Heading>
            <Text style={{ marginTop: 12, color: colors.clay, fontSize: 13 }}>
              Source: {data.source ?? "direct"} · Intent:{" "}
              {data.intent ?? "inquire"}
              {leadId ? ` · #${leadId.slice(0, 8)}` : ""}
            </Text>
          </Section>

          <Section style={{ padding: "12px 32px 28px" }}>
            <Row label="Name" value={c.name} />
            <Row label="Email" value={c.email} />
            {c.phone && <Row label="Phone" value={c.phone} />}
            {c.location && <Row label="Location" value={c.location} />}
            <Hr style={{ borderColor: colors.stone, margin: "20px 0" }} />
            <Row label="Project" value={capitalize(data.projectType)} />
            <Row
              label="Scope"
              value={data.scope.map((s) => labels.scope[s]).join(" · ")}
            />
            <Row label="Aesthetic" value={labels.aesthetic[data.aesthetic]} />
            <Row
              label="Investment"
              value={
                labels.investment[
                  data.investment as keyof typeof labels.investment
                ]
              }
            />
            <Row label="Timeline" value={labels.timeline[data.timeline]} />

            {data.details && (
              <>
                <Hr style={{ borderColor: colors.stone, margin: "20px 0" }} />
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
                  Notes
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    fontFamily: "Georgia, serif",
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: colors.ink,
                    whiteSpace: "pre-line",
                  }}
                >
                  {data.details}
                </Text>
              </>
            )}
          </Section>

          <Section
            style={{
              background: colors.linen,
              padding: "20px 32px",
              borderTop: `1px solid ${colors.stone}`,
            }}
          >
            <Text style={{ margin: 0, fontSize: 13, color: colors.ink }}>
              Reply directly to{" "}
              <a href={`mailto:${c.email}`} style={{ color: colors.ink }}>
                {c.email}
              </a>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{ marginTop: 14 }}
    >
      <tbody>
        <tr>
          <td
            style={{
              width: 120,
              verticalAlign: "top",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: colors.clay,
              textTransform: "uppercase",
              paddingRight: 12,
              paddingTop: 4,
            }}
          >
            {label}
          </td>
          <td
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 17,
              color: colors.ink,
              lineHeight: 1.45,
            }}
          >
            {value}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default NancyLeadEmail;
