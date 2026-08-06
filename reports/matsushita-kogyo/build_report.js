// 松下工業様 採用強化支援 総括レポート
const pptxgen = require("pptxgenjs");

const NAVY = "1B3A5C";      // 主色: 深いスチールネイビー
const NAVY_D = "12293F";    // 表紙用さらに濃い
const STEEL = "5A7A99";     // 補助
const LIGHT = "F2F6FA";     // 薄い背景
const ORANGE = "E8762C";    // アクセント: セーフティオレンジ
const GRAY = "6B7280";
const WHITE = "FFFFFF";
const JP = "Yu Gothic";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

// ---------- helpers ----------
function titleSlide(slide, num, title, subtitle) {
  slide.background = { color: WHITE };
  slide.addText(title, { x: 0.6, y: 0.32, w: 10.5, h: 0.75, fontFace: JP, fontSize: 30, bold: true, color: NAVY, margin: 0 });
  if (subtitle) slide.addText(subtitle, { x: 0.62, y: 1.02, w: 11.5, h: 0.4, fontFace: JP, fontSize: 13, color: GRAY, margin: 0 });
  slide.addText(String(num).padStart(2, "0"), { x: 12.35, y: 0.35, w: 0.7, h: 0.5, fontFace: "Arial", fontSize: 16, bold: true, color: STEEL, align: "right", margin: 0 });
}

function circleIcon(slide, x, y, ch, color) {
  slide.addShape("ellipse", { x, y, w: 0.42, h: 0.42, fill: { color: color || ORANGE } });
  slide.addText(ch, { x, y: y - 0.005, w: 0.42, h: 0.42, fontFace: JP, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
}

function statCard(slide, x, y, w, h, big, label, sub, accent) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.08, fill: { color: LIGHT } });
  slide.addText(big, { x: x + 0.15, y: y + 0.12, w: w - 0.3, h: h * 0.5, fontFace: JP, fontSize: 32, bold: true, color: accent || NAVY, margin: 0 });
  slide.addText(label, { x: x + 0.15, y: y + h * 0.55, w: w - 0.3, h: 0.32, fontFace: JP, fontSize: 12.5, bold: true, color: NAVY, margin: 0 });
  if (sub) slide.addText(sub, { x: x + 0.15, y: y + h * 0.55 + 0.3, w: w - 0.3, h: h - (h * 0.55 + 0.35), fontFace: JP, fontSize: 9.5, color: GRAY, margin: 0 });
}

