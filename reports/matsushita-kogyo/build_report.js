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

// ============ 13. 課題①詳細 ============
{
  const s = pres.addSlide();
  titleSlide(s, 13, "課題① 経験者・関連業種の人材不足", "配管工の経験者採用は「母数」の壁 ─ 待つ採用では出会えない市場");
  // 左: 検証データ
  s.addText("9ヶ月の検証で確認された事実", { x: 0.6, y: 1.75, w: 6, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const facts1 = [
    ["経験者向け求人は応募ゼロ", "表示は伸びる(321件/週)ものの応募開始0件。CTR16.7%と関心はあるが、転職顕在層が現れない(4月検証)"],
    ["スカウト対象母数の枯渇", "ヤギオファーで22〜39歳・通勤30分圏の対象者が残0名に(6月)。新規登録も1日1〜4名と細い"],
    ["富山の採用難易度は最高水準", "「配管工」の求人難易度スコアは99(100が最難)。検索する求職者自体が少ない(206名/月)"],
  ];
  let y1 = 2.2;
  facts1.forEach(([h, b], i) => {
    s.addShape("roundRect", { x: 0.6, y: y1, w: 6.1, h: 1.35, rectRadius: 0.08, fill: { color: LIGHT } });
    s.addText(h, { x: 0.85, y: y1 + 0.13, w: 5.6, h: 0.34, fontFace: JP, fontSize: 12.5, bold: true, color: NAVY, margin: 0 });
    s.addText(b, { x: 0.85, y: y1 + 0.48, w: 5.6, h: 0.8, fontFace: JP, fontSize: 10.5, color: "374151", margin: 0, valign: "top" });
    y1 += 1.5;
  });
  // 右: 電気工事との対比と含意
  s.addText("周辺業種との比較が示すもの", { x: 7.1, y: 1.75, w: 5.7, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  s.addShape("roundRect", { x: 7.1, y: 2.2, w: 5.65, h: 2.0, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText([
    { text: "電気工事(周辺企業)では応募・採用実績あり\n", options: { bold: true, color: NAVY, fontSize: 12.5 } },
    { text: "同じ建設系でも、電気工事の支援先では相応の応募数・採用数が出ています。配管工との差は施策の巧拙ではなく、職種ごとの求職者人口の差 ─ つまり市場の構造要因です。", options: { color: "374151", fontSize: 10.5 } },
  ], { x: 7.35, y: 2.35, w: 5.15, h: 1.7, fontFace: JP, margin: 0, valign: "top" });
  s.addShape("roundRect", { x: 7.1, y: 4.4, w: 5.65, h: 2.25, rectRadius: 0.08, fill: { color: NAVY } });
  s.addText([
    { text: "含意: 未経験×20・30代への注力が合理的\n", options: { bold: true, color: ORANGE, fontSize: 12.5 } },
    { text: "経験者の「応募待ち」に予算を割くよりも、市場に存在する未経験の若手を採用し、社内で育てる(資格全額支援・約3年で一人前)方が、確率も再現性も高い戦い方です。実際に応募の67%が20〜30代と、この路線の入口は既に開通しています。", options: { color: "CADCFC", fontSize: 10.5 } },
  ], { x: 7.35, y: 4.58, w: 5.15, h: 1.9, fontFace: JP, margin: 0, valign: "top" });
}

// ============ 14. 課題②詳細 ============
{
  const s = pres.addSlide();
  titleSlide(s, 14, "課題② 情報の透明性不足(未経験・20/30代)", "求人で興味を持った求職者が「裏付け」を取れず、応募の一歩手前で離脱");
  // 上: 求職者の行動フローと情報の有無
  s.addText("未経験の求職者が応募前にたどる行動と、松下工業様の現状", { x: 0.6, y: 1.7, w: 11, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const flow = [
    ["求人を見る", "求人原稿10件超\nキャッチ画像も整備", true],
    ["会社名で検索", "採用サイトなし\nHPは工事情報中心", false],
    ["口コミを探す", "口コミ情報なし\n判断材料ゼロ", false],
    ["SNSを見る", "Xは尖った発信のみ\nInstagramは開始直後", false],
    ["応募 or 離脱", "説明会予約CV 0件\n(裏付け不足で離脱)", false],
  ];
  let fx = 0.6;
  flow.forEach(([h, b, ok], i) => {
    s.addShape("roundRect", { x: fx, y: 2.2, w: 2.25, h: 1.75, rectRadius: 0.08, fill: { color: ok ? NAVY : LIGHT } });
    s.addText(h, { x: fx + 0.15, y: 2.32, w: 1.95, h: 0.4, fontFace: JP, fontSize: 11.5, bold: true, color: ok ? WHITE : NAVY, margin: 0 });
    s.addText(b, { x: fx + 0.15, y: 2.78, w: 1.95, h: 1.05, fontFace: JP, fontSize: 9.5, color: ok ? "CADCFC" : "6B7280", margin: 0, valign: "top" });
    s.addText(ok ? "○ 整備済み" : "× 情報なし", { x: fx + 0.15, y: 3.62, w: 1.95, h: 0.28, fontFace: JP, fontSize: 9.5, bold: true, color: ok ? ORANGE : "B45309", margin: 0 });
    if (i < 4) s.addShape("rightArrow", { x: fx + 2.27, y: 2.9, w: 0.28, h: 0.32, fill: { color: STEEL } });
    fx += 2.53;
  });
  // 下: 不足している情報と打ち手
  s.addShape("roundRect", { x: 0.6, y: 4.35, w: 6.1, h: 2.5, rectRadius: 0.08, fill: { color: LIGHT } });
  s.addText("特に不足している3つの情報", { x: 0.85, y: 4.5, w: 5.6, h: 0.35, fontFace: JP, fontSize: 12.5, bold: true, color: NAVY, margin: 0 });
  s.addText([
    { text: "働き方 ─ 17時退社・休日・残業の実態など、生活がイメージできる情報", options: { bullet: { code: "2022", color: ORANGE }, breakLine: true } },
    { text: "業務内容 ─ 1日の流れ・現場の様子・未経験からの成長ステップ", options: { bullet: { code: "2022", color: ORANGE }, breakLine: true } },
    { text: "働く人 ─ どんな先輩がいるか・年齢構成・職場の雰囲気", options: { bullet: { code: "2022", color: ORANGE } } },
  ], { x: 0.85, y: 4.95, w: 5.6, h: 1.75, fontFace: JP, fontSize: 11, color: "374151", margin: 0, paraSpaceAfter: 9, valign: "top" });
  s.addShape("roundRect", { x: 7.1, y: 4.35, w: 5.65, h: 2.5, rectRadius: 0.08, fill: { color: NAVY } });
  s.addText("打ち手: 採用HPリニューアル+Instagram", { x: 7.35, y: 4.5, w: 5.15, h: 0.35, fontFace: JP, fontSize: 12.5, bold: true, color: ORANGE, margin: 0 });
  s.addText([
    { text: "採用HPリニューアル(お盆前完了予定)に「働き方・業務内容・働く人」のコンテンツを集約", options: { bullet: { code: "2022", color: ORANGE }, breakLine: true } },
    { text: "Instagramで「共感・安心・安定」を軸に定期投稿し、検索時の受け皿に(次頁のコンテンツプラン参照)", options: { bullet: { code: "2022", color: ORANGE }, breakLine: true } },
    { text: "求人媒体→Instagram→HPの導線で、どこから調べても情報に辿り着ける状態へ", options: { bullet: { code: "2022", color: ORANGE } } },
  ], { x: 7.35, y: 4.95, w: 5.15, h: 1.75, fontFace: JP, fontSize: 10.5, color: "CADCFC", margin: 0, paraSpaceAfter: 8, valign: "top" });
}

// ============ 15. 発信プラン(1) なぜ共感・安心・安定か ============
{
  const s = pres.addSlide();
  titleSlide(s, 15, "なぜ「共感・安心・安定」なのか", "未経験の20・30代が応募を決めるまでの心理に、発信を対応させます");
  // 上: 心理ステップ
  const steps = [
    ["共感", "興味を持つ", "「自分に合いそうな会社かも」\n自分と重なる人・価値観を見つける", ORANGE],
    ["安心", "不安を消す", "「未経験でもやっていけそう」\n働き方・育て方の実像を確認する", NAVY],
    ["安定", "決め手を得る", "「ここなら長く働ける」\n会社の足腰と将来性を確信する", STEEL],
  ];
  let sx = 0.6;
  steps.forEach(([h, sub, b, c], i) => {
    s.addShape("roundRect", { x: sx, y: 1.8, w: 3.7, h: 1.75, rectRadius: 0.1, fill: { color: c } });
    s.addText([
      { text: h + " ─ " + sub, options: { bold: true, fontSize: 14.5, breakLine: true } },
      { text: b, options: { fontSize: 10.5 } },
    ], { x: sx + 0.25, y: 1.95, w: 3.2, h: 1.5, fontFace: JP, color: WHITE, margin: 0, valign: "top" });
    if (i < 2) s.addShape("rightArrow", { x: sx + 3.73, y: 2.45, w: 0.42, h: 0.42, fill: { color: "9CA3AF" } });
    sx += 4.19;
  });
  s.addText("応募・説明会参加という行動は、この3つの感情が揃って初めて起こります", { x: 0.6, y: 3.65, w: 12, h: 0.35, fontFace: JP, fontSize: 12, bold: true, color: NAVY, margin: 0 });
  // 下: 9ヶ月の検証が示す根拠
  s.addText("9ヶ月の検証データが示す根拠", { x: 0.6, y: 4.15, w: 8, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const proofs = [
    ["求職者は「判断材料」を探している", "LPのヒートマップ分析では、閲覧者は理念をスキップし説明会日程・給与だけを凝視。判断材料が足りず離脱している(=安心情報の不在)"],
    ["認知だけでは応募に至らない", "X投稿は250万ビューを2回記録し「配管 富山 求人」検索1位。それでも応募ゼロ ─ 尖った認知の先に、不安を解消する受け皿が必要"],
    ["求職者は「比較」して決める", "求職者の45%は6社以上に応募し、72%は企業の対応・情報不足で意欲を失うという調査も。情報が薄い会社は比較の土俵から静かに外れる"],
    ["読まれる土台は整備済み", "LP改善で平均スクロール深度は24%→38%へ。「読まれる状態」は作れたので、次は読ませる中身=共感・安心・安定のコンテンツ"],
  ];
  let py = 4.6;
  proofs.forEach(([h, b], i) => {
    const cx2 = i % 2 === 0 ? 0.6 : 6.75;
    const cy2 = i < 2 ? 4.6 : 5.85;
    s.addShape("roundRect", { x: cx2, y: cy2, w: 5.95, h: 1.15, rectRadius: 0.08, fill: { color: LIGHT } });
    s.addText([
      { text: h + "\n", options: { bold: true, color: NAVY, fontSize: 11 } },
      { text: b, options: { color: "374151", fontSize: 9.5 } },
    ], { x: cx2 + 0.22, y: cy2 + 0.1, w: 5.5, h: 0.98, fontFace: JP, margin: 0, valign: "top" });
  });
}

// ============ 16. 発信プラン(2) 公開調査の裏付け ============
{
  const s = pres.addSlide();
  titleSlide(s, 16, "公開調査も示す「SNS・口コミ時代」の応募行動", "松下工業様固有の課題ではなく、求職者行動そのものの変化です(当社調べ・公開調査整理レポートより)");
  const stats = [
    ["83.8%", "求人票・公式サイト以外にSNS・口コミサイトを確認する", "転職活動の標準手順に。目的は実態把握77.1%・公式情報の裏付け51.6%"],
    ["43.8%", "情報が食い違ったときSNS・口コミ側を信頼", "公式サイト・求人票側は29.1%。公式情報は自動的には信じてもらえない"],
    ["48.0%", "SNS・口コミを理由に応募をやめた・辞退した経験", "うち「応募自体を見送った」が34.5%と約3人に1人"],
    ["85%", "口コミで不安になっても企業には質問しない", "企業には「応募が来ない」という結果だけが残り、原因は伝わらない"],
  ];
  let sx2 = 0.6;
  stats.forEach(([big, label, sub]) => {
    s.addShape("roundRect", { x: sx2, y: 1.8, w: 2.98, h: 2.55, rectRadius: 0.08, fill: { color: LIGHT } });
    s.addText(big, { x: sx2 + 0.18, y: 1.95, w: 2.6, h: 0.6, fontFace: JP, fontSize: 28, bold: true, color: ORANGE, margin: 0 });
    s.addText(label, { x: sx2 + 0.18, y: 2.6, w: 2.65, h: 0.85, fontFace: JP, fontSize: 10.5, bold: true, color: NAVY, margin: 0, valign: "top" });
    s.addText(sub, { x: sx2 + 0.18, y: 3.48, w: 2.65, h: 0.8, fontFace: JP, fontSize: 9, color: GRAY, margin: 0, valign: "top" });
    sx2 += 3.18;
  });
  // 下段: 発信への示唆2つ
  s.addShape("roundRect", { x: 0.6, y: 4.6, w: 5.95, h: 1.85, rectRadius: 0.08, fill: { color: NAVY } });
  s.addText([
    { text: "求められるのは「両面が見える」情報\n", options: { bold: true, color: ORANGE, fontSize: 12.5 } },
    { text: "応募を続けたいと感じる状態の第1位は「良い面・悪い面の両方が見える」(73.6%)。大変な点は隠さず、「夏場の現場は大変→だから休憩・空調服支給」のように支援策までセットで書くのが正解。", options: { color: "CADCFC", fontSize: 10 } },
  ], { x: 0.85, y: 4.75, w: 5.45, h: 1.6, fontFace: JP, margin: 0, valign: "top" });
  s.addShape("roundRect", { x: 6.8, y: 4.6, w: 5.95, h: 1.85, rectRadius: 0.08, fill: { color: NAVY } });
  s.addText([
    { text: "「過度なキラキラ感」は離脱要因\n", options: { bold: true, color: ORANGE, fontSize: 12.5 } },
    { text: "企業SNSで応募をやめたくなる要素には「過度な演出」(44.2%)、「公式情報と実態の乖離」(45.7%)。取り繕った発信は逆効果 ─ 等身大の静止画+文字での発信方針は、この調査結果とも合致します。", options: { color: "CADCFC", fontSize: 10 } },
  ], { x: 7.05, y: 4.75, w: 5.45, h: 1.6, fontFace: JP, margin: 0, valign: "top" });
  s.addText("出典: ワークポート「転職活動におけるSNS・口コミの影響に関する調査」(2026年6月発表・有効回答308人)/エン・ジャパン『エン転職』ユーザーアンケート(2024年2月発表・有効回答4,513名)。詳細は別添「求職者は、求人票だけで応募を決めていない」参照。", { x: 0.6, y: 6.65, w: 12.15, h: 0.5, fontFace: JP, fontSize: 8.5, color: GRAY, margin: 0 });
}

// ============ 17. 発信プラン(3) コンテンツ例 ============
{
  const s = pres.addSlide();
  titleSlide(s, 17, "情報発信プラン ─ 共感・安心・安定", "透明性向上の鍵はHP・SNS(特にInstagram)での発信。3つの感情に訴求するコンテンツを継続投稿します");
  const pillars = [
    ["共感", "「この会社、わかってくれそう」", [
      "社員の転職ストーリー(前職は残業100時間超→今は17時帰宅、など実話ベース)",
      "「配管はパズルのように面白い」─ 仕事の魅力を職人自身の言葉で",
      "未経験1年目の失敗談と成長エピソード",
      "オタク気質・マニア心をくすぐる技術ネタ(工具・新工法紹介)",
    ], ORANGE],
    ["安心", "「ここでならやっていけそう」", [
      "1日のスケジュール密着(出社〜17時退社まで)",
      "教育の流れ: 穴掘りから始まり約3年で一人前・資格費用は全額会社負担",
      "職場の雰囲気: 怒鳴る親方文化なし・さん付け文化・先輩の人柄紹介",
      "給与モデル・残業や休日の実態をありのまま開示",
    ], NAVY],
    ["安定", "「長く働ける会社だ」", [
      "創業70年以上・地域インフラ(上下水道・ガス)を支える事業基盤",
      "官公庁案件・大手ガス会社との取引実績",
      "AIに代替されない技術=10年後もなくならない仕事という視点",
      "社員1人あたり資格11点以上・資格取得実績の見える化",
    ], STEEL],
  ];
  let px = 0.6;
  pillars.forEach(([h, sub, items, c]) => {
    s.addShape("roundRect", { x: px, y: 1.85, w: 3.9, h: 0.85, rectRadius: 0.08, fill: { color: c } });
    s.addText([
      { text: h, options: { bold: true, fontSize: 15, align: "center", breakLine: true } },
      { text: sub, options: { fontSize: 9.5, align: "center" } },
    ], { x: px, y: 1.85, w: 3.9, h: 0.85, fontFace: JP, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addShape("roundRect", { x: px, y: 2.85, w: 3.9, h: 3.5, rectRadius: 0.08, fill: { color: LIGHT } });
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "2022", color: c }, breakLine: i < items.length - 1 } })),
      { x: px + 0.22, y: 3.08, w: 3.45, h: 3.1, fontFace: JP, fontSize: 10, color: "374151", margin: 0, paraSpaceAfter: 9, valign: "top" });
    px += 4.19;
  });
  s.addText("※ いずれも社員インタビュー・9ヶ月の運用で収集済みの実素材から制作可能。撮り下ろしゼロでも開始できます。", { x: 0.6, y: 6.55, w: 12, h: 0.4, fontFace: JP, fontSize: 10.5, color: GRAY, margin: 0 });
}

// ============ 18. 発信プラン(4) 運用・事例 ============
{
  const s = pres.addSlide();
  titleSlide(s, 18, "発信の運用設計と成功事例", "媒体ごとに役割を分け、社長が無理なく続けられる形で運用します");
  // 左: 媒体の役割分担
  s.addText("媒体の役割分担", { x: 0.6, y: 1.75, w: 6, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const roles = [
    ["X(継続)", "認知の入口", "尖ったコピーで存在を知らせる(250万ビュー実績)。ここでは尖ったままでよい", ORANGE],
    ["Instagram(強化)", "共感・安心", "静止画+文字の定期投稿で人柄と日常を伝える。社長が自走できる制作負荷に設計", NAVY],
    ["採用HP(刷新)", "安定・裏付け", "働き方・業務内容・働く人を体系的に掲載。検索での裏付け先として機能", STEEL],
    ["説明会(継続)", "確信", "発信で温まった候補者の最後の不安を対面・オンラインで解消", NAVY],
  ];
  let ry2 = 2.2;
  roles.forEach(([h, tag, b, c]) => {
    s.addShape("roundRect", { x: 0.6, y: ry2, w: 1.85, h: 0.88, rectRadius: 0.06, fill: { color: c } });
    s.addText([
      { text: h + "\n", options: { bold: true, fontSize: 10.5 } },
      { text: tag, options: { fontSize: 9.5 } },
    ], { x: 0.72, y: ry2 + 0.08, w: 1.65, h: 0.74, fontFace: JP, color: WHITE, margin: 0, valign: "top" });
    s.addText(b, { x: 2.6, y: ry2, w: 4.1, h: 0.88, fontFace: JP, fontSize: 10, color: "374151", margin: 0, valign: "middle" });
    ry2 += 0.99;
  });
  // 右: 事例と効果測定
  s.addText("応募獲得に繋がった採用サイト・発信の事例", { x: 7.1, y: 1.75, w: 5.7, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const cases = [
    ["写真が7割の採用ページ", "画面の70%以上を写真にした構成が応募獲得に有効(HP制作会社との分析)。文章より「見て伝わる」情報量"],
    ["トップに社員の笑顔写真", "第一印象で「人」を見せた企業が成果。会社紹介より先に「誰と働くか」"],
    ["「泥臭さ」をあえて見せる", "現場のリアルを隠さない採用サイトが未経験層の信頼を獲得。取り繕った綺麗さより誠実さ"],
    ["自社のX 250万ビュー", "リアルで尖った発信が届く土壌は自社でも実証済み。同じ素材を「共感・安心・安定」に整えて展開"],
  ];
  let cy3 = 2.2;
  cases.forEach(([h, b], i) => {
    circleIcon(s, 7.1, cy3 + 0.02, String(i + 1), ORANGE);
    s.addText([
      { text: h + "  ", options: { bold: true, color: NAVY, fontSize: 11 } },
      { text: b, options: { color: "374151", fontSize: 9.8 } },
    ], { x: 7.67, y: cy3 - 0.04, w: 5.1, h: 0.95, fontFace: JP, margin: 0, valign: "top" });
    cy3 += 0.98;
  });
  // 下: 効果測定
  s.addShape("roundRect", { x: 0.6, y: 6.35, w: 12.15, h: 0.78, rectRadius: 0.08, fill: { color: NAVY } });
  s.addText([
    { text: "効果の測り方: ", options: { bold: true, color: ORANGE } },
    { text: "「Instagramプロフィール到達 → HP遷移 → 説明会予約」の連鎖をKPIとして毎週計測(GA4・コンバージョン計測の整備とセット)。投稿の反応を見てテーマ配分を月次で調整。求人票・HP・SNS・説明会で情報が食い違わない「整合性チェック」も併せて実施します。", options: { color: "CADCFC" } },
  ], { x: 0.85, y: 6.45, w: 11.7, h: 0.6, fontFace: JP, fontSize: 10.5, margin: 0, valign: "middle" });
}

// ============ 19. Instagram投稿案リスト ============
{
  const s = pres.addSlide();
  titleSlide(s, 19, "Instagram投稿案リスト(初期3ヶ月)", "全て収集済みの実素材から制作可能。各投稿に「何の透明性を上げるか」の目的を設定しています");
  const posts = [
    ["1", "「17時、社長より先には帰りづらい?いいえ、帰れます」─ 夕方の事務所と退社風景", "働き方(定時退社の実態)", "安心"],
    ["2", "配管工の1日 ─ 出社から17時退社までのスケジュール密着", "業務内容(1日の流れ)", "安心"],
    ["3", "転職ストーリー: 前職は残業100時間超→今は毎日17時帰宅(社員の実話)", "働く人(転職者のリアル)", "共感"],
    ["4", "未経験1年目は穴掘りから ─ 3年で一人前になる成長ステップ", "業務内容(未経験の育ち方)", "安心"],
    ["5", "資格の話: 費用は全額会社負担・受験日は出勤扱い・社員平均11資格", "制度の運用実態", "安定"],
    ["6", "「マニアック上等!」工具・新工法紹介シリーズ", "仕事の面白さ(技術)", "共感"],
    ["7", "正直に言います、夏の現場は大変です ─ だから会社がやっている対策", "働き方の両面(大変さ+支援)", "安心"],
    ["8", "先輩紹介Q&A: 怒鳴る親方ゼロ・「さん付け」文化の現場", "働く人(職場の雰囲気)", "共感"],
    ["9", "給与の中身: 月給28万円〜の根拠と、どう上がっていくか", "待遇(給与の計算根拠)", "安定"],
    ["10", "配管はパズルだ ─ 施工ビフォーアフター写真", "業務内容(仕事の成果)", "共感"],
    ["11", "創業70年、富山のインフラを支えてきた仕事 ─ 官公庁・ガス会社との取引", "会社の足腰(事業基盤)", "安定"],
    ["12", "オンライン説明会のご案内 ─ 顔出し不要・木曜夜45分・参加の流れ", "応募プロセス(参加ハードル)", "行動喚起"],
  ];
  const header = [
    { text: "#", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: JP, fontSize: 10, align: "center", valign: "middle", margin: 0.03 } },
    { text: "投稿案", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: JP, fontSize: 10, align: "center", valign: "middle", margin: 0.03 } },
    { text: "目的: 何の透明性を上げるか", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: JP, fontSize: 10, align: "center", valign: "middle", margin: 0.03 } },
    { text: "テーマ", options: { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: JP, fontSize: 10, align: "center", valign: "middle", margin: 0.03 } },
  ];
  const themeColor = { "共感": ORANGE, "安心": NAVY, "安定": STEEL, "行動喚起": "B45309" };
  const body = posts.map(([n, title, goal, theme], ri) => [
    { text: n, options: { color: GRAY, fill: { color: ri % 2 ? WHITE : LIGHT }, fontFace: JP, fontSize: 9.5, align: "center", valign: "middle", margin: 0.03 } },
    { text: title, options: { color: "374151", fill: { color: ri % 2 ? WHITE : LIGHT }, fontFace: JP, fontSize: 9.5, valign: "middle", margin: 0.05 } },
    { text: goal, options: { color: NAVY, fill: { color: ri % 2 ? WHITE : LIGHT }, fontFace: JP, fontSize: 9.5, valign: "middle", margin: 0.05 } },
    { text: theme, options: { bold: true, color: themeColor[theme], fill: { color: ri % 2 ? WHITE : LIGHT }, fontFace: JP, fontSize: 9.5, align: "center", valign: "middle", margin: 0.03 } },
  ]);
  s.addTable([header].concat(body), { x: 0.6, y: 1.7, w: 12.15, colW: [0.5, 6.55, 3.6, 1.5], rowH: 0.375, border: { type: "solid", color: "E5E7EB", pt: 0.5 } });
  s.addText("運用の目安: 週2〜3投稿でこのリストを約1ヶ月半で一巡 → 反応(保存・プロフィールアクセス)の良いテーマを2巡目で厚くする。#7のような「両面開示」投稿を必ず混ぜるのがポイント(応募継続要因の第1位=良い面・悪い面の両方が見える 73.6%)。", { x: 0.6, y: 6.5, w: 12.15, h: 0.65, fontFace: JP, fontSize: 10, color: GRAY, margin: 0 });
}

// ============ 20. 課題③詳細 ============
{
  const s = pres.addSlide();
  titleSlide(s, 20, "課題③ 求職者との直接接点の不足", "情報の不透明性を補う最短ルートは「直接会って話す」こと ─ 集客は他社の力を借りる");
  // 左: 自社集客の実績
  s.addText("自社集客イベントの実績", { x: 0.6, y: 1.75, w: 6, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const own = [
    ["自社説明会(対面)", "3/14・4/11・6/20・6/27", "申込 0〜1名"],
    ["オンライン説明会", "7/16・23・30(毎週木曜)", "LP予約CV 0件"],
    ["ハローワーク説明会", "4/28(他社集客型)", "2名参加"],
  ];
  const ownRows = [["形式", "実施", "集客結果"]].concat(own).map((r, ri) => r.map((c) => ({
    text: c,
    options: ri === 0
      ? { bold: true, color: WHITE, fill: { color: NAVY }, fontFace: JP, fontSize: 10.5, align: "center", valign: "middle", margin: 0.05 }
      : { color: "374151", fill: { color: ri % 2 ? LIGHT : WHITE }, fontFace: JP, fontSize: 10.5, align: "center", valign: "middle", margin: 0.05 },
  })));
  s.addTable(ownRows, { x: 0.6, y: 2.2, w: 6.1, colW: [2.0, 2.4, 1.7], rowH: 0.52, border: { type: "solid", color: "D1D5DB", pt: 0.5 } });
  s.addShape("roundRect", { x: 0.6, y: 4.6, w: 6.1, h: 2.1, rectRadius: 0.08, fill: { color: "FDF0E6" } });
  s.addText([
    { text: "唯一集客できたのは「他社(ハローワーク)が集めた場」。", options: { bold: true, color: "B45309" } },
    { text: "自社単独の集客はWeb広告を投下しても実参加に至らず、説明会そのものの品質(資料・運営・オンライン化)は整備済みのため、残る変数は「集客力」のみです。", options: { color: "374151" } },
  ], { x: 0.85, y: 4.78, w: 5.6, h: 1.75, fontFace: JP, fontSize: 11, margin: 0, valign: "top" });
  // 右: 他社集客型の選択肢
  s.addText("打ち手: 他社集客型イベントへの参加", { x: 7.1, y: 1.75, w: 5.7, h: 0.4, fontFace: JP, fontSize: 14, bold: true, color: NAVY, margin: 0 });
  const ext = [
    ["ハローワーク説明会", "無料・次回8/28以降で予約可。他社事例では予約19名・参加14名の実績も(施工管理職)。PRシート・写真掲載は整備済みですぐ乗れる"],
    ["マイナビ転職フェア富山", "来場151名・参加67社、20〜30代来場が中心でターゲット合致。10月・1月開催。出展費用(推定20〜35万円)は交渉のうえ9月中に判断"],
    ["建設職人特化スカウト", "「職人スカウト」(登録3,300名)は北陸登録者数の回答待ち。費用対効果次第で追加"],
  ];
  let ey = 2.2;
  ext.forEach(([h, b], i) => {
    circleIcon(s, 7.1, ey + 0.02, String(i + 1), ORANGE);
    s.addText([
      { text: h + "\n", options: { bold: true, color: NAVY, fontSize: 12 } },
      { text: b, options: { color: "374151", fontSize: 10.5 } },
    ], { x: 7.67, y: ey - 0.05, w: 5.1, h: 1.35, fontFace: JP, margin: 0, valign: "top" });
    ey += 1.42;
  });
  s.addText("※ 説明会は「集客の場」から「クロージングの場」へ役割を再定義。出会いは外部で、深い相互理解は自社の説明会で。", { x: 7.1, y: 6.5, w: 5.65, h: 0.6, fontFace: JP, fontSize: 10, color: GRAY, margin: 0 });
}

// ============ 21. 今後の提言 ============
{
  const s = pres.addSlide();
  titleSlide(s, 21, "今後のご提言 ─ 3つの課題に対応する打ち手", "8月以降の転職市場再活性化(ピーク:9〜10月)を最大限に活かすために");
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

// ============ 22. 実行ロードマップ ============
{
  const s = pres.addSlide();
  titleSlide(s, 22, "実行ロードマップ(2026年8月〜)", "市場ピーク(9〜10月)に間に合わせる時系列プラン");
  const cols = [
    ["8月", "土台を仕上げる", [
      "採用HPリニューアル完了(お盆前)・Instagram連携",
      "Instagram定期投稿の開始(共感・安心・安定の3テーマ)",
      "ハローワーク説明会の予約(8/28以降の枠)",
      "SMS→LINEの連絡フローを全応募者に標準化",
      "採用情報の整合性チェック(求人票・HP・SNS・説明会)",
    ], ORANGE],
    ["9月", "接点を仕込む", [
      "マイナビ転職フェア出展の可否判断(費用交渉の結果を反映)",
      "職人スカウトの費用対効果判断(北陸登録者数の回答受領後)",
      "「応募→説明会参加」移行率のKPI週次計測を開始",
      "求人・広告は20・30代向け2軸訴求へ予算集中",
    ], NAVY],
    ["10月〜", "ピークで刈り取る", [
      "ハローワーク説明会・転職フェア(10月/1月)へ参加",
      "フェア来場者をオンライン説明会・LINEへ接続",
      "Instagram・HPの反応を見てコンテンツを月次で改善",
      "年間休日数の見直し検討(中長期・経営テーマ)",
    ], STEEL],
  ];
  let cx = 0.6;
  cols.forEach(([term, theme, items, c]) => {
    s.addShape("roundRect", { x: cx, y: 1.8, w: 3.9, h: 0.75, rectRadius: 0.08, fill: { color: c } });
    s.addText([
      { text: term + "  ", options: { bold: true, fontSize: 16 } },
      { text: theme, options: { fontSize: 12 } },
    ], { x: cx, y: 1.8, w: 3.9, h: 0.75, fontFace: JP, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addShape("roundRect", { x: cx, y: 2.7, w: 3.9, h: 4.1, rectRadius: 0.08, fill: { color: LIGHT } });
    s.addText(items.map((t, i) => ({ text: t, options: { bullet: { code: "2022", color: c }, breakLine: i < items.length - 1 } })),
      { x: cx + 0.25, y: 2.95, w: 3.4, h: 3.6, fontFace: JP, fontSize: 10.5, color: "374151", margin: 0, paraSpaceAfter: 10, valign: "top" });
    cx += 4.19;
  });
}

// ============ 23. 会議・活動履歴 ============
{
  const s = pres.addSlide();
  titleSlide(s, 23, "活動履歴 ─ 定例ミーティング・説明会", "毎回議事録を共有し、決定事項を翌週までに実行するサイクルを継続");
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
