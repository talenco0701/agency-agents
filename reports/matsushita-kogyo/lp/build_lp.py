#!/usr/bin/env python3
"""松下工業様 採用LP 修正版ビルダー
元: lp/mkc.recruit-hub-ta.com/index.html → 出力: lp_out/index.html
"""
import re, sys, pathlib

SRC = pathlib.Path('lp/mkc.recruit-hub-ta.com/index.html')
OUT = pathlib.Path('lp_out/index.html')
OUT.parent.mkdir(exist_ok=True)

raw = SRC.read_bytes()

# ── 修正1: nullバイトで破損した @keyframes を復元 (@pulse-glow / @fade-up / @spin-slow)
n_null = raw.count(b'\x00')
d = raw.replace(b'\x00', b'@').decode('utf-8')
assert n_null == 3, f'想定外のnullバイト数: {n_null}'

def rep(old, new, times=1, label=''):
    global d
    c = d.count(old)
    assert c == times, f'[{label}] 出現回数 {c} (期待 {times}): {old[:60]!r}'
    d = d.replace(old, new)

# ── 修正2: 固定日程(毎週木曜)→ 個別説明会・随時日程調整 ───────────────────
rep('<title>その仕事、AIでいいがないけ。｜株式会社松下工業 会社説明会（オンライン）毎週木曜開催</title>',
    '<title>その仕事、AIでいいがないけ。｜株式会社松下工業 オンライン個別説明会（日程はご都合に合わせて調整）</title>',
    label='title')

rep('富山市のライフラインを支える配管技術者。AIに代えられない技術を、未経験から。毎週木曜18:00〜 オンライン個別説明会開催。顔出し不要・仕事帰りOK・前日までに予約。',
    '富山市のライフラインを支える配管技術者。AIに代えられない技術を、未経験から。オンライン個別説明会は日程調整制・随時受付。顔出し不要・履歴書不要・仕事帰りOK。',
    label='meta desc')

rep('富山市のライフラインを支える配管技術者。AIに代えられない技術を、未経験から。毎週木曜オンライン個別説明会。顔出し不要・仕事帰りでも参加OK。',
    '富山市のライフラインを支える配管技術者。AIに代えられない技術を、未経験から。オンライン個別説明会は日程調整制・随時受付。顔出し不要・仕事帰りでも参加OK。',
    label='og desc')

# ヒーロー: イベント情報パネル
rep('<span class="font-bold text-base" style="color:var(--text-main);">オンライン個別説明会 ／ 毎週木曜開催</span>',
    '<span class="font-bold text-base" style="color:var(--text-main);">オンライン個別説明会 ／ 日程は個別調整・随時受付</span>',
    label='hero badge')

rep('''          <div class="font-mono text-xs mb-1" style="color: var(--text-sub);">DATE</div>
          <div class="font-display text-xl sm:text-2xl font-bold neon-cyan leading-tight">毎週 <span class="text-sm">木曜日</span></div>''',
    '''          <div class="font-mono text-xs mb-1" style="color: var(--text-sub);">DATE</div>
          <div class="font-display text-xl sm:text-2xl font-bold neon-cyan leading-tight">随時 <span class="text-sm">受付中</span></div>
          <div class="font-mono text-xs mt-1" style="color: var(--text-sub);">// ご都合に合わせて調整します</div>''',
    label='hero DATE')

rep('''          <div class="font-mono text-xs mb-1" style="color: var(--text-sub);">TIME</div>
          <div class="font-mono text-base font-bold">18:00 / 18:30 / 19:00</div>
          <div class="font-mono text-xs mt-1" style="color: var(--text-sub);">// 個別開催・事前予約制</div>''',
    '''          <div class="font-mono text-xs mb-1" style="color: var(--text-sub);">TIME</div>
          <div class="font-mono text-base font-bold">平日夜 18:00〜 / 日中も可</div>
          <div class="font-mono text-xs mt-1" style="color: var(--text-sub);">// 1対1の個別開催・約45分</div>''',
    label='hero TIME')

