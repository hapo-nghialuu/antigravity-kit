import type { Locale } from '@/hooks/use-locale';

type LandingTranslations = {
    hero: {
        badge: string;
        subtitle: string;
        readDocs: string;
        copied: string;
        copy: string;
    };
    features: {
        heading: string;
        subheading: string;
        items: {
            title: string;
            description: string;
        }[];
    };
    quickStart: {
        heading: string;
        subheading: string;
        viewGuide: string;
        copied: string;
        copy: string;
        comments: string[];
    };
};

const translations: Record<Locale, LandingTranslations> = {
    en: {
        hero: {
            badge: 'Spec-Driven Development for AI Coding Assistants',
            subtitle: 'A structured 6-phase workflow for building features with Claude Code & Antigravity. From requirements to implementation, with clear documentation every step of the way.',
            readDocs: 'Read Documentation',
            copied: 'Copied!',
            copy: 'Copy',
        },
        features: {
            heading: 'Build features with confidence',
            subheading: 'CafeKit Spec provides a complete workflow for spec-driven development with Claude Code & Antigravity',
            items: [
                {
                    title: '6-Phase Workflow',
                    description: 'From requirements gathering to implementation tracking. A structured process that ensures nothing is missed.',
                },
                {
                    title: 'Living Documentation',
                    description: 'Every spec creates documentation that stays with your project. Perfect for team collaboration and maintenance.',
                },
                {
                    title: 'Documentation Automation',
                    description: 'Auto-generate project documentation with /docs init and keep it updated with /docs update. Create AGENTS.md, CLAUDE.md, and 7+ project docs.',
                },
                {
                    title: 'AI-Guided Implementation',
                    description: 'Works with Claude Code and Antigravity to guide you through each phase with intelligent suggestions and verification at every step.',
                },
            ],
        },
        quickStart: {
            heading: 'Get Started in Seconds',
            subheading: 'Install CafeKit Spec and run your first spec-driven workflow with Claude Code or Antigravity',
            viewGuide: 'View full quickstart guide',
            copied: 'Copied!',
            copy: 'Copy',
            comments: [
                '# 1. Install CafeKit Spec',
                '# 2. Initialize project docs (optional but recommended)',
                '# 3. Start building features with spec workflow',
                '# 4. Update docs when project changes',
            ],
        },
    },
    vi: {
        hero: {
            badge: 'Phát triển theo đặc tả (Spec-Driven) cho AI Coding Assistant',
            subtitle: 'Quy trình 6 bước mang tính cấu trúc cao, hỗ trợ xây dựng tính năng cùng Claude Code & Antigravity. Từ phân tích yêu cầu đến khi hoàn thiện code, mọi thứ đều minh bạch và đi kèm tài liệu rõ ràng.',
            readDocs: 'Đọc tài liệu hướng dẫn',
            copied: 'Đã copy!',
            copy: 'Copy',
        },
        features: {
            heading: 'Phát triển tính năng với sự tự tin tuyệt đối',
            subheading: 'CafeKit Spec cung cấp một quy trình trọn vẹn để bạn ứng dụng Spec-Driven Development cùng Claude Code và Antigravity.',
            items: [
                {
                    title: 'Quy trình 6 bước chuẩn mực',
                    description: 'Từ bước nắm bắt yêu cầu cho đến theo dõi tiến độ code. Một quy trình chặt chẽ đảm bảo không bỏ sót bất cứ edge case nào.',
                },
                {
                    title: 'Tài liệu sống (Living Documentation)',
                    description: 'Mỗi bản spec không chỉ là một task mà còn trở thành tài liệu dự án vĩnh viễn. Cực kỳ hữu ích cho việc bàn giao và làm việc nhóm.',
                },
                {
                    title: 'Tự động hóa hoàn toàn tài liệu dự án',
                    description: 'Chỉ với lệnh /docs init và /docs update, mọi thứ từ AGENTS.md, CLAUDE.md cho đến 7+ loại tài liệu dự án khác đều được tạo tự động.',
                },
                {
                    title: 'Triển khai có AI đồng hành',
                    description: 'Phối hợp nhịp nhàng cùng Claude Code và Antigravity, hướng dẫn bạn từng bước qua các gợi ý thông minh và hệ thống kiểm tra chéo.',
                },
            ],
        },
        quickStart: {
            heading: 'Sẵn sàng chỉ sau vài giây',
            subheading: 'Cài đặt CafeKit Spec và trải nghiệm ngay quy trình spec-driven đầu tiên của bạn',
            viewGuide: 'Xem hướng dẫn bắt đầu nhanh đầy đủ',
            copied: 'Đã copy!',
            copy: 'Copy',
            comments: [
                '# 1. Cài đặt CafeKit Spec',
                '# 2. Khởi tạo tài liệu dự án (tuỳ chọn nhưng rất khuyến khích)',
                '# 3. Bắt đầu xây dựng tính năng thông qua spec workflow',
                '# 4. Cập nhật lại tài liệu khi dự án có sự thay đổi',
            ],
        },
    },
    ja: {
        hero: {
            badge: 'AIコーディングアシスタントのための仕様駆動開発',
            subtitle: 'Claude CodeとAntigravityを活用した、機能開発のための6フェーズ構造化ワークフロー。要件定義から実装まで、全工程でクリアなドキュメントを残しながら進められます。',
            readDocs: 'ドキュメントを読む',
            copied: 'コピーしました！',
            copy: 'コピー',
        },
        features: {
            heading: '確信を持って機能を開発する',
            subheading: 'CafeKit Specは、Claude CodeとAntigravityを用いた仕様駆動開発（Spec-Driven Development）の完全なワークフローを提供します。',
            items: [
                {
                    title: '6ステップの構造化プロセス',
                    description: '要件の洗い出しから実装のトラッキングまで。抜け漏れ（エッジケース）を確実になくすための体系的なプロセスです。',
                },
                {
                    title: '生きたドキュメント（Living Docs）',
                    description: 'Specを作成するたびに、それが「プロジェクトと共に生き続けるドキュメント」になります。チーム開発や保守作業に最適です。',
                },
                {
                    title: 'ドキュメント生成の完全自動化',
                    description: '/docs init や /docs update コマンドで、プロジェクトドキュメントを自動生成・最新化。AGENTS.mdやCLAUDE.mdを含む多彩なドキュメントを一括作成します。',
                },
                {
                    title: 'AI主導の実装アプローチ',
                    description: 'Claude CodeやAntigravityと密接に連携。スマートな提案と各フェーズでの検証（テスト・レビュー）を通じて、開発を強力にガイドします。',
                },
            ],
        },
        quickStart: {
            heading: 'たった数秒でセットアップ完了',
            subheading: 'CafeKit Specをインストールして、AIアシスタントと共に最初の仕様駆動ワークフローを体験しましょう',
            viewGuide: 'クイックスタートガイドを詳しく見る',
            copied: 'コピーしました！',
            copy: 'コピー',
            comments: [
                '# 1. CafeKit Spec をインストール',
                '# 2. プロジェクトドキュメントを初期化（任意ですが強く推奨します）',
                '# 3. specワークフローを使って機能開発をスタート',
                '# 4. プロジェクトに変更があったらドキュメントを最新化',
            ],
        },
    },
};

export function getLandingTranslations(locale: Locale): LandingTranslations {
    return translations[locale] ?? translations.en;
}
