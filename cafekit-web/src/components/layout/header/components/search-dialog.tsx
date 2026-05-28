'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CornerDownLeftIcon,
    FileTextIcon,
    SearchIcon,
} from 'lucide-react';
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
import { getDocsSearchGroups, type DocsNavItem } from '@/lib/docs-config';

export default function SearchDialog() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const locale = useLocale();
    const groups = useMemo(() => getDocsSearchGroups(locale), [locale]);

    function handleItemClick(item: DocsNavItem) {
        router.push(item.href);
        setOpen(false);
    }

    useEffect(() => {
        const mountTimer = window.setTimeout(() => setMounted(true), 0);
        const down = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen((value) => !value);
            }
        };

        document.addEventListener('keydown', down);
        return () => {
            window.clearTimeout(mountTimer);
            document.removeEventListener('keydown', down);
        };
    }, []);

    if (!mounted) return <SearchButton disabled />;

    return (
        <CommandDialog onOpenChange={setOpen} open={open}>
            <CommandDialogTrigger className="md:hidden" render={<Button variant="ghost" size="icon" aria-label="Search" />}>
                <SearchIcon className="h-4 w-4" />
            </CommandDialogTrigger>

            <CommandDialogTrigger className="hidden md:flex bg-transparent" render={<Button variant="outline" className="w-full justify-start text-sm text-muted-foreground font-normal h-9" />}>
                <SearchButtonContent />
            </CommandDialogTrigger>

            <CommandDialogPopup>
                <Command items={groups}>
                    <CommandInput placeholder="Search CafeKit docs..." />
                    <CommandPanel>
                        <CommandEmpty>
                            <div className="py-8 text-center">
                                <p className="text-sm font-medium text-foreground">No matching doc found</p>
                                <p className="mt-1 text-xs text-muted-foreground">Try a command name, skill, agent, or platform.</p>
                            </div>
                        </CommandEmpty>
                        <CommandList>
                            {(group) => (
                                <Fragment key={group.title}>
                                    <CommandGroup items={group.items}>
                                        <CommandGroupLabel>{group.title}</CommandGroupLabel>
                                        <CommandCollection>
                                            {(item: DocsNavItem) => (
                                                <CommandItem
                                                    key={item.href}
                                                    onClick={() => handleItemClick(item)}
                                                    value={`${item.title} ${item.description} ${item.keywords}`}
                                                >
                                                    <FileTextIcon className="mr-2 h-4 w-4 text-primary" />
                                                    <span className="flex-1">{item.title}</span>
                                                    <span className="hidden text-xs text-muted-foreground sm:inline">{item.href}</span>
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
                        <FooterHint icon={<><ArrowUpIcon className="h-3 w-3" /><ArrowDownIcon className="h-3 w-3" /></>} label="Navigate" />
                        <FooterHint icon={<CornerDownLeftIcon className="h-3 w-3" />} label="Select" />
                        <FooterHint icon="Esc" label="Close" />
                    </CommandFooter>
                </Command>
            </CommandDialogPopup>
        </CommandDialog>
    );
}

function SearchButton({ disabled = false }: { disabled?: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search" className="md:hidden" disabled={disabled}>
                <SearchIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="hidden md:flex w-full justify-start text-sm text-muted-foreground font-normal h-9 bg-transparent" disabled={disabled}>
                <SearchButtonContent />
            </Button>
        </div>
    );
}

function SearchButtonContent() {
    return (
        <>
            <SearchIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search docs...</span>
            <KbdGroup className="hidden sm:inline-flex">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
            </KbdGroup>
        </>
    );
}

function FooterHint({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <Kbd>{icon}</Kbd>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    );
}