rep('<p class="text-center text-sm neon-lime mb-3">毎週木曜開催／オンライン参加OK／これは「面接」ではありません</p>',
    '<p class="text-center text-sm neon-lime mb-3">日程はご都合に合わせます／オンライン参加OK／これは「面接」ではありません</p>',
    label='hero CTA microcopy')

# 開催概要セクション
rep('<span class="font-mono text-base sm:text-xl neon-cyan">// 毎週木曜 開催</span>',
    '<span class="font-mono text-base sm:text-xl neon-cyan">// 個別開催・随時受付</span>',
    label='event heading')

rep('''<div><span class="font-mono text-xs neon-cyan">[DATE]</span> <span class="font-bold neon-cyan">毎週木曜日</span></div>''',
    '''<div><span class="font-mono text-xs neon-cyan">[DATE]</span> <span class="font-bold neon-cyan">随時（個別に日程調整）</span></div>''',
    label='event date')

rep('<div class="mt-2 font-mono text-xs" style="color: var(--text-sub);">// 前日までに要予約（個別開催）</div>',
    '<div class="mt-2 font-mono text-xs" style="color: var(--text-sub);">// ご予約後、担当者がご希望を伺って日程を決めます</div>',
    label='event date note')

rep('<p class="text-sm" style="color: var(--text-sub);">希望日（木曜）と時間帯を選んで送信。前日までに受付。</p>',
    '<p class="text-sm" style="color: var(--text-sub);">ご希望の曜日・時間帯を選んで送信するだけ。日程は後から調整できます。</p>',
    label='howto step01')

rep('下記フォームよりお申し込みください。<br>毎週木曜開催・<span class="neon-cyan">前日までに要予約</span>。送信後、担当者よりオンラインミーティングURLをお送りします。',
    '下記フォームよりお申し込みください。<br><span class="neon-cyan">日程はご都合に合わせて個別に調整</span>します。送信後、担当者よりご連絡いたします。',
    label='form intro')

rep('<span style="color: var(--text-sub); font-size: 0.9em;">※ 前日までにお申し込みの方に順次ご連絡します</span>',
    '<span style="color: var(--text-sub); font-size: 0.9em;">※ 担当者より日程調整のご連絡をいたします</span>',
    label='thanks note')

rep('&gt; 顔出し不要・音声のみOK / 前日17:00までに予約',
    '&gt; 顔出し不要・音声のみOK / 履歴書不要・日程は後から調整OK',
    label='submit microcopy')

# ── 修正3: 予約フォームの日程欄(過去日付の固定リスト)を「希望の曜日/時間帯」に置換 ──
old_date_time = '''          <!-- 希望日程 -->
          <div class="form-field" data-field="date">
            <label class="form-label" for="rf-date">
              &gt; SELECT date
              <span class="form-label-jp">希望日程（木曜日）</span>
              <span class="form-required">必須</span>
            </label>
            <select id="rf-date" name="date" class="form-select" required>
              <option value="">-- 希望の木曜日を選択してください --</option>
              <option value="7月9日（木）">7月9日（木）</option>
              <option value="7月16日（木）">7月16日（木）</option>
              <option value="7月23日（木）">7月23日（木）</option>
              <option value="7月30日（木）">7月30日（木）</option>
              <option value="8月6日（木）">8月6日（木）</option>
              <option value="8月13日（木）">8月13日（木）</option>
              <option value="8月20日（木）">8月20日（木）</option>
              <option value="8月27日（木）">8月27日（木）</option>
            </select>
            <div class="form-error">! 希望日程を選択してください</div>
          </div>

          <!-- 希望時間帯 -->
          <div class="form-field" data-field="time">
            <label class="form-label" for="rf-time">
              &gt; SELECT time
              <span class="form-label-jp">希望時間帯</span>
              <span class="form-required">必須</span>
            </label>
            <select id="rf-time" name="time" class="form-select" required>
              <option value="">-- 選択してください --</option>
              <option value="18:00">18:00〜（約45分）</option>
              <option value="18:30">18:30〜（約45分）</option>
              <option value="19:00">19:00〜（約45分）</option>
            </select>
            <div class="form-error">! 希望時間帯を選択してください</div>
          </div>
'''