// ============ 1. 表紙 ============
{
  const s = pres.addSlide();
  s.background = { color: NAVY_D };
  s.addShape("rect", { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: NAVY_D } });
  // 配管モチーフの装飾(右下に淡い円)
  s.addShape("ellipse", { x: 10.4, y: 4.4, w: 4.6, h: 4.6, fill: { color: NAVY } });
  s.addShape("ellipse", { x: 11.5, y: 5.5, w: 2.4, h: 2.4, fill: { color: "1F4468" } });
  s.addText("採用強化支援 総括レポート", { x: 0.9, y: 2.35, w: 11.5, h: 1.0, fontFace: JP, fontSize: 44, bold: true, color: WHITE, margin: 0 });
  s.addText("株式会社松下工業様", { x: 0.92, y: 3.45, w: 10, h: 0.6, fontFace: JP, fontSize: 24, color: "CADCFC", margin: 0 });
  s.addText("支援期間:2025年12月 〜 2026年8月", { x: 0.92, y: 4.35, w: 10, h: 0.4, fontFace: JP, fontSize: 15, color: "9FB8D4", margin: 0 });
  s.addShape("roundRect", { x: 0.92, y: 6.35, w: 2.6, h: 0.55, rectRadius: 0.08, fill: { color: ORANGE } });
  s.addText("2026年8月7日  Talenco", { x: 0.92, y: 6.35, w: 2.6, h: 0.55, fontFace: JP, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
}

// ============ 2. エグゼクティブサマリー ============
{
  const s = pres.addSlide();
  titleSlide(s, 2, "エグゼクティブサマリー", "目的である「20・30代の若手採用」に向け、応募の3分の2がターゲット年代という状態を実現しました");
  statCard(s, 0.6, 1.7, 2.95, 1.75, "8/12名", "20〜30代の応募", "全応募者12名中8名(67%)がターゲット年代。毎月継続的に発生", ORANGE);
  statCard(s, 3.75, 1.7, 2.95, 1.75, "13件", "応募獲得(3〜7月)", "支援前の応募ゼロ状態から、毎月応募が発生する状態へ", ORANGE);
  statCard(s, 6.9, 1.7, 2.95, 1.75, "7媒体+", "採用チャネル構築", "Indeed・求人BOX・ヤギオファー・ハローワーク・Meta・Google・SNS", ORANGE);
  statCard(s, 10.05, 1.7, 2.7, 1.75, "33倍", "月間露出の拡大", "Indeed表示回数 108回(12月)→3,585回(6月)", ORANGE);
  const items = [
    ["採用基盤の整備", "社員インタビューによる訴求素材の発掘、求人原稿・面接フロー・媒体アカウントをゼロから構築し、求人を公開。"],
    ["20・30代に届く独自ポジションの確立", "検証を重ね、ペルソナを「オタク気質・マニア層」へ転換。「AIに代替されない技術」との2軸が奏功し、20〜30代が応募の中心に。"],
    ["応募導線の多様化", "自社説明会→オンライン説明会、LP改善、LINE公式、SNSと、若手の応募ハードルを下げる導線を段階的に整備。"],
    ["残る課題", "応募から選考への移行が壁(書類通過・面接0名)。①経験者市場の不足 ②情報の透明性不足 ③求職者との接点不足 の3つの課題認識と対応策を後半でご提案します。"],
  ];
  let y = 3.85;
  items.forEach(([h, b], i) => {
    circleIcon(s, 0.65, y, String(i + 1), i === 3 ? STEEL : ORANGE);
    s.addText([
      { text: h + "  ", options: { bold: true, color: NAVY } },
      { text: b, options: { color: "374151" } },
    ], { x: 1.25, y: y - 0.08, w: 11.5, h: 0.75, fontFace: JP, fontSize: 12.5, margin: 0, valign: "top" });
    y += 0.83;
  });
}

// ============ 3. 支援概要 ============
{
  const s = pres.addSlide();
  titleSlide(s, 3, "支援の概要", "");
  const rows = [
    ["支援期間", "2025年12月 〜 2026年8月(9ヶ月)"],
    ["支援内容", "採用強化支援(募集職種:配管工・現場作業スタッフ/未経験・経験者)"],
    ["ターゲット", "20・30代の未経験/第二新卒(オタク気質層)を主軸に、経験者を併用"],
    ["体制", "Talenco 佐々木(担当コンサルタント)・山本/株式会社サーキュレーション経由のご契約"],
    ["ミーティング", "定例ミーティングを週次〜隔週で実施(オンライン中心・議事録を毎回共有)"],
    ["月間広告予算", "計¥60,000(Indeed ¥30,000/求人BOX ¥10,000/ヤギオファー ¥10,000/Meta ¥10,000)"],
    ["目標", "20・30代の配管工採用(週次進捗管理:目標1名・2026年2月〜52週)"],
  ];
  const tableRows = rows.map(([k, v]) => [
    { text: k, options: { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: JP, fontSize: 12.5, valign: "middle", margin: 0.08 } },
    { text: v, options: { color: "374151", fill: { color: LIGHT }, fontFace: JP, fontSize: 12.5, valign: "middle", margin: 0.08 } },
  ]);
  s.addTable(tableRows, { x: 0.6, y: 1.65, w: 8.6, colW: [1.9, 6.7], rowH: 0.62, border: { type: "solid", color: WHITE, pt: 2 } });
  // 右側: 会社の強み(訴求素材)
  s.addShape("roundRect", { x: 9.5, y: 1.65, w: 3.25, h: 4.6, rectRadius: 0.08, fill: { color: NAVY } });
  s.addText("社員インタビューで発掘した訴求素材", { x: 9.75, y: 1.9, w: 2.8, h: 0.6, fontFace: JP, fontSize: 13, bold: true, color: WHITE, margin: 0 });
  s.addText([
    { text: "基本17時退社・残業しづらい空気", options: { bullet: true, breakLine: true } },
    { text: "資格取得費用を会社が全額負担・受験日は出勤扱い", options: { bullet: true, breakLine: true } },
    { text: "怒鳴る親方文化なし・アットホームな現場", options: { bullet: true, breakLine: true } },
    { text: "創業70年以上・地域インフラを支える安定性", options: { bullet: true, breakLine: true } },
    { text: "配管はパズルのような技術の面白さ", options: { bullet: true } },
  ], { x: 9.75, y: 2.55, w: 2.8, h: 3.5, fontFace: JP, fontSize: 11, color: "CADCFC", margin: 0, paraSpaceAfter: 8, valign: "top" });
}

// ============ 4. 支援の歩み(6フェーズ) ============
{
  const s = pres.addSlide();
  titleSlide(s, 4, "支援の歩み ─ 6つのフェーズ", "市場の反応を検証しながら、打ち手を段階的に進化させました");
  const phases = [
    ["2025/12", "立ち上げ・素材収集", "社員インタビュー2件で魅力を言語化。求人原稿・面接フロー・媒体を整備し年内に求人公開"],
    ["2026/1-2", "無料掲載検証・説明会企画", "無料掲載では露出不足と判明。応募ハードルを下げる自社説明会を企画、LP改善方針を策定"],
    ["2026/3-4", "有料化・説明会運用", "Indeed有料化+ヤギオファー+ハローワーク強化。自社説明会(3/14・4/11)・ハロワ説明会(4/28)を実施"],
    ["2026/4-5", "ターゲット・訴求転換", "ペルソナを「オタク気質」層へ転換。「AIに代替されない技術」との2軸に絞り、求人を10件超へ細分化"],
    ["2026/6", "Web広告・LP最適化", "Meta広告(Instagram集中)・Googleリタゲ導入。LP超短縮・電話番号入力廃止。説明会をオンライン化"],
    ["2026/7", "SNS展開・次の一手", "キャッチコピーを尖鋭化しInstagram運用を開始。転職フェア・職人スカウト等の新チャネルを調査"],
  ];
  let y = 1.72;
  phases.forEach(([term, h, b], i) => {
    s.addShape("roundRect", { x: 0.6, y, w: 1.55, h: 0.78, rectRadius: 0.06, fill: { color: i === 3 ? ORANGE : NAVY } });
    s.addText(term, { x: 0.6, y, w: 1.55, h: 0.78, fontFace: "Arial", fontSize: 13, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: h + "   ", options: { bold: true, color: NAVY, fontSize: 13.5 } },
      { text: b, options: { color: "374151", fontSize: 11.5 } },
    ], { x: 2.4, y: y + 0.02, w: 10.35, h: 0.78, fontFace: JP, margin: 0, valign: "middle" });
    if (i < 5) s.addShape("rect", { x: 1.33, y: y + 0.78, w: 0.035, h: 0.16, fill: { color: STEEL } });
    y += 0.94;
  });
}

