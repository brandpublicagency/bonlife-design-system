// Browser-only: loaded lazily when the user clicks "Download PDF".
// Plain, unbranded layout designed for chatbot knowledge bases.
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { marked, type Token, type Tokens } from "marked";
import { numberedTitle, sectionNumbers } from "@/lib/kb-numbering";
import type { KbExportSection } from "@/lib/kb-export";

const s = StyleSheet.create({
  page: { paddingTop: 44, paddingHorizontal: 46, paddingBottom: 52, fontFamily: "Helvetica", fontSize: 9, lineHeight: 1.42, color: "#000" },
  docTitle: { fontFamily: "Helvetica-Bold", fontSize: 17, lineHeight: 1.25, marginBottom: 4 },
  meta: { fontSize: 8, marginBottom: 17 },
  contentsHeading: { fontFamily: "Helvetica-Bold", fontSize: 11, marginBottom: 7 },
  contentsItem: { fontSize: 8.5, lineHeight: 1.35, marginBottom: 2.5 },
  h1: { fontFamily: "Helvetica-Bold", fontSize: 15, lineHeight: 1.25, marginBottom: 13 },
  h2: { fontFamily: "Helvetica-Bold", fontSize: 11.5, lineHeight: 1.3, marginTop: 10, marginBottom: 4.5 },
  h3: { fontFamily: "Helvetica-Bold", fontSize: 10, lineHeight: 1.35, marginTop: 8, marginBottom: 3.5 },
  h4: { fontFamily: "Helvetica-Bold", fontSize: 9, lineHeight: 1.4, marginTop: 6, marginBottom: 3 },
  p: { marginBottom: 6 },
  list: { marginBottom: 6, paddingLeft: 2 },
  li: { flexDirection: "row", marginBottom: 2.5 },
  bullet: { width: 15, paddingRight: 4, textAlign: "right" },
  liText: { flex: 1, paddingLeft: 2 },
  nestedList: { marginTop: 3, marginBottom: 1, paddingLeft: 10 },
  quote: { borderLeftWidth: 1.5, borderLeftColor: "#000", paddingLeft: 8, marginBottom: 6 },
  code: { fontFamily: "Courier", fontSize: 8, lineHeight: 1.35, marginBottom: 6 },
  hr: { borderBottomWidth: 0.5, borderBottomColor: "#000", marginVertical: 8 },
  table: { borderWidth: 0.5, borderColor: "#000", marginBottom: 8 },
  row: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#000" },
  cell: { flex: 1, padding: 3.5, fontSize: 8 },
  th: { flex: 1, padding: 3.5, fontSize: 8, fontFamily: "Helvetica-Bold" },
  bold: { fontFamily: "Helvetica-Bold" },
  italic: { fontFamily: "Helvetica-Oblique" },
  pageNum: { position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center", fontSize: 7.5 },
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

function listItemBlocks(tokens: Token[], keyBase: string): React.ReactNode[] {
  return tokens.map((token, index) => {
    const key = `${keyBase}-${index}`;
    if (token.type === "text") {
      const text = token as Tokens.Text;
      return <Text key={key}>{inline(text.tokens ?? [text], key)}</Text>;
    }
    if (token.type === "paragraph") {
      return <Text key={key}>{inline((token as Tokens.Paragraph).tokens, key)}</Text>;
    }
    if (token.type === "list") {
      return <View key={key} style={s.nestedList}>{renderList(token as Tokens.List, key)}</View>;
    }
    return blocks([token], key);
  });
}

function renderList(list: Tokens.List, keyBase: string) {
  const start = Number(list.start) || 1;
  return (
    <View style={s.list}>
      {list.items.map((item, index) => (
        <View key={`${keyBase}-${index}`} style={s.li} wrap={false}>
          <Text style={s.bullet}>{list.ordered ? `${start + index}.` : "•"}</Text>
          <View style={s.liText}>{listItemBlocks(item.tokens, `${keyBase}-${index}`)}</View>
        </View>
      ))}
    </View>
  );
}

function blocks(tokens: Token[], keyBase = "b"): React.ReactNode[] {
  return tokens.map((t, i) => {
    const key = `${keyBase}-${i}`;
    switch (t.type) {
      case "heading": {
        const h = t as Tokens.Heading;
        const style = h.depth <= 2 ? s.h2 : h.depth === 3 ? s.h3 : s.h4;
        return <Text key={key} style={style} minPresenceAhead={24}>{inline(h.tokens, key)}</Text>;
      }
      case "paragraph":
        return <Text key={key} style={s.p} orphans={2} widows={2}>{inline((t as Tokens.Paragraph).tokens, key)}</Text>;
      case "list": {
        const l = t as Tokens.List;
        return <View key={key}>{renderList(l, key)}</View>;
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
        return <View key={key} style={s.quote} wrap={false}>{blocks((t as Tokens.Blockquote).tokens, key)}</View>;
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
        <Text style={s.contentsHeading}>Contents</Text>
        {titles.map((t, i) => <Text key={i} style={s.contentsItem}>{t}</Text>)}
        {pageNum}
      </Page>
      {sections.map((sec, i) => (
        <Page key={sec.slug} size="A4" style={s.page}>
          <Text style={s.h1} minPresenceAhead={36}>{titles[i]}</Text>
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