new_date_time = '''          <!-- 希望の曜日（name="date" はGAS側の項目名に合わせて維持） -->
          <div class="form-field" data-field="date">
            <label class="form-label" for="rf-date">
              &gt; SELECT day
              <span class="form-label-jp">ご希望の曜日</span>
              <span class="form-required">必須</span>
            </label>
            <select id="rf-date" name="date" class="form-select" required>
              <option value="">-- 選択してください --</option>
              <option value="平日">平日（月〜金）</option>
              <option value="土曜">土曜日</option>
              <option value="日曜・祝日">日曜・祝日</option>
              <option value="いつでも可">いつでも可・相談したい</option>
            </select>
            <div class="form-error">! ご希望の曜日を選択してください</div>
          </div>

          <!-- 希望の時間帯（name="time" 維持） -->
          <div class="form-field" data-field="time">
            <label class="form-label" for="rf-time">
              &gt; SELECT time
              <span class="form-label-jp">ご希望の時間帯</span>
              <span class="form-required">必須</span>
            </label>
            <select id="rf-time" name="time" class="form-select" required>
              <option value="">-- 選択してください --</option>
              <option value="18:00〜">18:00〜（仕事帰り）</option>
              <option value="18:30〜">18:30〜（仕事帰り）</option>
              <option value="19:00〜">19:00〜（仕事帰り）</option>
              <option value="19:30〜">19:30〜（仕事帰り）</option>
              <option value="日中（9:00〜17:00）">日中（9:00〜17:00）</option>
              <option value="相談したい">相談して決めたい</option>
            </select>
            <div class="form-error">! ご希望の時間帯を選択してください</div>
          </div>

          <!-- 具体的な希望日時・ご質問（任意／textareaはバリデーション対象外＝任意項目） -->
          <div class="form-field" data-field="note">
            <label class="form-label" for="rf-note">
              &gt; INPUT note
              <span class="form-label-jp">具体的なご希望日時・聞きたいこと</span>
              <span class="form-optional">任意</span>
            </label>
            <textarea id="rf-note" name="note" class="form-input" rows="3" placeholder="例）来週の水曜か木曜の19時以降が助かります／未経験でも本当に大丈夫か聞きたいです"></textarea>
            <div class="form-note-hint">空欄でも大丈夫です。担当者からご希望を伺います。</div>
          </div>
'''
rep(old_date_time, new_date_time, label='form date/time fields')

# サンクス画面の可読化関数を新しい選択肢に合わせる
rep('''  function readableTime(v) {
    return v === '18:00' ? '18:00〜（約45分）'
         : v === '18:30' ? '18:30〜（約45分）'
         : v === '19:00' ? '19:00〜（約45分）'
         : v || '（未選択）';
  }''',
    '''  function readableTime(v) {
    return v ? v + '（約45分）' : '（未選択）';
  }''', label='readableTime')

# 任意項目ラベル/ヒント用のCSSを追加
rep('  .form-error {',
    '''  .form-optional {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 2px 8px;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--text-sub);
    border: 1px solid var(--border);
    border-radius: 2px;
  }
  .form-note-hint {
    margin-top: 0.4rem;
    font-size: 0.75rem;
    color: var(--text-sub);
  }
  textarea.form-input {
    resize: vertical;
    min-height: 5.5rem;
    font-family: inherit;
    line-height: 1.7;
  }
  .form-error {''', label='optional css')

