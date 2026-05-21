const MIN_SCORE = 4;
const WEIGHTS = { strong: 6, medium: 3, weak: 1, negative: -5 };

const ROUTES = [
  route('hapo:hotfix', 'urgent fix or production regression', 100, {
    strong: ['hotfix', 'fix bug', 'fix lỗi', 'fix loi', 'sửa lỗi', 'sua loi', 'production bug', 'prod bug', 'regression', 'lỗi production', 'loi production', 'sửa gấp', 'sua gap', 'バグ修正', '不具合修正', '本番障害', '本番バグ', '緊急修正', '至急修正', 'リグレッション'],
    medium: ['khẩn cấp', 'khan cap', 'production', 'critical bug', 'rollback', '修正して', '直して', '緊急', '本番', '重大バグ', 'ロールバック', '障害対応'],
    weak: ['fix', 'fixing', 'sửa', 'sua', 'urgent', 'emergency', 'release is broken', '修正', '直す', '至急', 'リリースが壊れた'],
    negative: ['slide', 'pptx', 'spec', 'brainstorm'],
  }),
  route('hapo:debug', 'bug investigation or failure diagnosis', 90, {
    strong: ['debug', 'root cause', 'diagnose', 'stack trace', 'không chạy', 'khong chay', 'デバッグ', '原因調査', '根本原因', 'スタックトレース', '動かない'],
    medium: ['bug', 'error', 'exception', 'failing', 'failed', 'failure', 'broken', 'lỗi', 'loi', 'tại sao', 'tai sao', 'vì sao', 'vi sao', 'nguyên nhân', 'nguyen nhan', 'ci fail', 'build fail', 'バグ', 'エラー', '例外', '失敗', '壊れている', 'なぜ', '原因', 'ci失敗', 'ビルド失敗'],
    weak: ['sai', 'fail', 'issue', 'problem', '問題', '不具合'],
    negative: ['commit', 'push', 'slide', 'pptx'],
  }),
  route('hapo:specs', 'specification, requirements, design, tasks, or spec validation', 80, {
    strong: ['spec', 'specs', 'requirements', 'acceptance criteria', 'task breakdown', 'đặc tả', 'dac ta', '仕様', '仕様書', '要件', '受け入れ条件', 'タスク分解', '仕様を作って', '仕様を作成'],
    medium: ['requirement', 'ears', 'design doc', 'scope', '--validate', 'yêu cầu', 'yeu cau', 'phạm vi', 'pham vi', 'validate spec', 'kiểm tra spec', 'kiem tra spec', '要求', '設計書', 'スコープ', '検証', '仕様を確認'],
    weak: ['tính năng mới', 'tinh nang moi', 'feature idea', 'user story', 'criteria', 'task list', '新機能', 'ユーザーストーリー', '基準', 'タスクリスト'],
    negative: ['commit', 'push', 'bug', 'error', 'production', 'pptx', 'pdf'],
  }),
  route('hapo:develop', 'implementation from an approved spec or task list', 75, {
    strong: ['develop', 'implement', 'implementation', 'theo spec', 'theo specs', 'approved spec', 'làm theo spec', 'lam theo spec', '実装', '開発', '仕様に沿って', '仕様どおり', '承認済み仕様'],
    medium: ['build this', 'code this', 'start task', 'run task', 'thực hiện task', 'thuc hien task', 'phát triển', 'phat trien', 'bắt đầu implement', 'bat dau implement', 'vào code', 'vao code', '作って', 'コードを書いて', 'タスクを開始', 'タスクを実行', '開発して', '実装して'],
    weak: ['triển khai', 'trien khai', 'đưa vào code', 'dua vao code', 'code feature', 'コード化', '機能を作る'],
    negative: ['bug', 'debug', 'review', 'test only', 'commit'],
  }),
  route('hapo:test', 'test, verification, QA, or runtime validation', 70, {
    strong: ['unit test', 'integration test', 'e2e', 'playwright', 'coverage', 'kiểm thử', 'kiem thu', '単体テスト', '結合テスト', 'カバレッジ', 'テストして'],
    medium: ['test', 'tests', 'testing', 'qa', 'verify', 'verification', 'kiểm tra chạy', 'kiem tra chay', 'xác minh', 'xac minh', 'テスト', '検証', '確認', '動作確認'],
    weak: ['assert', 'runtime proof', 'manual qa', 'end to end', 'smoke test', 'アサート', 'スモークテスト'],
    negative: ['spec', 'requirements', 'commit', 'push'],
  }),
  route('hapo:code-review', 'code review, audit, security, or quality assessment', 68, {
    strong: ['code review', 'security review', 'performance review', 'đánh giá code', 'danh gia code', 'コードレビュー', 'セキュリティレビュー', '性能レビュー'],
    medium: ['review', 'audit', 'quality', 'đánh giá', 'danh gia', 'kiểm tra chất lượng', 'kiem tra chat luong', 'レビュー', '監査', '品質', '品質確認'],
    weak: ['risk', 'maintainability', 'readability', 'vulnerability', 'lỗ hổng', 'lo hong', 'リスク', '保守性', '可読性', '脆弱性'],
    negative: ['slide', 'pptx', 'commit and push'],
  }),
  route('hapo:git', 'git, commit, push, branch, tag, or pull request workflow', 65, {
    strong: ['commit', 'push', 'pull request', 'git', 'đẩy lên', 'day len', 'コミット', 'プッシュ', 'プルリク', 'リリースして'],
    medium: ['pr ', 'branch', 'tag', 'release', 'publish', 'merge', 'rebase', 'ブランチ', 'タグ', 'リリース', '公開', 'マージ', 'リベース'],
    weak: ['origin', 'remote', 'checkout', 'stash', 'version bump', 'リモート', 'チェックアウト', 'スタッシュ', 'バージョン更新'],
    negative: ['deploy', 'test', 'review only'],
  }),
  route('hapo:inspect', 'codebase discovery, file search, structure scan, or locating implementation areas', 64, {
    strong: ['inspect', 'codebase scan', 'scan codebase', 'scan source', 'file discovery', 'find files', 'locate files', 'xem source', 'xem codebase', 'quét source', 'quet source', 'quét codebase', 'quet codebase', 'kiểm tra cấu trúc', 'kiem tra cau truc', 'コード構造', 'ソース確認', 'コードベース確認', 'ファイル探索', '構造を確認'],
    medium: ['search files', 'find where', 'where is', 'project structure', 'code structure', 'repo structure', 'tìm file', 'tim file', 'tìm trong source', 'tim trong source', 'cấu trúc project', 'cau truc project', 'ở đâu', 'o dau', '関連ファイル', 'どこにある', 'プロジェクト構造', 'リポジトリ構造', '探して'],
    weak: ['scan', 'inspect code', 'explore code', 'xem qua', 'xem giúp', '調べて', '確認して'],
    negative: ['bug', 'error', 'lỗi', 'loi', 'fail', 'failure', 'production', 'hotfix', 'fix', 'sửa', 'sua', 'debug', 'develop', 'implement', 'test', 'commit', 'push', 'slide', 'pptx'],
  }),
  route('hapo:impact-analysis', 'impact analysis before changing existing behavior', 64, {
    strong: ['impact analysis', 'blast radius', 'ảnh hưởng', 'anh huong', 'tác động', 'tac dong', '影響分析', '影響範囲', '影響', '副作用'],
    medium: ['impact', 'liên quan những đâu', 'lien quan nhung dau', 'affected files', 'dependency impact', '関連箇所', '影響ファイル', '依存関係'],
    weak: ['before changing', 'risk area', 'downstream', 'upstream', 'side effect', '変更前', 'リスク範囲', '下流', '上流'],
    negative: ['slide', 'pptx'],
  }),
  route('hapo:frontend-design', 'UI/UX design, visual style, layout, or color system', 62, {
    strong: ['ui design', 'visual style', 'color system', 'thiết kế giao diện', 'thiet ke giao dien', 'màu sắc', 'mau sac', 'uiデザイン', '画面デザイン', 'ビジュアルスタイル', '配色'],
    medium: ['ux', 'layout', 'style', 'theme', 'responsive design', 'giao diện', 'giao dien', 'wireframe', 'レイアウト', 'スタイル', 'テーマ', 'レスポンシブデザイン', '画面', 'ワイヤーフレーム', '色'],
    weak: ['palette', 'typography', 'spacing', 'polish ui', 'mockup', 'prototype', 'パレット', 'タイポグラフィ', '余白', 'モックアップ', 'プロトタイプ'],
    negative: ['backend', 'api', 'database'],
  }),
  route('hapo:react-best-practices', 'React and Next.js performance patterns, rerender optimization, and Vercel best practices', 60, {
    strong: ['react best practices', 'next.js best practices', 'vercel react best practices', 'react performance', 'next.js performance', 'optimize react', 'optimize next.js', 'tối ưu react', 'toi uu react', 'tối ưu next.js', 'toi uu next.js', 'reactベストプラクティス', 'next.jsベストプラクティス', 'react最適化', 'next.js最適化', 'react性能'],
    medium: ['bundle optimization', 'bundle size', 'rerender optimization', 're-render optimization', 'data fetching', 'server component', 'client component', 'suspense', 'hydration', 'waterfall', 'usememo', 'usecallback', 'react cache', 'tối ưu rerender', 'toi uu rerender', 'tối ưu bundle', 'toi uu bundle', 'バンドル最適化', '再レンダー最適化', 'データ取得', 'サーバーコンポーネント', 'クライアントコンポーネント', 'ハイドレーション'],
    weak: ['react', 'next.js', 'memo', 'rerender', 're-render', 'render performance', 'component performance', 'waterfalls', 'lazy state', 'dynamic import', 'react pattern', 'next.js pattern', 'レンダー性能', 'コンポーネント性能', '動的インポート'],
    negative: ['backend', 'api', 'database', 'slide', 'pptx', 'commit', 'push'],
  }),
  route('hapo:frontend-development', 'frontend implementation work', 58, {
    strong: ['react', 'next.js', 'vite', 'frontend', 'tailwind', 'web app', 'フロントエンド', 'webアプリ'],
    medium: ['component', 'css', 'html', 'browser ui', 'client side', 'giao diện react', 'コンポーネント', 'ブラウザui', 'クライアント側', 'react画面'],
    weak: ['state management', 'hook', 'form', 'table', 'dashboard ui', '状態管理', 'フック', 'フォーム', 'テーブル', 'ダッシュボードui'],
    negative: ['best practices', 'performance', 'optimize', 'optimization', 'rerender', 're-render', 'tối ưu', 'toi uu', '再レンダー', '最適化', '性能', 'backend only', 'database only', 'slide', 'pptx'],
  }),
  route('hapo:backend-development', 'backend, API, database, or service implementation', 58, {
    strong: ['backend', 'api', 'database', 'endpoint', 'server', 'service', 'バックエンド', 'データベース', 'エンドポイント', 'サーバー', 'サービス'],
    medium: ['db', 'sql', 'postgres', 'mysql', 'migration', 'schema', 'worker', 'queue', 'マイグレーション', 'スキーマ', 'ワーカー', 'キュー'],
    weak: ['controller', 'route handler', 'repository', 'model', 'auth service', 'コントローラ', 'ルートハンドラ', 'リポジトリ', 'モデル', '認証サービス'],
    negative: ['frontend only', 'slide', 'pptx'],
  }),
  route('hapo:mobile-development', 'mobile app implementation', 56, {
    strong: ['mobile', 'ios', 'android', 'react native', 'flutter', 'モバイル'],
    medium: ['app store', 'play store', 'native app', 'mobile screen', 'アプリストア', 'playストア', 'ネイティブアプリ', 'モバイル画面'],
    weak: ['gesture', 'push notification', 'offline sync', 'ジェスチャー', 'プッシュ通知', 'オフライン同期'],
    negative: ['web only', 'desktop only'],
  }),
  route('hapo:devops', 'deployment, infrastructure, CI/CD, or operations work', 54, {
    strong: ['deploy', 'deployment', 'docker', 'kubernetes', 'ci/cd', 'github actions', 'デプロイ', 'デプロイメント'],
    medium: ['vercel', 'infra', 'infrastructure', 'devops', 'pipeline', 'environment variable', 'インフラ', 'パイプライン', '環境変数'],
    weak: ['build server', 'container', 'helm', 'terraform', 'monitoring', 'ビルドサーバー', 'コンテナ', '監視'],
    negative: ['slide', 'pptx', 'spec only'],
  }),
  route('hapo:generate-graph', 'diagram, graph, architecture map, or flow visualization', 52, {
    strong: ['diagram', 'graph', 'mermaid', 'flowchart', 'architecture diagram', 'sơ đồ', 'so do', '図', '図解', 'ダイアグラム', 'グラフ', 'フローチャート', '構成図'],
    medium: ['biểu đồ', 'bieu do', 'visualize', 'sequence diagram', 'data flow', '可視化', 'シーケンス図', 'データフロー'],
    weak: ['mind map', 'dependency map', 'system map', 'マインドマップ', '依存関係図', 'システム図'],
    negative: ['pptx', 'slide deck'],
  }),
  route('hapo:brainstorm', 'early ideation or unclear solution direction', 50, {
    strong: ['brainstorm', 'ý tưởng', 'y tuong', 'phương án', 'phuong an', 'gợi ý', 'goi y', 'ブレスト', 'アイデア', '案', '提案して', '相談'],
    medium: ['idea', 'ideas', 'approach', 'options', 'tradeoff', 'chủ đề', 'chu de', 'cần làm gì', 'can lam gi', 'アプローチ', '選択肢', 'トレードオフ', 'テーマ', '何をすれば'],
    weak: ['proposal', 'strategy', 'plan options', 'explore', 'direction', 'seminar topic', '提案', '戦略', '方向性', '検討'],
    negative: ['commit', 'push', 'bug', 'error'],
  }),
  route('hapo:research', 'technical research or best-practice lookup', 48, {
    strong: ['research', 'best practice', 'tìm hiểu', 'tim hieu', 'nghiên cứu', 'nghien cuu', '調査', 'リサーチ', 'ベストプラクティス'],
    medium: ['documentation', 'docs', 'compare tools', 'latest docs', 'official docs', 'ドキュメント', '比較', '最新ドキュメント', '公式ドキュメント'],
    weak: ['investigate options', 'market scan', 'reference', 'source material', '選択肢を調べる', '参考資料', '資料'],
    negative: ['commit', 'push'],
  }),
  route('hapo:pptx', 'presentation or PowerPoint work', 46, {
    strong: ['pptx', 'powerpoint', 'slide deck', 'presentation deck', 'スライド資料', 'プレゼン資料'],
    medium: ['slide', 'slides', 'deck', 'presentation', 'seminar slides', 'スライド', 'プレゼン', 'セミナー資料'],
    weak: ['speaker notes', 'appendix', 'mục lục slide', 'muc luc slide', '発表ノート', '付録', '目次'],
    negative: ['source code', 'api', 'database'],
  }),
  route('hapo:agent-browser', 'browser automation with snapshot refs, web interaction, recording, or Browserbase cloud browser workflows', 45, {
    strong: ['agent-browser', 'browser automation', 'web automation', 'browserbase', 'cloud browser', 'snapshot refs', 'browser snapshot', 'automate browser', 'tự động trình duyệt', 'tu dong trinh duyet', 'tự động thao tác trình duyệt', 'tu dong thao tac trinh duyet', 'ブラウザ自動化', 'クラウドブラウザ', 'ブラウザ操作', 'ブラウザスナップショット'],
    medium: ['open url', 'navigate site', 'click in browser', 'fill form in browser', 'record browser', 'browser session', 'multi tab', 'browser test session', 'mở website', 'mo website', 'truy cập website', 'truy cap website', 'click trên web', 'click tren web', 'điền form web', 'dien form web', 'サイトを開く', 'ブラウザで開く', 'フォーム入力', 'クリック操作', '録画'],
    weak: ['click button', 'fill form', 'open site', 'web session', 'browser ref', 'viewport', 'cookies', 'localstorage', 'ボタンをクリック', 'ビューポート', 'クッキー'],
    negative: ['attached screenshot', 'ảnh đính kèm', 'anh dinh kem', '画像添付', 'source code', 'codebase', 'commit', 'push', 'pptx', 'pdf'],
  }),
  route('hapo:pdf', 'PDF reading, extraction, or generation', 44, {
    strong: ['pdf'], medium: ['export pdf', 'read pdf', 'extract pdf', 'pdf出力', 'pdfを読む', 'pdf抽出'], weak: ['page render', 'ページレンダー'], negative: [],
  }),
  route('hapo:docx', 'Word document work', 42, {
    strong: ['docx', 'word document', 'word file', 'word文書', 'wordファイル'], medium: ['word'], weak: ['tracked changes', 'document file', '変更履歴', '文書ファイル'], negative: [],
  }),
  route('hapo:xlsx', 'spreadsheet or Excel work', 42, {
    strong: ['xlsx', 'excel', 'spreadsheet', 'スプレッドシート'], medium: ['csv', 'sheet', 'workbook', 'シート', 'ワークブック'], weak: ['formula', 'pivot table', '数式', 'ピボットテーブル'], negative: [],
  }),
  route('hapo:ai-multimodal', 'image, video, audio, or multimodal artifact analysis', 40, {
    strong: ['screenshot', 'video', 'audio', 'multimodal', 'ảnh', 'anh', 'hình', 'hinh', 'スクリーンショット', '動画', '音声', '画像', '写真'],
    medium: ['image', 'screen capture', 'recording', 'file attached', 'イメージ', '画面キャプチャ', '録画', '添付ファイル'],
    weak: ['visual', 'describe image', 'ocr', 'ビジュアル', '画像説明'],
    negative: ['pptx', 'pdf export'],
  }),
];

function route(skill, reason, priority, signals) {
  return { skill, reason, priority, signals };
}

function normalize(value) {
  return String(value || '')
    .normalize('NFKC')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFC')
    .toLowerCase();
}

function scoreRoute(prompt, routeItem) {
  const normalized = normalize(prompt);
  const matched = [];
  let score = 0;
  for (const [bucket, weight] of Object.entries(WEIGHTS)) {
    for (const term of routeItem.signals[bucket] || []) {
      if (!normalized.includes(normalize(term))) continue;
      score += weight;
      matched.push({ bucket, term, weight });
    }
  }
  return { ...routeItem, score, matched, confidence: confidence(score) };
}

function confidence(score) {
  if (score >= 12) return 'high';
  if (score >= 7) return 'medium';
  if (score >= MIN_SCORE) return 'low';
  return 'none';
}

function findRoute(prompt) {
  const candidates = ROUTES
    .map((routeItem, index) => ({ ...scoreRoute(prompt, routeItem), index }))
    .filter((routeItem) => routeItem.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score || b.priority - a.priority || a.index - b.index);
  return candidates[0] || null;
}

module.exports = {
  MIN_SCORE,
  ROUTES,
  findRoute,
  normalize,
  scoreRoute,
};
