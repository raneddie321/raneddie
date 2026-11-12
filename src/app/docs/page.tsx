import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Film,
  Gamepad2,
  Globe2,
  HardDrive,
  LifeBuoy,
  Lock,
  Mail,
  Pizza,
  Plane,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Wrench,
  Accessibility,
  FileText,
  Clapperboard,
  Rocket,
} from 'lucide-react';
import { getContent } from '@/lib/content-store';
import { allDocs, sections } from '@/lib/docs';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { DocsSearch } from '@/components/docs-nav';

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const { docsHome } = await getContent();
  return { title: 'Docs', description: docsHome.subtitle, alternates: { canonical: '/docs' } };
}

const ICONS: Record<string, React.ReactNode> = {
  'Get started': <Rocket size={22} />,
  'RanEddie ID': <ShieldCheck size={22} />,
  'Fizz Browser': <Globe2 size={22} />,
  'Snake Brawl': <Gamepad2 size={22} />,
  Support: <LifeBuoy size={22} />,
  'BlueBear Media': <Film size={22} />,
  Lu: <Smartphone size={22} />,
  'RanEddie Part': <Wrench size={22} />,
  SkyPear: <Pizza size={22} />,
  workIT: <FileText size={22} />,
  EditTime: <Clapperboard size={22} />,
  'RanEddie Games': <Gamepad2 size={22} />,
  Gimbly: <Plane size={22} />,
  Cloudly: <Cloud size={22} />,
  'RanEddie Invest': <TrendingUp size={22} />,
  rEmail: <Mail size={22} />,
  baseline: <Database size={22} />,
  'Protector Y': <ShieldCheck size={22} />,
  'AI at RanEddie': <Brain size={22} />,
  Privacy: <Lock size={22} />,
  Security: <ShieldCheck size={22} />,
  'Data & storage': <HardDrive size={22} />,
  'Billing & subscriptions': <CreditCard size={22} />,
  Families: <Users size={22} />,
  Accessibility: <Accessibility size={22} />,
  Developers: <Code2 size={22} />,
};

const TOPIC_GROUP = new Set(['AI at RanEddie', 'RanEddie ID', 'Privacy', 'Security', 'Data & storage', 'Billing & subscriptions', 'Families', 'Accessibility', 'Developers', 'Get started', 'Support']);

export default async function DocsHome() {
  const content = await getContent();
  const docs = allDocs(content);
  const all = sections(docs);
  const topics = all.filter((s) => TOPIC_GROUP.has(s.name));
  const products = all.filter((s) => !TOPIC_GROUP.has(s.name));

  const Card = ({ s }: { s: (typeof all)[number] }) => (
    <article className="docs-section-card">
      <header>
        <i>{ICONS[s.name] ?? <BookOpen size={22} />}</i>
        <div>
          <h2>{s.name}</h2>
          <small>{s.items.length} articles</small>
        </div>
      </header>
      <ul>
        {s.items.slice(0, 5).map((d) => (
          <li key={d.slug}>
            <a href={`/docs/${d.slug}`}>
              <b>{d.title}</b>
              <small>{d.description}</small>
            </a>
          </li>
        ))}
      </ul>
      <a className="docs-section-more" href={`/docs/topics/${s.slug}`}>
        All {s.items.length} articles <ArrowRight size={15} />
      </a>
    </article>
  );

  return (
    <main className="site docs-site" dir="ltr">
      <SiteHeader site={content.site} />
      <section className="docs-hero">
        <div>
          <span className="kicker">DOCUMENTATION</span>
          <h1>{content.docsHome.title}</h1>
          <p>{content.docsHome.subtitle}</p>
          <DocsSearch big />
          <div className="docs-stats">
            <span><b>{docs.length}</b> articles</span>
            <span><b>{products.length}</b> products</span>
            <span><b>{topics.length}</b> topics</span>
          </div>
        </div>
      </section>
      <div className="docs-index">
        <h2 className="docs-index-title">Topics</h2>
        <section className="docs-sections">
          {topics.map((s) => <Card key={s.slug} s={s} />)}
        </section>
        <h2 className="docs-index-title">Products</h2>
        <section className="docs-sections">
          {products.map((s) => <Card key={s.slug} s={s} />)}
        </section>
      </div>
      <SiteFooter content={{ ...content, docs: [] }} />
    </main>
  );
}