# ── 修正4: セクション並び替え + 透明性コンテンツの追加 ───────────────────
# トップレベル(行頭)の <section>...</section> を動的に抽出する
sec_re = re.compile(r'^<section\b.*?^</section>', re.S | re.M)
blocks = list(sec_re.finditer(d))
assert len(blocks) == 8, f'トップレベルsectionの検出数が想定外: {len(blocks)}'

head = d[:blocks[0].start()]
tail = d[blocks[-1].end():]
S = [b.group(0) for b in blocks]

def pick(marker):
    hits = [x for x in S if marker in x]
    assert len(hits) == 1, f'セクション特定失敗 [{marker}]: {len(hits)}件'
    return hits[0]

S_hero   = pick('MISSION_BRIEFING.txt')
S_abema  = pick('ABEMA Prime出演')
S_nointv = pick('PARTICIPATION_RULES')
S_flow   = pick('SCHEDULE.timeline')
S_pay    = pick('COMPENSATION.table')
S_event  = pick('EVENT_INFO.detail')
S_form   = pick('id="reserve"')
S_ceo    = pick('CEO_MESSAGE.final')

assert S_form.startswith('<section id="reserve"'), 'フォームセクションの切り出し失敗'
assert '給与・待遇' in S_pay, '給与セクションの切り出し失敗'

# ── 新規セクション(透明性コンテンツ) ─────────────────────────────────
S_day = '''
<!-- ============ 追加: 仕事の1日（働き方の透明性） ============ -->
<section class="py-8 sm:py-28 grid-bg" style="background: var(--bg-main);">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="term-label reveal mb-4">A_DAY.timeline</div>
    <h2 class="section-heading reveal mb-6">
      8時に始まって、<br class="sm:hidden">
      <span class="neon-cyan">17時に終わります。</span>
    </h2>
    <p class="text-base sm:text-lg mb-10 max-w-3xl" style="color: var(--text-sub);">
      「実際、何時に帰れるのか」。ここが一番気になると思うので、先に書いておきます。
    </p>

    <div class="card reveal-scale p-6 sm:p-10 mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="flex gap-4 items-start p-4" style="background: rgba(0,229,255,0.04); border-left: 2px solid var(--neon-cyan);">
          <div class="font-mono font-bold neon-cyan" style="min-width: 3.6rem;">8:00</div>
          <div>
            <div class="font-bold mb-1">出社・朝礼</div>
            <div class="text-sm" style="color: var(--text-sub);">その日の現場と段取りを全員で確認します。</div>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4" style="background: rgba(0,229,255,0.04); border-left: 2px solid var(--neon-cyan);">
          <div class="font-mono font-bold neon-cyan" style="min-width: 3.6rem;">8:30</div>
          <div>
            <div class="font-bold mb-1">現場へ移動</div>
            <div class="text-sm" style="color: var(--text-sub);">富山市内が中心。<span class="neon-lime">転勤はありません。</span></div>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4" style="background: rgba(0,229,255,0.04); border-left: 2px solid var(--neon-cyan);">
          <div class="font-mono font-bold neon-cyan" style="min-width: 3.6rem;">午前</div>
          <div>
            <div class="font-bold mb-1">配管作業</div>
            <div class="text-sm" style="color: var(--text-sub);">上下水道・ガスの新設や修繕。だいたい4人前後のチームで動きます。</div>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4" style="background: rgba(0,229,255,0.04); border-left: 2px solid var(--neon-cyan);">
          <div class="font-mono font-bold neon-cyan" style="min-width: 3.6rem;">12:00</div>
          <div>
            <div class="font-bold mb-1">昼休憩</div>
            <div class="text-sm" style="color: var(--text-sub);">休憩は1日あわせて90分。実働は7.5時間です。</div>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4" style="background: rgba(0,229,255,0.04); border-left: 2px solid var(--neon-cyan);">
          <div class="font-mono font-bold neon-cyan" style="min-width: 3.6rem;">15:00</div>
          <div>
            <div class="font-bold mb-1">仕上げ・片付け</div>
            <div class="text-sm" style="color: var(--text-sub);">「暗くなる前に終える」を全員で意識しています。</div>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4" style="background: rgba(180,255,0,0.06); border-left: 2px solid var(--neon-lime);">
          <div class="font-mono font-bold neon-lime" style="min-width: 3.6rem;">17:00</div>
          <div>
            <div class="font-bold mb-1 neon-lime">退社</div>
            <div class="text-sm" style="color: var(--text-sub);">社長も部長も定時で帰ります。だから「帰りにくい空気」がありません。</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card reveal-scale p-6 sm:p-8">
      <div class="term-label reveal mb-4">HOLIDAYS</div>
      <p class="text-base mb-3"><span class="font-bold neon-cyan">休日：</span>日曜・第2/4/5土曜・祝日／夏季・年末年始・GW・有給・慶弔休暇</p>
      <p class="text-sm" style="color: var(--text-sub);">
        ※ 第1・第3土曜日は出勤日です。ここは隠さずお伝えしておきます。
      </p>
    </div>
  </div>
</section>
'''

