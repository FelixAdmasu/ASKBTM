'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Tag, 
  Calendar, 
  User, 
  Copy, 
  Check, 
  ArrowRight, 
  BookOpen, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface Story {
  id: string;
  title: string;
  category: 'Education' | 'Nutrition' | 'Community' | 'Volunteering';
  date: string;
  author: string;
  summary: string;
  content: string;
  img: string;
}

const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Transforming Lives Through Education: ASKBTM’s Literacy Program Reaches 500 Children',
    category: 'Education',
    date: 'Oct 18, 2026',
    author: 'Editorial Team',
    summary: 'Our foundational literacy and numeracy classrooms have expanded, opening doors for hundreds of enthusiastic learners.',
    content: `At ASKBTM, we firmly believe that quality education is the bedrock of lifelong human dignity. Over the past six months, our dedicated team of teachers, volunteer tutors, and community leaders has worked tirelessly to build an immersive, culturally grounded learning space for vulnerable and orphaned children in Tigray.

Thanks to our international and local donors, we recently distributed comprehensive educational kits—complete with notebooks, pencils, grade-appropriate readers, and backpacks—to over 500 eager children. Many of these young students had missed extended periods of schooling due to displacement and economic hardship.

Beyond core literacy and numeracy, our center offers after-school creative art sessions, structured play therapy, and nutritious hot lunches to ensure that no child studies on an empty stomach. The measurable transformation has been profound: reading proficiency among participating first and second-grade cohorts increased by 64% in our latest quarterly evaluation.

We extend our deepest gratitude to every supporter whose generosity makes these classrooms possible. Together, we are not merely teaching children how to read; we are nurturing the future leaders, teachers, and changemakers of our society.`,
    img: '/assets/img/destination-img-1.png',
  },
  {
    id: 'story-2',
    title: 'Volunteer Spotlight: Meet the Dedicated Teaching Assistants Supporting Our Classrooms',
    category: 'Volunteering',
    date: 'Oct 10, 2026',
    author: 'Community Outreach',
    summary: 'Our passionate volunteers bring over 5,000 collective hours of mentorship, tutoring, and compassionate guidance to our classrooms.',
    content: `Volunteers are the vibrant lifeblood of ASKBTM. Every morning, our learning halls are filled with the energetic voices of dedicated local university students, retired educators, and community mentors who donate their time and talents to uplift our students.

This month, we celebrate our cohort of twenty volunteer teaching assistants who have logged over 5,000 hours of direct classroom support this year. From leading small reading groups to assisting with math games and lesson preparations, their presence creates a warm, attentive environment where every child receives personalized encouragement.

"Volunteering here is transformative," shares Priya, a university student and volunteer tutor. "Seeing a shy child slowly gain confidence, write their name for the first time, and break into a beaming smile is the greatest reward imaginable."

ASKBTM is continually welcoming new local and remote volunteers. Whether you can commit several hours a week or contribute specialized expertise in healthcare, vocational arts, or organizational administration, your skills can create a profound difference in a child's educational journey.`,
    img: '/assets/img/volunteer.svg',
  },
  {
    id: 'story-3',
    title: 'Nourishing the Future: Expanding Daily Meal Programs for At-Risk Youth',
    category: 'Nutrition',
    date: 'Sep 28, 2026',
    author: 'Field Nutritionist',
    summary: 'How our community kitchen prepares and delivers 5,000+ warm, protein-rich lunches every month to combat childhood malnutrition.',
    content: `Physical wellness and educational achievement are inextricably connected. In communities affected by food scarcity, children cannot be expected to concentrate on arithmetic or grammar while enduring the physical pangs of hunger.

Through our expanded Nutrition Initiative, ASKBTM operates a bustling central kitchen that prepares over 5,000 hot, balanced meals every single month. Each daily lunch menu is formulated in consultation with regional nutritionists to deliver essential protein, healthy legumes, fresh local vegetables, and vital micronutrients.

For many participating students, the meal provided at our center represents their primary source of dependable nourishment each day. Teachers report immediate improvements in energy levels, active class participation, and consistent daily attendance.

With continued donor backing, we are currently purchasing high-capacity cooking equipment and securing agricultural supply partnerships with local farming cooperatives, lowering procurement costs while supporting regional growers.`,
    img: '/assets/img/destination-img-3.png',
  },
  {
    id: 'story-4',
    title: 'Women’s Vocational Independence: Celebrating the First Graduate Cohort of Basket Weavers & Tailors',
    category: 'Community',
    date: 'Sep 12, 2026',
    author: 'Vocational Coordinator',
    summary: 'Thirty widowed and single mothers graduate from our craft and small business training program, ready to launch independent micro-enterprises.',
    content: `True community resilience is unlocked when women are economically empowered. This past weekend, ASKBTM held an emotional graduation ceremony celebrating thirty brave mothers who completed our intensive six-month vocational arts and textile craftsmanship program.

Throughout the course, students learned traditional Tigray textile weaving, contemporary garment tailoring, and basic financial literacy, including budgeting and bookkeeping. Each graduate was presented with an essential starter micro-grant and basic sewing machinery to launch home-based production.

"Before this program, I struggled to afford daily bread for my three children," explained Almaz, a graduate of the tailoring cohort. "Today, I take custom clothing orders from local shops. I can pay for my children's school supplies with dignity and pride."

By providing mothers with durable livelihood skills, ASKBTM creates a protective financial buffer that shields children from poverty-induced dropouts.`,
    img: '/assets/img/graduation.svg',
  },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStoryModal, setActiveStoryModal] = useState<Story | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Education', 'Nutrition', 'Community', 'Volunteering'];

  const filteredStories = INITIAL_STORIES.filter((story) => {
    const matchesCat = selectedCategory === 'All' || story.category === selectedCategory;
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyStory = (story: Story) => {
    navigator.clipboard.writeText(`${story.title}\n\n${story.content}`);
    setCopiedId(story.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold px-3 py-1 bg-amber-200 rounded-full border-2 border-stone-900 inline-block mb-3 shadow-[2px_2px_0px_0px_#1c1917]">
          Field Dispatches &amp; Updates
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
          Stories of Hope &amp; Transformation
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base font-medium">
          Read authentic, verified reports on how your gifts are changing lives in Tigray every day.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#fffdfa] p-4 rounded-xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1c1917] mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg border-2 border-stone-900 text-xs font-black uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-300 shadow-[2px_2px_0px_0px_#1c1917]'
                  : 'bg-white hover:bg-stone-100 text-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border-2 border-stone-900 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStories.map((story) => (
          <article
            key={story.id}
            className="bg-[#fffdfa] rounded-2xl border-2 border-stone-900 shadow-[6px_6px_0px_0px_#1c1917] overflow-hidden flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#1c1917] transition-all"
          >
            <div>
              {/* Image banner */}
              <div className="h-52 bg-stone-100 border-b-2 border-stone-900 relative overflow-hidden">
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/img/destination-img-1.png';
                  }}
                />
                <div className="absolute top-3 left-3 bg-stone-900 text-amber-300 font-mono text-[10px] uppercase font-black px-2.5 py-1 rounded border border-stone-700 shadow">
                  {story.category}
                </div>
              </div>

              {/* Story Header */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs font-mono text-stone-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {story.date}
                  </span>
                  <span>•</span>
                  <span>{story.author}</span>
                </div>

                <h2 className="text-xl font-black text-stone-900 leading-snug">
                  {story.title}
                </h2>

                <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed font-medium">
                  {story.summary}
                </p>
              </div>
            </div>

            {/* Story Card Footer */}
            <div className="p-6 pt-0 border-t border-stone-200 mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStoryModal(story)}
                className="bg-amber-300 hover:bg-amber-200 text-stone-950 font-black text-xs uppercase px-4 py-2 rounded-lg border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917] flex items-center gap-1.5"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleCopyStory(story)}
                className="text-stone-600 hover:text-stone-950 text-xs font-bold flex items-center gap-1"
              >
                {copiedId === story.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Reading Modal */}
      {activeStoryModal && (
        <div className="fixed inset-0 bg-stone-950/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fffdfa] max-w-2xl w-full max-h-[85vh] overflow-y-auto border-2 border-stone-900 rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1c1917] space-y-4">
            <div className="flex justify-between items-start gap-4 border-b-2 border-stone-900 pb-4">
              <div>
                <span className="text-xs font-mono font-bold bg-amber-300 text-stone-950 px-2 py-0.5 rounded border border-stone-900">
                  {activeStoryModal.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">
                  {activeStoryModal.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono text-stone-500 mt-1">
                  <span>{activeStoryModal.date}</span>
                  <span>•</span>
                  <span>By {activeStoryModal.author}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStoryModal(null)}
                className="w-8 h-8 rounded-lg border-2 border-stone-900 bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="prose prose-stone text-stone-800 text-sm leading-relaxed space-y-4 pt-2">
              {activeStoryModal.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="border-t-2 border-stone-900 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <Link
                href="/donate"
                className="w-full sm:w-auto text-center bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-xs uppercase px-5 py-2.5 rounded-lg border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1c1917]"
              >
                Support This Cause &rarr;
              </Link>
              <button
                type="button"
                onClick={() => setActiveStoryModal(null)}
                className="w-full sm:w-auto px-4 py-2 border-2 border-stone-900 rounded-lg text-xs font-bold bg-stone-100 hover:bg-stone-200"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
