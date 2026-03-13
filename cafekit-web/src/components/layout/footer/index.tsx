
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border mt-auto bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Product */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm tracking-tight">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/getting-started/installation" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Installation
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/guides/spec-workflow" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Spec Workflow
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Examples
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm tracking-tight">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/docs/getting-started/quickstart" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Quick Start
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <a href="https://github.com/haposoft/cafekit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/haposoft/cafekit/releases" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Changelog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm tracking-tight">Community</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="https://github.com/haposoft/cafekit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/haposoft/cafekit/issues" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Issues
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/haposoft/cafekit/discussions" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Discussions
                                </a>
                            </li>
                            <li>
                                <Link href="/docs/guides/contributing" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Contributing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm tracking-tight">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="https://github.com/haposoft/cafekit/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    License
                                </a>
                            </li>
                            <li>
                                <Link href="#1" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#1" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} CafeKit by{" "}
                        <a
                            href="https://github.com/haposoft"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground hover:underline">
                            @haposoft
                        </a>. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/haposoft/cafekit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