// ============ 5. 施策① 求人媒体運用 ============
{
  const s = pres.addSlide();
  titleSlide(s, 5, "施策① 求人媒体の運用改善", "無料掲載 → 有料化 → 職種細分化・予算グループ運用で露出を最大化");
  // 左: Indeed表示回数チャート
  s.addChart("bar", [
    {
      name: "Indeed表示回数",
      labels: ["12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月"],
      values: [108, 177, 220, 1048, 2378, 2052, 3585, 2632],
    },
  ], {
    x: 0.6, y: 1.8, w: 6.4, h: 3.6,
    barDir: "col",
    chartColors: [NAVY],
    showTitle: true, title: "Indeed 月間表示回数の推移(有料化:3月〜)", titleFontSize: 13, titleColor: NAVY, titleFontFace: JP,
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: GRAY, dataLabelFontSize: 9, dataLabelFontFace: JP,
    catAxisLabelColor: GRAY, catAxisLabelFontSize: 10, catAxisLabelFontFace: JP,
    valAxisLabelColor: GRAY, valAxisLabelFontSize: 9,
    valGridLine: { color: "E5E7EB", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false,
  });
  s.addText("※ 6月にIndeed全求人が非掲載となるトラブルが発生しましたが、原因(アルゴリズム変更)を特定し1週間で復旧。媒体分散でリスクを回避しました。", { x: 0.6, y: 5.55, w: 6.4, h: 0.7, fontFace: JP, fontSize: 10, color: GRAY, margin: 0 });
  // 右: 媒体別実績表
  s.addText("媒体別 累計実績(2026年3月〜8月上旬・有料課金分)", { x: 7.4, y: 1.8, w: 5.3, h: 0.35, fontFace: JP, fontSize: 13, bold: true, color: NAVY, margin: 0 });
  const mediaRows = [
    ["媒体", "表示回数", "クリック", "CTR", "応募", "費用"],
    ["Indeed", "12,064", "792", "6.6%", "3", "¥153,496"],
    ["求人BOX", "16,136", "755", "4.7%", "3", "¥50,945"],
    ["ヤギオファー", "スカウト型", "—", "—", "5", "月¥10,000"],
    ["engage", "PV 1,031", "—", "—", "0", "無料"],
    ["AirWork 他", "—", "—", "—", "2", "無料"],
  ];
  const tRows = mediaRows.map((r, ri) => r.map((c) => ({
    text: c,
    options: ri === 0
      ? { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: JP, fontSize: 10.5, align: "center", valign: "middle", margin: 0.04 }
      : { color: "374151", fill: { color: ri % 2 ? WHITE : LIGHT }, fontFace: JP, fontSize: 10.5, align: "center", valign: "middle", margin: 0.04 },
  })));
  s.addTable(tRows, { x: 7.4, y: 2.25, w: 5.3, colW: [1.35, 1.05, 0.85, 0.7, 0.55, 0.8], rowH: 0.42, border: { type: "solid", color: "D1D5DB", pt: 0.5 } });
  s.addShape("roundRect", { x: 7.4, y: 5.05, w: 5.3, h: 1.15, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText([
    { text: "ハローワークも総合強化: ", options: { bold: true, color: NAVY } },
    { text: "写真10枚掲載・PRシート提出・給与表記を月28万円〜に統一・年齢×受付日基準のリクエスト(スカウト)送信を継続実施。", options: { color: "374151" } },
  ], { x: 7.6, y: 5.2, w: 4.95, h: 0.9, fontFace: JP, fontSize: 11, margin: 0, valign: "top" });
}

// ============ 6. 施策② ターゲット・訴求の転換 ============
{
  const s = pres.addSlide();
  titleSlide(s, 6, "施策② ターゲット・訴求の転換", "検証データに基づき、富山の採用競争で独自のポジションを確立");
  // Before -> After
  s.addShape("roundRect", { x: 0.6, y: 1.75, w: 5.5, h: 1.5, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText("従来", { x: 0.85, y: 1.9, w: 2, h: 0.3, fontFace: JP, fontSize: 11, bold: true, color: GRAY, margin: 0 });
  s.addText("一般的な若手向け求人(ガテン系・「アットホーム」訴求)\n→ 若手に刺さらず、50代経験者層にのみ反応", { x: 0.85, y: 2.2, w: 5.0, h: 0.95, fontFace: JP, fontSize: 12, color: "374151", margin: 0 });
  s.addShape("roundRect", { x: 7.2, y: 1.75, w: 5.5, h: 1.5, rectRadius: 0.08, fill: { color: NAVY } });
  s.addText("転換後(2026年4月〜)", { x: 7.45, y: 1.9, w: 3, h: 0.3, fontFace: JP, fontSize: 11, bold: true, color: ORANGE, margin: 0 });
  s.addText([
    { text: "ペルソナ=「オタク気質・マニア」層 × 「AIに代替されない技術」", options: { color: "CADCFC", breakLine: true } },
    { text: "→ 結果: 応募者の67%(12名中8名)が20〜30代に", options: { color: WHITE, bold: true } },
  ], { x: 7.45, y: 2.2, w: 5.0, h: 0.95, fontFace: JP, fontSize: 12, margin: 0 });
  s.addShape("rightArrow", { x: 6.25, y: 2.28, w: 0.8, h: 0.45, fill: { color: ORANGE } });
  // 検証結果
  s.addText("訴求パターン検証の結果(Indeed CTR・2026年4月末)", { x: 0.6, y: 3.6, w: 8, h: 0.35, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const bars = [
    ["オタク気質訴求", 14.5, "◎ 最も相性が良い", ORANGE],
    ["経験者向け", 16.7, "△ 表示は伸びるが応募に繋がらず", STEEL],
    ["AI訴求", 7.8, "○ CPC¥12〜20と安価で効率的", NAVY],
    ["健康訴求", 8.5, "△ 単独では弱く要素として統合", STEEL],
  ];
  let y = 4.1;
  bars.forEach(([label, v, note, c]) => {
    s.addText(label, { x: 0.6, y, w: 1.9, h: 0.4, fontFace: JP, fontSize: 11.5, bold: true, color: NAVY, valign: "middle", margin: 0 });
    s.addShape("roundRect", { x: 2.6, y: y + 0.05, w: (v / 17) * 5.2, h: 0.3, rectRadius: 0.04, fill: { color: c } });
    s.addText(`CTR ${v}%`, { x: 2.65 + (v / 17) * 5.2, y, w: 1.2, h: 0.4, fontFace: JP, fontSize: 10.5, bold: true, color: c, valign: "middle", margin: 0 });
    s.addText(note, { x: 9.0, y, w: 3.8, h: 0.4, fontFace: JP, fontSize: 10.5, color: "374151", valign: "middle", margin: 0 });
    y += 0.52;
  });
  s.addShape("roundRect", { x: 0.6, y: 6.35, w: 12.15, h: 0.72, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText([
    { text: "キャッチコピーの進化: ", options: { bold: true, color: NAVY } },
    { text: "「その仕事、10年後もありますか?」→「マニアック上等!」「AIごときにはできません!」へ尖鋭化(7月)。求人も職種細分化で10件超に拡大し、CTRの良い求人へ予算を集中。", options: { color: "374151" } },
  ], { x: 0.8, y: 6.44, w: 11.8, h: 0.6, fontFace: JP, fontSize: 11, margin: 0, valign: "middle" });
}

// ============ 7. 施策③ 説明会 ============
{
  const s = pres.addSlide();
  titleSlide(s, 7, "施策③ 説明会による応募ハードルの引き下げ", "「いきなり応募」ではなく「まず話を聞く」導線を設計・改善");
  const steps = [
    ["対面説明会", "2/28企画 → 3/14・4/11開催", "私服OK・履歴書不要・現場見学・当日面接可。会社説明資料・アンケート・運営フローを整備", NAVY],
    ["ハローワーク説明会", "4/28 参加(2名来場)", "PRシート・写真10枚・お任せマッチング等、ハローワークの機能をフル活用。次回は8/28以降で予約", NAVY],
    ["オンライン説明会", "7月〜 毎週木曜夜", "顔出し不要・45分・Google Meet・予約制。在職中の若手が参加しやすい形式へ転換(7/16・23・30実施)", ORANGE],
  ];
  let x = 0.6;
  steps.forEach(([h, when, b, c], i) => {
    s.addShape("roundRect", { x, y: 1.85, w: 3.85, h: 3.1, rectRadius: 0.1, fill: { color: i === 2 ? NAVY : LIGHT } });
    circleIcon(s, x + 0.25, 2.1, String(i + 1), i === 2 ? ORANGE : NAVY);
    s.addText(h, { x: x + 0.8, y: 2.08, w: 3.0, h: 0.45, fontFace: JP, fontSize: 15, bold: true, color: i === 2 ? WHITE : NAVY, margin: 0 });
    s.addText(when, { x: x + 0.28, y: 2.72, w: 3.3, h: 0.35, fontFace: JP, fontSize: 11.5, bold: true, color: i === 2 ? ORANGE : STEEL, margin: 0 });
    s.addText(b, { x: x + 0.28, y: 3.12, w: 3.3, h: 1.7, fontFace: JP, fontSize: 11, color: i === 2 ? "CADCFC" : "374151", margin: 0, valign: "top" });
    if (i < 2) s.addShape("rightArrow", { x: x + 3.9, y: 3.15, w: 0.5, h: 0.4, fill: { color: STEEL } });
    x += 4.35;
  });
  s.addShape("roundRect", { x: 0.6, y: 5.3, w: 12.15, h: 1.35, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText([
    { text: "背景と学び: ", options: { bold: true, color: NAVY, breakLine: true } },
    { text: "対面開催は集客に苦戦(申込0〜1名)。土曜午前→午後→オンラインと開催形式を検証し、「木曜夜・顔出しなし・匿名参加可」というターゲット(在職中・人見知り傾向の若手)に合わせた現在の形に到達。説明会は応募前の不安を解消する中核導線として、LP・LINE公式・求人原稿すべてに組み込み済み。", options: { color: "374151" } },
  ], { x: 0.85, y: 5.45, w: 11.65, h: 1.1, fontFace: JP, fontSize: 11.5, margin: 0, valign: "top" });
}

// ============ 8. 施策④ Web広告・LP改善 ============
{
  const s = pres.addSlide();
  titleSlide(s, 8, "施策④ Web広告とLPの継続改善", "データ分析(ヒートマップ・行動解析)に基づく高速な改善サイクル");
  // 左カラム: 広告
  s.addText("Web広告の運用", { x: 0.6, y: 1.7, w: 6, h: 0.4, fontFace: JP, fontSize: 15, bold: true, color: NAVY, margin: 0 });
  const ads = [
    ["Meta広告", "検証の結果Instagramに集中(CTR 2.26%・クリック単価¥30)。AI画像・漫画形式などクリエイティブをABテスト。フォーム直接誘導も検証し、効率の良いLP誘導へ回帰"],
    ["Google広告", "LPに1分以上滞在した未応募層へのリターゲティング配信(6月〜)。エリア・年齢・スマホ限定で無駄打ちを排除"],
    ["X(旧Twitter)", "社長アカウントの発信と連動。求人投稿が250万ビューを2回記録、「配管 富山 求人」で検索1位"],
  ];
  let y = 2.2;
  ads.forEach(([h, b]) => {
    s.addShape("roundRect", { x: 0.6, y, w: 6.1, h: 1.28, rectRadius: 0.08, fill: { color: LIGHT } });
    s.addText(h, { x: 0.85, y: y + 0.12, w: 5.6, h: 0.32, fontFace: JP, fontSize: 12.5, bold: true, color: ORANGE, margin: 0 });
    s.addText(b, { x: 0.85, y: y + 0.44, w: 5.6, h: 0.8, fontFace: JP, fontSize: 10.5, color: "374151", margin: 0, valign: "top" });
    y += 1.42;
  });
  // 右カラム: LP改善
  s.addText("LP(採用ランディングページ)の改善", { x: 7.1, y: 1.7, w: 6, h: 0.4, fontFace: JP, fontSize: 15, bold: true, color: NAVY, margin: 0 });
  const lps = [
    "ヒートマップ・録画分析で「説明会日程・給与しか見られていない」実態を特定 → 重要情報のみの超短縮版へ全面刷新",
    "応募フォームの電話番号入力を廃止しメールのみに(心理的ハードルを低減)",
    "重いアニメーションを削減し読み込み速度を改善・スマホ特化",
    "LINE公式アカウント導線・中間CTA・予約フォーム簡素化などを継続的に実施",
  ];
  s.addText(lps.map((t, i) => ({ text: t, options: { bullet: { code: "2022", color: ORANGE }, breakLine: i < lps.length - 1 } })), { x: 7.1, y: 2.2, w: 5.7, h: 2.6, fontFace: JP, fontSize: 11.5, color: "374151", margin: 0, paraSpaceAfter: 10, valign: "top" });
  statCard(s, 7.1, 5.0, 2.75, 1.5, "24→38%", "LP平均スクロール深度", "6月→7月。「読まれるLP」へ改善", ORANGE);
  statCard(s, 10.0, 5.0, 2.75, 1.5, "1,547", "LP累計PV(応募6件)", "12月14PV→6月380PVへ拡大", NAVY);
}

// ============ 9. 施策⑤ SNS・新チャネル ============
{
  const s = pres.addSlide();
  titleSlide(s, 9, "施策⑤ SNS・動画・新チャネルの開拓", "リスクとコストを見極めながら、持続可能な発信体制へ");
  const cards = [
    ["動画戦略の検証", "ライブ配信 → 録画切り抜き → 静止画+文字へと検証。権利・安全管理上のリスクと制作負荷を踏まえ、社長が自走できる「静止画+文字のInstagram定期投稿」に着地(7月)", NAVY],
    ["Instagram運用", "会社紹介・Q&A系の定番投稿を量産。お盆前完了予定のHPリニューアルと連携し「求人媒体 → Instagram → HP」の導線を構築", ORANGE],
    ["LINE公式アカウント", "若手に多いLINE経由応募に対応(6月開設)。求人・LP・広告に友だち追加導線を設置", NAVY],
    ["新チャネル調査", "マイナビ転職フェア富山(来場151名・20〜30代中心/出展20〜35万円)、建設職人特化「職人スカウト」(登録3,300名)を調査。10月・1月開催に向け交渉準備", NAVY],
  ];
  let x = 0.6, y = 1.8;
  cards.forEach(([h, b, c], i) => {
    const cx = i % 2 === 0 ? 0.6 : 6.95;
    const cy = i < 2 ? 1.8 : 4.15;
    s.addShape("roundRect", { x: cx, y: cy, w: 5.8, h: 2.1, rectRadius: 0.1, fill: { color: i === 1 ? NAVY : LIGHT } });
    s.addText(h, { x: cx + 0.25, y: cy + 0.18, w: 5.3, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: i === 1 ? ORANGE : NAVY, margin: 0 });
    s.addText(b, { x: cx + 0.25, y: cy + 0.62, w: 5.3, h: 1.35, fontFace: JP, fontSize: 11, color: i === 1 ? "CADCFC" : "374151", margin: 0, valign: "top" });
  });
  s.addText("※ 6〜7月は夏季賞与支給に伴う転職鈍化期。8月からの市場再活性化(ピーク9〜10月)を見据えた仕込みを完了しています。", { x: 0.6, y: 6.5, w: 12, h: 0.4, fontFace: JP, fontSize: 11, color: GRAY, margin: 0 });
}

// ============ 10. 成果サマリー(数値) ============
{
  const s = pres.addSlide();
  titleSlide(s, 10, "成果サマリー ─ 応募実績", "応募ゼロの状態から、20〜30代を中心に毎月応募が発生する状態へ");
  // 左: 応募媒体別チャート(年代内訳付きの積み上げ)
  s.addChart("bar", [
    {
      name: "20〜30代",
      labels: ["ヤギオファー", "Indeed", "求人BOX", "AirWork"],
      values: [4, 2, 1, 1],
    },
    {
      name: "40代以上",
      labels: ["ヤギオファー", "Indeed", "求人BOX", "AirWork"],
      values: [1, 1, 2, 0],
    },
  ], {
    x: 0.6, y: 1.85, w: 5.6, h: 3.5,
    barDir: "bar", barGrouping: "stacked",
    chartColors: [ORANGE, STEEL],
    showTitle: true, title: "媒体別 応募者数と年代内訳(実人数12名)", titleFontSize: 13, titleColor: NAVY, titleFontFace: JP,
    showValue: true, dataLabelPosition: "ctr", dataLabelColor: WHITE, dataLabelFontSize: 10, dataLabelFontFace: JP,
    catAxisLabelColor: "374151", catAxisLabelFontSize: 11, catAxisLabelFontFace: JP,
    valAxisLabelColor: GRAY, valAxisLabelFontSize: 9, valAxisMajorUnit: 1,
    valGridLine: { color: "E5E7EB", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontSize: 10, legendFontFace: JP, legendColor: "374151",
  });
  s.addShape("roundRect", { x: 0.6, y: 5.55, w: 5.6, h: 1.25, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText([
    { text: "20〜30代の最大の獲得源はスカウト型(ヤギオファー: 4名)。", options: { bold: true, color: NAVY } },
    { text: "100通で2〜3名の反響と、業界平均(500通で1〜2名)を大きく上回る文面の刺さりを実証しました。", options: { color: "374151" } },
  ], { x: 0.85, y: 5.68, w: 5.1, h: 1.0, fontFace: JP, fontSize: 11, margin: 0, valign: "top" });
  // 右: 年齢帯別の応募実績(目的=20・30代)
  s.addText("年齢帯別の応募実績 ─ ターゲット層(20・30代)に到達", { x: 6.9, y: 1.85, w: 6, h: 0.4, fontFace: JP, fontSize: 15, bold: true, color: NAVY, margin: 0 });
  const ages = [
    ["20代", "5名", 5.85, ORANGE, "(21・23・24・29・29歳)"],
    ["30代", "3名", 4.35, ORANGE, "(31・35・36歳)"],
    ["40代以上", "4名", 4.85, STEEL, "(48〜77歳・ターゲット外)"],
  ];
  let fy = 2.35;
  ages.forEach(([label, v, w, c, note]) => {
    s.addShape("roundRect", { x: 6.9, y: fy, w, h: 0.62, rectRadius: 0.06, fill: { color: c } });
    s.addText([
      { text: label + "  ", options: { bold: true, fontSize: 12.5 } },
      { text: v + "  ", options: { fontSize: 12.5, bold: true } },
      { text: note, options: { fontSize: 9.5 } },
    ], { x: 7.1, y: fy, w: w - 0.3, h: 0.62, fontFace: JP, color: WHITE, valign: "middle", margin: 0 });
    fy += 0.74;
  });
  s.addText("※応募13件のうち1名は2媒体からの重複応募のため、実人数12名で集計", { x: 6.9, y: fy - 0.04, w: 5.9, h: 0.26, fontFace: JP, fontSize: 9, color: GRAY, margin: 0 });
  // 月別の20〜30代応募推移
  s.addText("20〜30代応募の月別推移", { x: 6.9, y: fy + 0.32, w: 5.85, h: 0.3, fontFace: JP, fontSize: 12, bold: true, color: NAVY, margin: 0 });
  const monthly = [["3月", 2], ["4月", 0], ["5月", 2], ["6月", 2], ["7月", 2]];
  monthly.forEach(([m, n], i) => {
    const mx = 6.9 + i * 1.2;
    s.addShape("roundRect", { x: mx, y: fy + 0.66, w: 1.05, h: 0.52, rectRadius: 0.05, fill: { color: n > 0 ? ORANGE : "E5E7EB" } });
    s.addText([
      { text: m + "  ", options: { fontSize: 9.5, color: n > 0 ? WHITE : GRAY } },
      { text: `${n}名`, options: { fontSize: 11, bold: true, color: n > 0 ? WHITE : GRAY } },
    ], { x: mx, y: fy + 0.66, w: 1.05, h: 0.52, fontFace: JP, align: "center", valign: "middle", margin: 0 });
  });
  s.addShape("roundRect", { x: 6.9, y: 5.95, w: 5.85, h: 1.05, rectRadius: 0.08, fill: { color: "FDF0E6" } });
  s.addText([
    { text: "応募者の67%(12名中8名)が20〜30代。", options: { bold: true, color: "B45309" } },
    { text: "毎月2名ペースでターゲット年代の応募が継続しており、「若手に届く求人」への転換が数字で確認できます。", options: { color: "374151" } },
  ], { x: 7.15, y: 6.08, w: 5.35, h: 0.85, fontFace: JP, fontSize: 11, margin: 0, valign: "top" });
}

// ============ 11. 選考移行率の現在地 ============
{
  const s = pres.addSlide();
  titleSlide(s, 11, "選考移行率の現在地と課題", "応募は生まれましたが、選考への移行が壁 ─ ここが次の主戦場です");
  // 左: 選考ファネル(移行率付き)
  s.addText("選考ファネル(2026年3〜7月・実人数ベース)", { x: 0.6, y: 1.75, w: 6, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const funnel = [
    ["応募", "12名(うち20〜30代8名)", 5.9, NAVY, ""],
    ["説明会・選考ヒアリングへ移行", "3名", 4.5, ORANGE, "移行率 25%"],
    ["書類選考通過(有効応募)", "0名", 3.1, STEEL, "移行率 0%"],
    ["1次面接・入社", "0名", 2.4, STEEL, ""],
  ];
  let fy = 2.3;
  funnel.forEach(([label, v, w, c, rate]) => {
    s.addShape("roundRect", { x: 0.6, y: fy, w, h: 0.66, rectRadius: 0.06, fill: { color: c } });
    s.addText([
      { text: label + "  ", options: { bold: true, fontSize: 11.5 } },
      { text: v, options: { fontSize: 11.5 } },
    ], { x: 0.8, y: fy, w: w - 0.3, h: 0.66, fontFace: JP, color: WHITE, valign: "middle", margin: 0 });
    if (rate) s.addText(rate, { x: 0.6 + w + 0.15, y: fy, w: 1.6, h: 0.66, fontFace: JP, fontSize: 10.5, bold: true, color: c, valign: "middle", margin: 0 });
    fy += 0.78;
  });
  s.addText("対応中: 説明会誘導中1名(36歳)・選考/説明会ヒアリング中2名(23歳・53歳) ※8月継続対応", { x: 0.6, y: fy + 0.02, w: 6.2, h: 0.5, fontFace: JP, fontSize: 10, color: GRAY, margin: 0 });
  s.addShape("roundRect", { x: 0.6, y: 6.05, w: 6.1, h: 1.0, rectRadius: 0.08, fill: { color: "FDF0E6" } });
  s.addText([
    { text: "20〜30代8名のうち選考対応が継続できているのは1名(23歳)。", options: { bold: true, color: "B45309" } },
    { text: "応募獲得の次は「つながり続ける仕組み」が成果の鍵です。", options: { color: "374151" } },
  ], { x: 0.85, y: 6.18, w: 5.6, h: 0.8, fontFace: JP, fontSize: 11, margin: 0, valign: "top" });
  // 右: 移行を阻んだ要因と実施済みの対応
  s.addText("移行を阻んだ3つの要因", { x: 7.15, y: 1.75, w: 5.6, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const factors = [
    ["20代前半の連絡途絶", "メールを見ない・返信が途切れる傾向(21歳は書類依頼後に連絡なし)。若手ほど発生しやすい"],
    ["ターゲット外応募の混在", "77歳×2・53歳・48歳など、応募12名のうち4名(33%)がターゲット外。お断り対応が負担に"],
    ["スカウト承認後の音信不通", "説明会誘導後にSMS既読が付かないケース(36歳)。接点の維持が課題"],
  ];
  let ry = 2.2;
  factors.forEach(([h, b], i) => {
    circleIcon(s, 7.15, ry + 0.02, String(i + 1), STEEL);
    s.addText([
      { text: h + "  ", options: { bold: true, color: NAVY } },
      { text: b, options: { color: "374151" } },
    ], { x: 7.72, y: ry - 0.05, w: 5.0, h: 0.85, fontFace: JP, fontSize: 11, margin: 0, valign: "top" });
    ry += 0.92;
  });
  s.addShape("roundRect", { x: 7.15, y: 5.05, w: 5.6, h: 2.0, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText("実施済みの対応", { x: 7.4, y: 5.2, w: 5.1, h: 0.35, fontFace: JP, fontSize: 12.5, bold: true, color: ORANGE, margin: 0 });
  s.addText([
    { text: "連絡順序を「固定電話→SMS」に変更(若手はメールを見ないため)", options: { bullet: { code: "2022", color: ORANGE }, breakLine: true } },
    { text: "応募者をSMS・電話でオンライン説明会(顔出しなし)へ誘導", options: { bullet: { code: "2022", color: ORANGE }, breakLine: true } },
    { text: "LINE公式アカウントで若手が返信しやすい接点を追加", options: { bullet: { code: "2022", color: ORANGE } } },
  ], { x: 7.4, y: 5.6, w: 5.15, h: 1.35, fontFace: JP, fontSize: 10.5, color: "374151", margin: 0, paraSpaceAfter: 7, valign: "top" });
}

// ============ 12. 課題認識 ============
{
  const s = pres.addSlide();
  titleSlide(s, 12, "課題認識 ─ 3つの構造的課題", "9ヶ月の検証から見えた、次のステージで乗り越えるべき壁");
  const issues = [
    ["経験者・関連業種の\n人材不足", "配管工の経験者がそもそも市場に少ない構造的制約。経験者向け求人は表示は伸びるものの応募に繋がらず、スカウトの対象母数も枯渇(22〜39歳・通勤30分圏で残0名)。", "周辺の電気工事業種では応募・採用実績が出ており、職種による市場規模の差が大きい。→ 未経験×20・30代への注力が合理的"],
    ["未経験・20/30代に対する\n情報の透明性不足", "求人を入口に興味を持った求職者が、裏付けを取りに複数媒体を見に行っても松下工業の情報がない(口コミなし・採用サイトなし)。Xは尖った発信のため、未経験者が求める情報が不在。", "「働き方」「業務内容」「どんな人が働いているか」の情報がなく、応募の一歩手前で離脱。→ 採用HPリニューアル+Instagram発信の拡充"],
    ["求職者との\n直接接点の不足", "情報の不透明性を補うには、求職者と直接交流して不安を解消することが不可欠。自社集客の説明会は集客に苦戦(申込0〜1名)しており、自前の集客力だけでは接点をつくれない。", "他社が集客するイベントの活用が必要。→ ハローワーク説明会・マイナビ等の合同説明会への参加"],
  ];
  let x = 0.6;
  issues.forEach(([h, b, a], i) => {
    s.addShape("roundRect", { x, y: 1.8, w: 3.9, h: 5.2, rectRadius: 0.1, fill: { color: LIGHT } });
    circleIcon(s, x + 0.28, 2.05, String(i + 1), NAVY);
    s.addText(h, { x: x + 0.85, y: 1.95, w: 2.9, h: 0.75, fontFace: JP, fontSize: 13.5, bold: true, color: NAVY, margin: 0, valign: "top" });
    s.addText(b, { x: x + 0.3, y: 2.85, w: 3.3, h: 2.1, fontFace: JP, fontSize: 10.5, color: "374151", margin: 0, valign: "top" });
    s.addShape("roundRect", { x: x + 0.3, y: 5.05, w: 3.3, h: 1.7, rectRadius: 0.06, fill: { color: NAVY } });
    s.addText(a, { x: x + 0.5, y: 5.05, w: 2.9, h: 1.7, fontFace: JP, fontSize: 10, color: "CADCFC", margin: 0, valign: "middle" });
    x += 4.19;
  });
}

// ============ 13. 今後の提言 ============
{
  const s = pres.addSlide();
  titleSlide(s, 13, "今後のご提言 ─ 3つの課題に対応する打ち手", "8月以降の転職市場再活性化(ピーク:9〜10月)を最大限に活かすために");
  const recs = [
    ["1", "採用HPリニューアル+Instagramで「情報の透明性」を確保", "「働き方・業務内容・どんな人が働いているか」を軸に発信を強化。リニューアルHP(お盆前完了予定)とInstagramを紐付け、求人から裏付けを取りに来た求職者が必ず情報に辿り着ける状態をつくる", "課題②"],
    ["2", "他社集客型イベントで求職者と直接交流", "ハローワーク説明会(8/28以降予約可)と、マイナビ転職フェア富山(10月・1月、20〜30代来場中心)等の合同説明会に参加。自社集客に依存せず、対面交流で情報不足への不安を解消する", "課題③"],
    ["3", "未経験×20・30代への注力を継続", "経験者市場は構造的に小さいことが検証で判明済み。「オタク気質×AI」訴求と未経験育成(資格全額支援・3年で一人前)を前面に、未経験採用に投資を集中する", "課題①"],
    ["4", "20〜30代の選考移行率の改善", "初回接触を固定電話→SMS→LINEの順で徹底し若手の連絡途絶を防止。オンライン説明会への誘導を全応募者の標準フローにし、「応募→説明会参加」の移行率をKPIとして毎週計測", "補強"],
    ["5", "基盤整備(中長期)", "LP・広告の効果測定(コンバージョン計測・GA4)の整備と、若年層応募の最大障壁である年間休日数(土曜出勤)の段階的見直しの検討", "補強"],
  ];
  let y = 1.72;
  recs.forEach(([n, h, b, tag]) => {
    circleIcon(s, 0.65, y + 0.04, n, tag === "補強" ? STEEL : ORANGE);
    s.addShape("roundRect", { x: 11.55, y: y + 0.02, w: 1.15, h: 0.42, rectRadius: 0.06, fill: { color: tag === "補強" ? "E5E7EB" : "FDF0E6" } });
    s.addText(tag + "対応", { x: 11.55, y: y + 0.02, w: 1.15, h: 0.42, fontFace: JP, fontSize: 9.5, bold: true, color: tag === "補強" ? GRAY : "B45309", align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: h + "\n", options: { bold: true, color: NAVY, fontSize: 13 } },
      { text: b, options: { color: "374151", fontSize: 11 } },
    ], { x: 1.3, y: y - 0.04, w: 10.1, h: 1.0, fontFace: JP, margin: 0, valign: "top" });
    y += 1.02;
  });
}

// ============ 14. 会議・活動履歴 ============
{
  const s = pres.addSlide();
  titleSlide(s, 14, "活動履歴 ─ 定例ミーティング・説明会", "毎回議事録を共有し、決定事項を翌週までに実行するサイクルを継続");
  const left = [
    ["11/20", "初回面談"],
    ["12/5", "キックオフ(富山ご訪問)"],
    ["12/10・12", "社員インタビュー(2件)"],
    ["12/19", "定例:採用マニュアル・面接改善"],
    ["1/7", "定例:自社説明会の企画"],
    ["1/22", "定例:数値レビュー・集客設計"],
    ["2/19", "定例:HP制作会社同席・LP戦略"],
    ["2/28", "自社説明会(第1回・企画)"],
    ["3/2", "定例:Indeed有料化の決定"],
    ["3/13・14", "直前MTG・自社説明会"],
    ["4/1", "定例:キャッチコピー2軸戦略"],
    ["4/9・11", "直前MTG・自社説明会"],
  ];
  const right = [
    ["4/21", "定例:ペルソナ「オタク気質」へ転換"],
    ["4/28", "ハローワーク説明会(2名参加)"],
    ["5/7", "定例:検証結果・チラシ/Meta広告"],
    ["5/22", "定例"],
    ["6/4", "定例:Meta広告検証(サーキュレーション同席)"],
    ["6/18", "定例:LP改善・リタゲ導入"],
    ["6/20・27", "自社説明会(2部制)"],
    ["6/24・30", "定例:オンライン説明会設計・Indeed復旧"],
    ["7/9・15", "定例:動画戦略・候補者対応"],
    ["7/16・23・30", "オンライン説明会(毎週木曜)"],
    ["7/23・30", "定例:コピー刷新・SNS転換・新チャネル"],
    ["8/7", "定例(本レポートのご報告)"],
  ];
  function histCol(items, x) {
    const rows = items.map(([d, t], i) => [
      { text: d, options: { bold: true, color: NAVY, fill: { color: i % 2 ? WHITE : LIGHT }, fontFace: JP, fontSize: 10.5, valign: "middle", margin: 0.045 } },
      { text: t, options: { color: "374151", fill: { color: i % 2 ? WHITE : LIGHT }, fontFace: JP, fontSize: 10.5, valign: "middle", margin: 0.045 } },
    ]);
    s.addTable(rows, { x, y: 1.75, w: 6.05, colW: [1.15, 4.9], rowH: 0.385, border: { type: "solid", color: "E5E7EB", pt: 0.5 } });
  }
  histCol(left, 0.6);
  histCol(right, 6.85);
  s.addText("2025年11月〜2026年8月:定例・インタビュー・説明会など合計30回以上の接点。すべての回で議事録(Gemini自動メモ)を共有済み。", { x: 0.6, y: 6.75, w: 12.2, h: 0.4, fontFace: JP, fontSize: 11, color: GRAY, margin: 0 });
}

// ============ 15. 結び ============
{
  const s = pres.addSlide();
  s.background = { color: NAVY_D };
  s.addShape("ellipse", { x: -1.8, y: -1.8, w: 4.6, h: 4.6, fill: { color: NAVY } });
  s.addText("引き続き、松下工業様の\n採用成功に伴走いたします", { x: 1.0, y: 2.3, w: 11.3, h: 1.7, fontFace: JP, fontSize: 34, bold: true, color: WHITE, margin: 0 });
  s.addText("9ヶ月間、密なご協力をいただき誠にありがとうございました。\n築き上げた採用基盤と検証結果を、これからの成果につなげてまいります。", { x: 1.02, y: 4.15, w: 11, h: 0.9, fontFace: JP, fontSize: 14, color: "CADCFC", margin: 0 });
  s.addText("Talenco  担当:佐々木 純平", { x: 1.02, y: 6.4, w: 8, h: 0.4, fontFace: JP, fontSize: 12, color: "9FB8D4", margin: 0 });
}

pres.writeFile({ fileName: "/tmp/claude-0/-home-user-agency-agents/94506d98-56eb-5569-8882-37ab487819a3/scratchpad/松下工業様_採用強化支援_総括レポート.pptx" })
  .then(() => console.log("done"))
  .catch((e) => { console.error(e); process.exit(1); });