S_growth = '''
<!-- ============ 追加: 未経験からの成長ステップ（業務内容の透明性） ============ -->
<section class="py-8 sm:py-28" style="background: linear-gradient(180deg, var(--bg-main) 0%, var(--bg-second) 100%);">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="term-label reveal mb-4">CAREER.steps</div>
    <h2 class="section-heading reveal mb-6">
      未経験は、<br class="sm:hidden">
      <span class="neon-lime">穴掘りから始まります。</span>
    </h2>
    <p class="text-base sm:text-lg mb-10 max-w-3xl" style="color: var(--text-sub);">
      かっこよく書くこともできますが、本当のところを書きます。最初は穴を掘るところからです。そこから、こう育っていきます。
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="card reveal-scale p-6">
        <div class="font-mono text-xs neon-cyan mb-2">STEP 01 ／ 入社〜数ヶ月</div>
        <div class="font-bold text-lg mb-2">穴掘り・資材運びから</div>
        <p class="text-sm" style="color: var(--text-sub);">先輩について回りながら、現場の流れと道具の名前を覚えます。いきなり一人にはしません。</p>
      </div>
      <div class="card reveal-scale p-6">
        <div class="font-mono text-xs neon-cyan mb-2">STEP 02 ／ 半年〜1年</div>
        <div class="font-bold text-lg mb-2">簡単な配管作業を任される</div>
        <p class="text-sm" style="color: var(--text-sub);">同時に資格の勉強もスタート。受験料・交通費・宿泊費は<span class="neon-lime">全額会社負担</span>、試験日も出勤扱いです。</p>
      </div>
      <div class="card reveal-scale p-6">
        <div class="font-mono text-xs neon-cyan mb-2">STEP 03 ／ 2〜3年</div>
        <div class="font-bold text-lg mb-2">一通りの現場を回せるように</div>
        <p class="text-sm" style="color: var(--text-sub);">3年ほどで、ひととおりの現場を任せてもらえるようになります。ここまで来れば「手に職」です。</p>
      </div>
      <div class="card reveal-scale p-6">
        <div class="font-mono text-xs neon-cyan mb-2">STEP 04 ／ 5年〜</div>
        <div class="font-bold text-lg mb-2">専門を持ち、教える側へ</div>
        <p class="text-sm" style="color: var(--text-sub);">上水・ガス・下水のいずれかに特化していきます。社員一人あたりの保有資格は平均11点以上です。</p>
      </div>
    </div>
  </div>
</section>
'''

