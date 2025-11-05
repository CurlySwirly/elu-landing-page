// Script to insert blog post into Supabase
// Run with: npx tsx scripts/insert-blog-post.ts
// Make sure your .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env file (simple approach)
const envFile = resolve(process.cwd(), '.env');
let envVars: Record<string, string> = {};

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
  content: `<h1>Stress abbauen im Alltag: 5 wirksame Mini-Pausen, die du sofort ausprobieren kannst</h1>

<p><strong>Dauerstress im Alltag? Entdecke 5 einfache, wissenschaftlich fundierte Mini-Pausen, um Stress abzubauen – direkt umsetzbar mit der ELU App.</strong></p>

<h2>🧠 Warum Stress heute unser ständiger Begleiter ist</h2>
<p>E-Mails, Termine, Benachrichtigungen – kaum ein Tag vergeht ohne das Gefühl, permanent „an" zu sein. Stress an sich ist nichts Schlechtes – er hilft uns, kurzfristig leistungsfähig zu sein. Doch wenn der Körper keine Erholungsphasen bekommt, bleibt das Nervensystem dauerhaft im Alarmmodus. Das Resultat: Erschöpfung, Schlafprobleme, Anspannung, Gereiztheit.</p>
<p>Studien zeigen, dass <strong>kurze Pausen über den Tag verteilt</strong> effektiver zur Regeneration beitragen als lange Erholungsphasen nur am Wochenende. Genau hier setzt die <strong>ELU App</strong> an: Sie hilft dir, regelmäßige Mini-Auszeiten in deinen Alltag einzubauen – egal, wie voll dein Kalender ist.</p>

<h2>🌿 1. Die 60-Sekunden-Atempause</h2>
<p>Wenn du spürst, dass dein Kopf überläuft, leg für eine Minute alles beiseite. <br>👉 Atme <strong>vier Sekunden ein</strong>, <strong>sechs Sekunden aus</strong> – durch die Nase. Diese verlängerte Ausatmung aktiviert den <strong>Vagusnerv</strong>, der dein Nervensystem beruhigt.</p>
<p><em>Tipp:</em> In der ELU App findest du geführte Atemübungen mit visueller Unterstützung – perfekt für kurze Pausen zwischen zwei Meetings.</p>

<h2>🪑 2. Mini-Bewegung am Arbeitsplatz</h2>
<p>Bewegung löst körperliche Anspannung, die sich bei Stress automatisch aufbaut. Stell dich hin, roll die Schultern, öffne die Brust und atme tief ein. Schon zwei Minuten bewusste Bewegung senken den Stresshormonspiegel messbar.</p>
<p><em>In der ELU App findest du kurze „Active Breaks", die du direkt am Schreibtisch machen kannst – ohne Geräte, ohne Sportklamotten.</em></p>

<h2>🎧 3. Mikro-Meditation: 2 Minuten Bewusstheit</h2>
<p>Meditation muss nicht 20 Minuten dauern. Schließe kurz die Augen, richte deine Aufmerksamkeit auf Geräusche in deiner Umgebung. Kein Zwang, kein Ziel – nur Wahrnehmung.</p>
<p>Diese Mini-Momente helfen, den Geist zu resetten und den Fokus zurückzuholen. Die ELU App bietet dir kurze, alltagstaugliche Meditationen für verschiedene Situationen – Stress, Nervosität oder einfach, um runterzukommen.</p>

<h2>☕ 4. Achtsames Kaffeetrinken</h2>
<p>Die nächste Tasse Kaffee ist keine Pflichtpause – sondern eine Chance zur Ruhe. Nimm dir 2 Minuten, um wirklich zu riechen, zu schmecken, zu spüren. So schaltest du dein Stress-System kurz aus und stärkst gleichzeitig deine Wahrnehmung für den Moment.</p>
<p><em>Probiere mal, währenddessen dein Handy wegzulegen – dein Nervensystem wird es dir danken.</em></p>

<h2>💌 5. Der 3-Satz-Abschluss am Abend</h2>
<p>Bevor du ins Bett gehst, schreibe drei Dinge auf, für die du heute dankbar bist. Das ist kein esoterischer Trick, sondern neuropsychologisch wirksam: Dankbarkeit reduziert die Aktivität im Stresszentrum des Gehirns und verbessert nachweislich den Schlaf.</p>
<p><em>In der ELU App findest du eine geführte Abendroutine, die dich Schritt für Schritt in einen ruhigen Schlaf begleitet.</em></p>

<h2>🌸 Fazit: Kleine Pausen, große Wirkung</h2>
<p>Du musst dein Leben nicht umkrempeln, um gelassener zu werden. Oft reicht es, <strong>mehrmals täglich für 1–3 Minuten</strong> bewusst zu pausieren. Dein Nervensystem kann nur dann regenerieren, wenn du ihm regelmäßig kurze Momente der Ruhe gibst.</p>
<p>💚 Die <strong>ELU App</strong> hilft dir, genau das in deinen Alltag zu integrieren – mit wissenschaftlich fundierten Übungen für Atem, Bewegung, Achtsamkeit und Schlaf.</p>

<h3>👉 <a href="#">Teste jetzt die ELU App</a></h3>
<p>Finde heraus, welche Mini-Pausen dir guttun – kostenlos in der ELU App.</p>

<h3>🔗 Weiterlesen auf dem ELU Blog</h3>
<ul>
<li><a href="/blog/koerper-ruhesignale">So erkennst du, wann dein Körper wirklich Ruhe braucht</a></li>
<li><a href="/blog/mikrogewohnheiten">Wie kleine Routinen dein Wohlbefinden langfristig stärken</a></li>
</ul>

<h3>📚 Quellen</h3>
<ul>
<li>American Psychological Association (2024): „Short Breaks, Long Impact: Micro Recovery at Work"</li>
<li>DGPPN (2023): „Psychische Gesundheit und Arbeitsbelastung in Deutschland"</li>
<li>Harvard Health Publishing (2024): „The Science of Small Pauses"</li>
</ul>`,
  category: 'Mentale Gesundheit',
  featured_image_url: 'https://elu.app/media/blog/stressabbauen-minipausen.webp',
  image_alt_text: 'Person beim Stressabbau mit Entspannungsübung in moderner Umgebung',
  meta_title: 'Stress abbauen im Alltag – 5 wirksame Mini-Pausen für mehr Ruhe & Fokus | ELU App',
  meta_description: 'Dauerstress im Alltag? Entdecke 5 einfache, wissenschaftlich fundierte Mini-Pausen, um Stress abzubauen – direkt umsetzbar mit der ELU App.',
  author_name: 'ELU Redaktion – Psychologie & Gesundheit',
  published: true,
  published_at: new Date().toISOString()
};

async function insertBlogPost() {
  console.log('📝 Inserting blog post...');
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

