// Browser-only: loaded lazily when the user clicks "Download PDF".
// Plain, unbranded layout designed for chatbot knowledge bases.
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { marked, type Token, type Tokens } from "marked";
import { numberedTitle, sectionNumbers } from "@/lib/kb-numbering";
import type { KbExportSection } from "@/lib/kb-export";

const s = StyleSheet.create({
  page: { padding: 56, paddingBottom: 64, fontFamily: "Helvetica", fontSize: 10.5, lineHeight: 1.5, color: "#000" },
  docTitle: { fontFamily: "Helvetica-Bold", fontSize: 20, lineHeight: 1.3, marginBottom: 6 },
  meta: { fontSize: 10, marginBottom: 20 },
  h1: { fontFamily: "Helvetica-Bold", fontSize: 18, marginBottom: 12 },
  h2: { fontFamily: "Helvetica-Bold", fontSize: 14, marginTop: 14, marginBottom: 6 },
  h3: { fontFamily: "Helvetica-Bold", fontSize: 12, marginTop: 10, marginBottom: 4 },
  p: { marginBottom: 8 },
  li: { flexDirection: "row", marginBottom: 3 },
  bullet: { width: 16 },
  liText: { flex: 1 },
  quote: { borderLeftWidth: 2, borderLeftColor: "#000", paddingLeft: 8, marginBottom: 8 },
  code: { fontFamily: "Courier", fontSize: 9.5, marginBottom: 8 },
  hr: { borderBottomWidth: 0.5, borderBottomColor: "#000", marginVertical: 10 },
  table: { borderWidth: 0.5, borderColor: "#000", marginBottom: 10 },
  row: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#000" },
  cell: { flex: 1, padding: 4, fontSize: 9.5 },
  th: { flex: 1, padding: 4, fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  bold: { fontFamily: "Helvetica-Bold" },
  italic: { fontFamily: "Helvetica-Oblique" },
  pageNum: { position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center", fontSize: 9 },
});

function inline(tokens: Token[] | undefined, keyBase = "i"): React.ReactNode[] {
  if (!tokens) return [];
  return tokens.map((t, i) => {
    const key = `${keyBase}-${i}`;
    switch (t.type) {
      case "strong":
        return <Text key={key} style={s.bold}>{inline((t as Tokens.Strong).tokens, key)}</Text>;
      case "em":
        return <Text key={key} style={s.italic}>{inline((t as Tokens.Em).tokens, key)}</Text>;
      case "codespan":
        return <Text key={key} style={{ fontFamily: "Courier" }}>{(t as Tokens.Codespan).text}</Text>;
      case "link": {
        const l = t as Tokens.Link;
        return <Text key={key}>{inline(l.tokens, key)} ({l.href})</Text>;
      }
      case "escape":
        return (t as Tokens.Escape).text;
      case "br":
        return "\n";
      case "text": {
        const tt = t as Tokens.Text;
        return tt.tokens ? <Text key={key}>{inline(tt.tokens, key)}</Text> : decode(tt.text);
      }
      default:
        return decode((t as { raw?: string }).raw ?? "");
    }
  });
}

function decode(str: string) {
  return str.replace(/\\([\\`*_{}\[\]()#+\-.!|>~])/g, "$1").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function blocks(tokens: Token[], keyBase = "b"): React.ReactNode[] {
  return tokens.map((t, i) => {
    const key = `${keyBase}-${i}`;
    switch (t.type) {
      case "heading": {
        const h = t as Tokens.Heading;
        return <Text key={key} style={h.depth <= 2 ? s.h2 : s.h3}>{inline(h.tokens, key)}</Text>;
      }
      case "paragraph":
        return <Text key={key} style={s.p}>{inline((t as Tokens.Paragraph).tokens, key)}</Text>;
      case "list": {
        const l = t as Tokens.List;
        return (
          <View key={key} style={{ marginBottom: 8 }}>
            {l.items.map((it, j) => (
              <View key={j} style={s.li} wrap={false}>
                <Text style={s.bullet}>{l.ordered ? `${(Number(l.start) || 1) + j}.` : "-"}</Text>
                <View style={s.liText}>
                  {it.tokens.map((c, k) =>
                    c.type === "text" ? (
                      <Text key={k}>{inline((c as Tokens.Text).tokens ?? [c], `${key}-${j}-${k}`)}</Text>
                    ) : (
                      blocks([c], `${key}-${j}-${k}`)
                    ),
                  )}
                </View>
              </View>
            ))}
          </View>
        );
      }
      case "table": {
        const tb = t as Tokens.Table;
        return (
          <View key={key} style={s.table}>
            <View style={s.row} wrap={false}>
              {tb.header.map((c, j) => <Text key={j} style={s.th}>{inline(c.tokens, `${key}-h${j}`)}</Text>)}
            </View>
            {tb.rows.map((r, ri) => (
              <View key={ri} style={s.row} wrap={false}>
                {r.map((c, j) => <Text key={j} style={s.cell}>{inline(c.tokens, `${key}-${ri}-${j}`)}</Text>)}
              </View>
            ))}
          </View>
        );
      }
      case "blockquote":
        return <View key={key} style={s.quote}>{blocks((t as Tokens.Blockquote).tokens, key)}</View>;
      case "code":
        return <Text key={key} style={s.code}>{(t as Tokens.Code).text}</Text>;
      case "hr":
        return <View key={key} style={s.hr} />;
      case "space":
        return null;
      default:
        return (t as { raw?: string }).raw ? <Text key={key} style={s.p}>{decode((t as { raw: string }).raw)}</Text> : null;
    }
  });
}

function KbPdf({ sections }: { sections: KbExportSection[] }) {
  const nums = sectionNumbers(sections);
  const titles = sections.map((x, i) => numberedTitle(x.title, nums[i]));
  const date = new Date().toISOString().slice(0, 10);
  const pageNum = (
    <Text style={s.pageNum} fixed render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
  );
  return (
    <Document title="Bonlife Knowledge Base" author="Bonlife">
      <Page size="A4" style={s.page}>
        <Text style={s.docTitle}>Bonlife Knowledge Base</Text>
        <Text style={s.meta}>Updated {date}</Text>
        <Text style={s.h2}>Contents</Text>
        {titles.map((t, i) => <Text key={i} style={{ marginBottom: 2 }}>{t}</Text>)}
        {pageNum}
      </Page>
      {sections.map((sec, i) => (
        <Page key={sec.slug} size="A4" style={s.page}>
          <Text style={s.h1}>{titles[i]}</Text>
          {blocks(marked.lexer(sec.body_markdown || ""), `s${i}`)}
          {pageNum}
        </Page>
      ))}
    </Document>
  );
}

export async function renderKbPdf(sections: KbExportSection[]): Promise<Blob> {
  return pdf(<KbPdf sections={sections} />).toBlob();
}
