'use client';

import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDownIcon, ArrowUpIcon, CornerDownLeftIcon, FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandCollection,
    CommandDialog,
    CommandDialogPopup,
    CommandDialogTrigger,
    CommandEmpty,
    CommandFooter,
    CommandGroup,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandList,
    CommandPanel,
    CommandSeparator,
} from '@/components/ui/command';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { useLocale } from '@/hooks/use-locale';
import { localizeHref } from '@/lib/locale-utils';

interface SearchItem {
    value: string;
    label: string;
    href: string;
    keywords?: string;
}

interface SearchGroup {
    value: string;
    items: SearchItem[];
}

export default function SearchDialog() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const locale = useLocale();
    const searchGroups: SearchGroup[] = [
        {
            value: 'Getting Started',
            items: [
                {
                    label: 'Introduction',
                    value: 'introduction',
                    href: localizeHref(locale, '/docs'),
                    keywords: 'getting started overview what is'
                },
                {
                    label: 'Installation',
                    value: 'installation',
                    href: localizeHref(locale, '/docs/getting-started/installation'),
                    keywords: 'install setup init npm npx runtime bundle'
                },
                {
                    label: 'Quickstart',
                    value: 'quickstart',
                    href: localizeHref(locale, '/docs/getting-started/quickstart'),
                    keywords: 'quickstart create spec develop test review'
                },
            ],
        },
        {
            value: 'Workflows',
            items: [
                {
                    label: '/hapo:specs',
                    value: 'specs',
                    href: localizeHref(locale, '/docs/workflows/specs'),
                    keywords: 'requirements design task packets validate'
                },
                {
                    label: '/hapo:develop',
                    value: 'develop',
                    href: localizeHref(locale, '/docs/workflows/develop'),
                    keywords: 'task packet implementation quality gate evidence'
                },
                {
                    label: '/hapo:test',
                    value: 'test',
                    href: localizeHref(locale, '/docs/workflows/test-review'),
                    keywords: 'verification precheck ui review no tests'
                },
            ],
        },
        {
            value: 'Reference',
            items: [
                {
                    label: 'Commands',
                    value: 'commands',
                    href: localizeHref(locale, '/docs/reference/commands'),
                    keywords: 'commands cheatsheet syntax hapo'
                },
                {
                    label: 'FAQ',
                    value: 'faq',
                    href: localizeHref(locale, '/docs/faq'),
                    keywords: 'faq common questions'
                },
            ],
        },
    ];

    function handleItemClick(item: SearchItem) {
        router.push(item.href);
        setOpen(false);
    }

    useEffect(() => {
        setMounted(true);
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div className="flex items-center gap-2">
                {/* Mobile placeholder */}
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Search"
                    className="md:hidden"
                    disabled
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </Button>
                {/* Desktop placeholder */}
                <Button
                    variant="outline"
                    className="hidden md:flex w-full justify-start text-sm text-muted-foreground font-normal h-9 bg-transparent"
                    disabled
                >
                    <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="flex-1 text-left">Search docs...</span>
                    <KbdGroup className="hidden sm:inline-flex">
                        <Kbd>⌘</Kbd>
                        <Kbd>K</Kbd>
                    </KbdGroup>
                </Button>
            </div>
        );
    }

    return (
        <CommandDialog onOpenChange={setOpen} open={open}>
            {/* Mobile/Tablet - Icon Only */}
            <CommandDialogTrigger
                className="md:hidden"
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Search"
                    />
                }
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </CommandDialogTrigger>

            {/* Desktop - Full Search Input */}
            <CommandDialogTrigger
                className="hidden md:flex bg-transparent"
                render={
                    <Button
                        variant="outline"
                        className="w-full justify-start text-sm text-muted-foreground font-normal h-9"
                    />
                }
            >
                <svg className="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="flex-1 text-left">Search docs...</span>
                <KbdGroup className="hidden sm:inline-flex">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </CommandDialogTrigger>

            <CommandDialogPopup>
                <Command items={searchGroups}>
                    <CommandInput placeholder="Search documentation..." />
                    <CommandPanel>
                        <CommandEmpty>
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <svg className="w-10 h-10 text-muted-foreground/30 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm font-medium text-foreground mb-1">No results found</p>
                                <p className="text-xs text-muted-foreground">Try searching for something else</p>
                            </div>
                        </CommandEmpty>
                        <CommandList>
                            {(group: SearchGroup) => (
                                <Fragment key={group.value}>
                                    <CommandGroup items={group.items}>
                                        <CommandGroupLabel>{group.value}</CommandGroupLabel>
                                        <CommandCollection>
                                            {(item: SearchItem) => (
                                                <CommandItem
                                                    key={item.value}
                                                    onClick={() => handleItemClick(item)}
                                                    value={item.value + ' ' + (item.keywords || '')}
                                                >
                                                    <FileTextIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    <span className="flex-1">{item.label}</span>
                                                    <span className="text-xs text-muted-foreground">{item.href}</span>
                                                </CommandItem>
                                            )}
                                        </CommandCollection>
                                    </CommandGroup>
                                    <CommandSeparator />
                                </Fragment>
                            )}
                        </CommandList>
                    </CommandPanel>
                    <CommandFooter>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <KbdGroup>
                                    <Kbd>
                                        <ArrowUpIcon className="h-3 w-3" />
                                    </Kbd>
                                    <Kbd>
                                        <ArrowDownIcon className="h-3 w-3" />
                                    </Kbd>
                                </KbdGroup>
                                <span className="text-xs text-muted-foreground">Navigate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Kbd>
                                    <CornerDownLeftIcon className="h-3 w-3" />
                                </Kbd>
                                <span className="text-xs text-muted-foreground">Select</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Kbd>Esc</Kbd>
                            <span className="text-xs text-muted-foreground">Close</span>
                        </div>
                    </CommandFooter>
                </Command>
            </CommandDialogPopup>
        </CommandDialog>
    );
}