S_people = '''
<!-- ============ 追加: 働く人（共感） ============ -->
<section class="py-8 sm:py-28 grid-bg" style="background: var(--bg-main);">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="term-label reveal mb-4">PEOPLE.voice</div>
    <h2 class="section-heading reveal mb-6">
      どんな人が、<br class="sm:hidden">
      <span class="neon-cyan">働いているか。</span>
    </h2>
    <p class="text-base sm:text-lg mb-10 max-w-3xl" style="color: var(--text-sub);">
      実際に働いている社員に聞いた話を、そのまま載せます。
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <div class="card reveal-scale p-6 sm:p-8">
        <div class="font-mono text-xs neon-cyan mb-3">VOICE 01 ／ 営業業務部・勤続約20年</div>
        <p class="text-base sm:text-lg font-bold mb-3" style="line-height:1.8;">
          「前の職場は残業が月100時間を超えても、給料は今と同じくらいでした。<span class="neon-lime">今は基本17時に帰れる。</span>それが決め手でした。」
        </p>
        <p class="text-sm" style="color: var(--text-sub);">
          担当は水道の本管・給水管。新築なら1日で終わる工事もあります。屋外の力仕事なので体力は要りますが、その分やったことが形に残ります。
        </p>
      </div>
      <div class="card reveal-scale p-6 sm:p-8">
        <div class="font-mono text-xs neon-cyan mb-3">VOICE 02 ／ 配管歴16年・管理担当</div>
        <p class="text-base sm:text-lg font-bold mb-3" style="line-height:1.8;">
          「未経験でも大丈夫です。<span class="neon-lime">最初は先輩について回って覚えます。</span>3年もあれば、一通りの現場は回れるようになります。」
        </p>
        <p class="text-sm" style="color: var(--text-sub);">
          配管ルートをきれいに通す、汚れを残さない、手戻りをさせない。地味ですが、そこが信頼につながります。パズルを解くような面白さがあります。
        </p>
      </div>
    </div>

    <div class="card reveal-scale p-6 sm:p-8">
      <div class="term-label reveal mb-4">ATMOSPHERE</div>
      <p class="text-base" style="line-height:1.9;">
        職場は基本「さん付け」。年上の先輩を「〜ちゃん」と呼んでも許されるくらいの距離感です。<br>
        <span class="neon-lime font-bold">怒鳴る親方はいません。</span>新しい工具や工法も、若手の提案で取り入れています。
      </p>
    </div>
  </div>
</section>
'''

