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
            badge: 'Claude Code-first runtime for spec-driven delivery',
            subtitle: 'Build from approved specs, execute one verified task at a time, and keep project docs aligned. Claude Code is available now. Antigravity and Cursor are coming soon.',
            readDocs: 'Read Documentation',
            copied: 'Copied!',
            copy: 'Copy',
        },
        features: {
            heading: 'Build features with confidence',
            subheading: 'CafeKit turns feature work into a stateful runtime with specs, task packets, quality gates, and incremental docs sync.',
            items: [
                {
                    title: 'Validated Specs',
                    description: 'Start with structured spec artifacts, explicit contracts, and a validation step before coding begins.',
                },
                {
                    title: 'Task Registry State',
                    description: 'Track pending, in-progress, blocked, and done work in spec.json instead of relying on markdown alone.',
                },
                {
                    title: 'Evidence-Based Gates',
                    description: 'Implementation is not done until build health, test signals, review, and task evidence all agree.',
                },
                {
                    title: 'Incremental Docs Sync',
                    description: 'Run lightweight docs checkpoints after verified tasks instead of waiting for a giant docs pass at the end.',
                },
            ],
        },
        quickStart: {
            heading: 'Get Started in Seconds',
            subheading: 'Install CafeKit, create a spec, validate it, implement one task, and verify it with the current hapo workflow.',
            viewGuide: 'View full quickstart guide',
            copied: 'Copied!',
            copy: 'Copy',
            comments: [
                '# 1. Install CafeKit',
                '# 2. Create and validate a feature spec',
                '# 3. Implement one task packet at a time',
                '# 4. Verify, review, and sync docs',
            ],
        },
    },
    vi: {
        hero: {
            badge: 'Runtime Claude Code-first cho quy trình spec-driven',
            subtitle: 'Xây dựng từ spec đã được duyệt, triển khai từng task đã verify, và giữ docs luôn đồng bộ. Claude Code dùng được ngay. Antigravity và Cursor sẽ có sau.',
            readDocs: 'Đọc tài liệu hướng dẫn',
            copied: 'Đã copy!',
            copy: 'Copy',
        },
        features: {
            heading: 'Phát triển tính năng với sự tự tin tuyệt đối',
            subheading: 'CafeKit biến feature workflow thành một runtime có state rõ ràng: spec, task packet, quality gate và docs sync theo từng task.',
            items: [
                {
                    title: 'Spec được validate',
                    description: 'Bắt đầu từ spec có cấu trúc, contract rõ ràng và có bước validate trước khi cho phép code.',
                },
                {
                    title: 'Task Registry rõ trạng thái',
                    description: 'Theo dõi pending, in_progress, blocked và done trong spec.json thay vì chỉ dựa vào checkbox markdown.',
                },
                {
                    title: 'Quality Gate theo bằng chứng',
                    description: 'Task không được coi là xong nếu build, test, review và evidence chưa cùng xác nhận.',
                },
                {
                    title: 'Docs Sync tăng dần',
                    description: 'Chạy docs checkpoint nhẹ sau mỗi task đã verify thay vì dồn một đợt update tài liệu lớn ở cuối.',
                },
            ],
        },
        quickStart: {
            heading: 'Sẵn sàng chỉ sau vài giây',
            subheading: 'Cài CafeKit, tạo spec, validate spec, triển khai một task và verify bằng workflow hapo hiện tại.',
            viewGuide: 'Xem hướng dẫn bắt đầu nhanh đầy đủ',
            copied: 'Đã copy!',
            copy: 'Copy',
            comments: [
                '# 1. Cài đặt CafeKit',
                '# 2. Tạo và validate spec cho feature',
                '# 3. Triển khai từng task packet',
                '# 4. Verify, review, rồi sync docs',
            ],
        },
    },
    ja: {
        hero: {
            badge: 'Claude Code-first の spec-driven runtime',
            subtitle: '承認済み spec から始め、検証済みタスクを1つずつ実装し、docs を同期させます。Claude Code は今すぐ利用可能で、Antigravity と Cursor は coming soon です。',
            readDocs: 'ドキュメントを読む',
            copied: 'コピーしました！',
            copy: 'コピー',
        },
        features: {
            heading: '確信を持って機能を開発する',
            subheading: 'CafeKit は spec、task packet、quality gate、docs sync を備えた stateful runtime として機能します。',
            items: [
                {
                    title: '検証済み Spec',
                    description: '構造化された spec と明示的な contract、そして実装前の validation を前提に進みます。',
                },
                {
                    title: 'Task Registry',
                    description: 'pending、in_progress、blocked、done を spec.json で追跡し、markdown だけに依存しません。',
                },
                {
                    title: '証拠ベースの Gate',
                    description: 'build、test、review、evidence が揃わなければ task は完了とみなしません。',
                },
                {
                    title: '段階的な Docs Sync',
                    description: '大きな一括更新ではなく、検証済み task ごとに軽量な docs checkpoint を実行します。',
                },
            ],
        },
        quickStart: {
            heading: 'たった数秒でセットアップ完了',
            subheading: 'CafeKit をインストールし、spec を作成・検証し、1つの task を実装して現在の hapo workflow で検証します。',
            viewGuide: 'クイックスタートガイドを詳しく見る',
            copied: 'コピーしました！',
            copy: 'コピー',
            comments: [
                '# 1. CafeKit をインストール',
                '# 2. feature spec を作成して validate',
                '# 3. task packet を1つずつ実装',
                '# 4. verify と review の後に docs を同期',
            ],
        },
    },
};

export function getLandingTranslations(locale: Locale): LandingTranslations {
    return translations[locale] ?? translations.en;
}
