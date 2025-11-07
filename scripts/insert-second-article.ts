// Script to insert second blog post (Zink article) into Supabase
// Run with: npx tsx scripts/insert-second-article.ts
// Make sure your .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env file
const envFile = resolve(process.cwd(), '.env');
const envVars: Record<string, string> = {};

try {
  const envContent = readFileSync(envFile, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#][^=]*)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      envVars[key] = value;
    }
  });
} catch (error) {
  console.error('Could not read .env file, using process.env');
  if (error instanceof Error) {
    console.error(error.message);
  }
}

const supabaseUrl = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const blogPost = {
  title: 'Zink in der wechselhaften Jahreszeit: Wie das Spurenelement dein Immunsystem unterstützt',
  slug: 'zink-immunsystem-herbst',
  excerpt: 'Warum Zink in der Erkältungszeit so wichtig ist: Erfahre, wie du deinen Körper natürlich unterstützt und wann eine Zink-Supplementierung sinnvoll sein kann.',
  content: `<h1>Zink in der wechselhaften Jahreszeit: Wie das Spurenelement dein Immunsystem unterstützt</h1>

<p><strong>Der Wechsel der Jahreszeit fordert dein Immunsystem. Schnupfen, Müdigkeit, wechselhaftes Wetter – der Herbst stellt unseren Körper jedes Jahr aufs Neue auf die Probe.</strong></p>

<h2>Der Wechsel der Jahreszeit fordert dein Immunsystem</h2>

<p>Schnupfen, Müdigkeit, wechselhaftes Wetter – der Herbst stellt unseren Körper jedes Jahr aufs Neue auf die Probe. Unser Immunsystem muss sich an kühlere Temperaturen, trockene Heizungsluft und weniger Sonnenlicht anpassen. Genau jetzt ist eine ausgewogene Mikronährstoffversorgung besonders wichtig – und Zink spielt dabei eine zentrale Rolle.</p>

<p>Zink ist ein essenzielles Spurenelement, das unser Körper nicht selbst herstellen kann. Es ist an über 300 enzymatischen Prozessen beteiligt – vor allem an denen, die unser Immunsystem, unsere Zellregeneration und Wundheilung betreffen.</p>

<h2>Warum Zink so wichtig ist</h2>

<p>Zink trägt dazu bei, dass deine Immunzellen effektiv arbeiten. Es unterstützt:</p>

<ul>
<li>die Bildung von Abwehrzellen</li>
<li>die Regulation von Entzündungsreaktionen</li>
<li>die Heilung von Schleimhäuten und Haut</li>
</ul>

<p>Fehlt Zink, reagiert das Immunsystem träge – Infekte können sich leichter festsetzen. Besonders in der Erkältungssaison ist eine ausreichende Zinkversorgung daher entscheidend.</p>

<h2>Natürliche Zinkquellen in deiner Ernährung</h2>

<p>Viele Menschen können ihren Zinkbedarf gut über die Ernährung decken. Zinkreiche Lebensmittel sind zum Beispiel:</p>

<ul>
<li>Kürbiskerne, Haferflocken, Linsen</li>
<li>Rindfleisch, Geflügel, Eier</li>
<li>Vollkornprodukte und Hülsenfrüchte</li>
<li>Nüsse (v. a. Cashews)</li>
</ul>

<p><em>Tipp:</em> Pflanzliche Zinkquellen enthalten oft Phytate, die die Aufnahme hemmen können. Einweichen oder Keimen verbessert die Verfügbarkeit deutlich.</p>

<h2>Wann eine Zink-Supplementierung sinnvoll sein kann</h2>

<p>Eine ergänzende Einnahme kann phasenweise hilfreich sein – z. B. in stressigen Zeiten, bei einseitiger Ernährung oder erhöhter Infektanfälligkeit. Auch Sportler:innen oder Menschen mit chronischem Stress verbrauchen mehr Zink, weil Stoffwechsel und Zellaktivität gesteigert sind.</p>

<p><strong>Achte jedoch darauf, nicht dauerhaft hohe Dosen ohne ärztliche Rücksprache einzunehmen.</strong> Eine Überdosierung kann die Aufnahme anderer Mineralstoffe (wie Kupfer) beeinträchtigen.</p>

<h3>Empfohlene Tageszufuhr laut D-A-CH-Referenzwerten:</h3>

<ul>
<li>Frauen: 7–10 mg</li>
<li>Männer: 11–16 mg</li>
</ul>

<p>Je nach Ernährungstyp (z. B. vegetarisch) kann der Bedarf leicht höher liegen.</p>

<h2>Zink & Erkältungen – was Studien sagen</h2>

<p>Mehrere Studien zeigen: Eine kurzfristige Zinkergänzung kann die Dauer und Schwere einer Erkältung leicht reduzieren – vor allem, wenn sie frühzeitig eingenommen wird. Zink blockiert bestimmte Virusvermehrungsmechanismen in den Schleimhäuten.</p>

<p>Aber: Es ersetzt keine ärztliche Behandlung. Zink ist ein unterstützender Baustein, kein Wundermittel.</p>

<h2>Ganzheitlich denken: Zink ist Teil eines größeren Systems</h2>

<p>Zink wirkt am besten im Zusammenspiel mit anderen Nährstoffen – etwa Vitamin C, D, Eisen und Selen. Eine ganzheitliche Ernährungsweise, Bewegung an der frischen Luft und ausreichend Schlaf bleiben die Basis für starke Abwehrkräfte.</p>

<p>Präventive Routinen zu entwickeln – von Ernährung über Bewegung bis Achtsamkeit – stärkt Körper und Geist nachhaltig.</p>

<h2>Fazit: Kleine Ergänzung, großer Effekt</h2>

<p>Zink ist ein kleines, aber mächtiges Spurenelement. Gerade in der wechselhaften Jahreszeit kann eine bewusste Zinkzufuhr helfen, dein Immunsystem zu stabilisieren und deine Energie zu bewahren.</p>

<p><strong>Wichtig ist die richtige Balance:</strong> Achte auf zinkreiche Ernährung, höre auf deinen Körper – und wenn du dich öfter abgeschlagen fühlst, kann ein kurzer Check beim Arzt oder einer Ernährungsberatung sinnvoll sein.</p>

<h3>ELU Tipp</h3>

<p>Mit <strong>ELU</strong> findest du Expert:innen und präventive Gesundheitsangebote in deiner Nähe – von Ernährungsberatung bis Stresscoaching. Finde deinen passenden Gesundheitscoach – für ein starkes Immunsystem und mehr Wohlbefinden im Alltag.</p>

<h3>Weiterlesen</h3>

<ul>
<li><a href="/blog/immunsystem-staerken">Wie du dein Immunsystem natürlich stärkst</a></li>
<li><a href="/blog/ernaehrung-herbst">Gesunde Ernährung im Herbst – 6 einfache Routinen</a></li>
</ul>

<h3>Quellen</h3>

<ul>
<li>Deutsche Gesellschaft für Ernährung (DGE, 2024): Referenzwerte für die Nährstoffzufuhr</li>
<li>Cochrane Review (2023): Zinc for the common cold</li>
<li>Österreichische Gesellschaft für Ernährung (ÖGE, 2024): Mikronährstoffe in der Prävention</li>
</ul>`,
  category: 'Ernährung & Stoffwechsel',
  featured_image_url: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop&crop=center',
  image_alt_text: 'Gesunde Ernährung mit Nüssen, Kürbiskernen und anderen zinkreichen Lebensmitteln',
  meta_title: 'Zink im Herbst & Winter – Wie das Spurenelement dein Immunsystem stärkt | ELU App',
  meta_description: 'Warum Zink in der Erkältungszeit so wichtig ist: Erfahre, wie du deinen Körper natürlich unterstützt und wann eine Zink-Supplementierung sinnvoll sein kann.',
  author_name: 'ELU Redaktion – Ernährung & Gesundheit',
  published: true,
  published_at: new Date().toISOString()
};

async function insertBlogPost() {
  console.log('📝 Inserting second blog post...');
  console.log(`Title: ${blogPost.title}`);
  console.log(`Slug: ${blogPost.slug}\n`);

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(blogPost)
    .select();

  if (error) {
    console.error('❌ Error inserting blog post:', error);
    
    if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
      console.error('\n💡 Tip: The blog_posts table does not exist yet.');
      console.error('   Please run the migration first: supabase/migrations/20251031104505_create_blog_posts_table.sql');
    } else if (error.code === '23505') {
      console.error('\n💡 Tip: A blog post with this slug already exists.');
      console.error('   Try changing the slug or delete the existing post first.');
    }
    
    process.exit(1);
  }

  console.log('✅ Blog post inserted successfully!');
  console.log(`ID: ${data[0].id}`);
  console.log(`\n📖 View it at: http://localhost:5173/blog`);
  console.log(`   Navigate to the blog page to see your article.`);
}

insertBlogPost();