S_honest = '''
<!-- ============ 追加: 両面開示（大変な点＋会社の対応） ============ -->
<section class="py-8 sm:py-28" style="background: linear-gradient(180deg, var(--bg-main) 0%, var(--bg-third) 100%);">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="term-label reveal mb-4">HONEST.md</div>
    <h2 class="section-heading reveal mb-6">
      正直に言うと、<br class="sm:hidden">
      <span style="color: var(--text-sub); font-size: 0.8em;">大変なこともあります。</span>
    </h2>
    <p class="text-base sm:text-lg mb-10 max-w-3xl" style="color: var(--text-sub);">
      良いところだけ並べても、入ってから「話が違う」となるだけです。大変な点と、それに対して会社がやっていることをセットで書きます。
    </p>

    <div class="space-y-5">
      <div class="card reveal-scale p-6 sm:p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <div class="font-mono text-xs mb-2" style="color: #FF6B6B;">▲ 大変な点</div>
            <div class="font-bold text-lg">屋外の仕事です。夏は暑く、冬は寒い。</div>
            <p class="text-sm mt-2" style="color: var(--text-sub);">体力は必要です。ここは、ごまかしようがありません。</p>
          </div>
          <div style="border-left: 2px solid var(--neon-lime); padding-left: 1.2rem;">
            <div class="font-mono text-xs mb-2 neon-lime">✓ 会社がやっていること</div>
            <p class="text-sm" style="color: var(--text-sub);">制服・安全防具は貸与。「怪我なく帰る」「暗くなる前に終える」を全員で徹底しています。だから残業も基本ありません。</p>
          </div>
        </div>
      </div>

      <div class="card reveal-scale p-6 sm:p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <div class="font-mono text-xs mb-2" style="color: #FF6B6B;">▲ 大変な点</div>
            <div class="font-bold text-lg">入って最初は、穴掘りが中心です。</div>
            <p class="text-sm mt-2" style="color: var(--text-sub);">地味な作業が数ヶ月は続きます。派手さはありません。</p>
          </div>
          <div style="border-left: 2px solid var(--neon-lime); padding-left: 1.2rem;">
            <div class="font-mono text-xs mb-2 neon-lime">✓ 会社がやっていること</div>
            <p class="text-sm" style="color: var(--text-sub);">いきなり一人にはしません。熟練者に同行しながら覚えてもらいます。研修期間中も給与は保証します。</p>
          </div>
        </div>
      </div>

      <div class="card reveal-scale p-6 sm:p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <div class="font-mono text-xs mb-2" style="color: #FF6B6B;">▲ 大変な点</div>
            <div class="font-bold text-lg">第1・第3土曜日は出勤です。</div>
            <p class="text-sm mt-2" style="color: var(--text-sub);">完全週休2日ではありません。</p>
          </div>
          <div style="border-left: 2px solid var(--neon-lime); padding-left: 1.2rem;">
            <div class="font-mono text-xs mb-2 neon-lime">✓ 会社がやっていること</div>
            <p class="text-sm" style="color: var(--text-sub);">その分、平日は基本17時退社。日曜・第2/4/5土曜・祝日はしっかり休みです。夏季・年末年始・GWもあります。</p>
          </div>
        </div>
      </div>
    </div>

    <p class="text-base sm:text-lg mt-10 text-center" style="color: var(--text-main);">
      ここまで読んで「思ったよりキツくないな」と感じた方も、「やっぱり大変そう」と感じた方も、<br class="hidden sm:block">
      <span class="neon-lime font-bold">まずは説明会で、直接聞いてください。</span>
    </p>
    <div class="text-center mt-6">
      <a href="#reserve" class="btn-neon btn-cta-lg" data-ga-event="cta_click" data-ga-label="after_honest">▶ 説明会を予約する</a>
    </div>
  </div>
</section>
'''

# 新しい並び: hero → ABEMA → 面接じゃない → 給与 → 【フォーム】 → 1日 → 成長 → 人 → 正直 → 当日の流れ → 開催概要 → 社長 → footer
body = '\n'.join([
    S_hero, S_abema, S_nointv,
    S_pay,          # 給与を前倒し(応募判断で最も見られる情報)
    S_form,         # フォームを約35%地点へ
    S_day, S_growth, S_people, S_honest,   # 透明性コンテンツ
    S_flow, S_event,
    S_ceo,
])
d = head + '\n' + body + '\n' + tail

# ── 検証 ────────────────────────────────────────────────────────────
assert d.count('id="reserve"') == 1, '#reserve が重複/欠落'
assert d.count('id="reserveForm"') == 1, 'フォームが重複/欠落'
assert '\x00' not in d, 'nullバイトが残存'
for kw in ['@keyframes fade-up', '@keyframes pulse-glow', '@keyframes spin-slow']:
    assert kw in d, f'{kw} 未復元'
assert '毎週木曜' not in d, '「毎週木曜」表記が残存'
assert '7月9日（木）' not in d, '過去日程が残存'
assert '前日17:00' not in d and '前日まで' not in d, '旧予約締切の表記が残存'
# GA計測タグの保全チェック
import collections
src_labels = collections.Counter(re.findall(r'data-ga-label="([\w-]+)"', raw.replace(b'\x00', b'@').decode('utf-8')))
out_labels = collections.Counter(re.findall(r'data-ga-label="([\w-]+)"', d))
missing = src_labels - out_labels
assert not missing, f'GAラベルが失われた: {missing}'
print('GAラベル 元:', sum(src_labels.values()), '→ 新:', sum(out_labels.values()), '(追加:', sum((out_labels - src_labels).values()), ')')

OUT.write_text(d, encoding='utf-8')
print('出力:', OUT, len(d.encode('utf-8')), 'bytes')
