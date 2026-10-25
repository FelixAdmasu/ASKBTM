'use client';

import React, { useState } from 'react';

interface BlogPost {
  category: string;
  image: string;
  alt: string;
  day: string;
  monthYear: string;
  title: string;
  excerpt: string;
  fullContent: string;
  author: string;
  readTime: string;
}

const BLOGS_DATA: BlogPost[] = [
  {
    category: 'volunteer',
    image: '/assets/img/volunteer.svg',
    alt: 'Volunteers at work',
    day: '05',
    monthYear: 'Nov 2025',
    title: 'Volunteer Spotlight: Meet Our Amazing Team',
    excerpt:
      "Our volunteers are the backbone of ASKBTM. This month, we're highlighting the incredible work of our teaching assistants who have dedicated over 5,000 combined hours to supporting our educational programs...",
    fullContent:
      '<p>At ASKBTM, our volunteers are the heart and soul of our organization. This month, we\'re thrilled to shine a spotlight on our incredible team of teaching assistants who have collectively dedicated over 5,000 hours to supporting our educational initiatives. Their unwavering commitment has been instrumental in helping us create a nurturing learning environment for all our students.</p><br/><p>From assisting with lesson planning to providing one-on-one support to students who need extra help, our volunteers wear many hats. Their diverse backgrounds and skills bring a wealth of knowledge to our classrooms, enriching the learning experience for both students and staff alike. Many of our volunteers are education students or retired teachers, each bringing unique perspectives that enhance our programs.</p><br/><p>"Volunteering with ASKBTM has been one of the most rewarding experiences of my life," shares Priya, a university student who has been with us for two years. "Seeing the children\'s progress and knowing I played a small part in their educational journey is incredibly fulfilling."</p><br/><p>We\'re always looking for passionate individuals to join our volunteer team. Whether you can spare a few hours a week or a few days a month, your time and skills can make a real difference in a child\'s life. Join our growing family of volunteers and be part of something truly transformative.</p>',
    author: 'Michael Chen',
    readTime: '4 min read',
  },
  {
    category: 'events',
    image: '/assets/img/community-event.svg',
    alt: 'Community event',
    day: '28',
    monthYear: 'Oct 2025',
    title: 'Annual Community Day: A Resounding Success',
    excerpt:
      "Over 500 community members joined us for a day of celebration, learning, and connection. From educational workshops to cultural performances, this year's event was our biggest and most impactful yet...",
    fullContent:
      '<p>This year\'s Annual Community Day exceeded all our expectations, bringing together over 500 community members for a day filled with learning, celebration, and connection. The event, held at our main campus, transformed the space into a vibrant hub of activity, with something for everyone to enjoy.</p><br/><p>The day kicked off with an opening ceremony featuring traditional dances performed by our students, followed by a series of educational workshops covering topics from early childhood development to digital literacy for parents. Local artisans set up stalls showcasing their crafts, with a portion of proceeds going towards our scholarship fund.</p><br/><p>"The energy today has been incredible," said Mr. Rajan, a local business owner who attended with his family. "It\'s wonderful to see the community come together like this. My children particularly enjoyed the science fair and the storytelling sessions."</p><br/><p>Highlights included a community art project where attendees contributed to a mural representing our shared values of education and unity, and a panel discussion featuring local educators and community leaders.</p>',
    author: 'David Wilson',
    readTime: '6 min read',
  },
  {
    category: 'education',
    image: '/assets/img/education-tech.svg',
    alt: 'Children using technology',
    day: '15',
    monthYear: 'Oct 2025',
    title: 'Bridging the Digital Divide in Early Education',
    excerpt:
      "Our new digital literacy program is equipping young learners with essential 21st-century skills. Learn how we're integrating technology into our curriculum to prepare children for a digital future...",
    fullContent:
      '<p>In today\'s rapidly evolving digital landscape, access to technology and digital literacy skills are no longer optional—they\'re essential. That\'s why we\'re proud to introduce our groundbreaking Digital Literacy Initiative, designed to bridge the digital divide and ensure all our students are prepared for the future.</p><br/><p>Through a carefully designed curriculum developed in partnership with educational technology experts, we\'re introducing age-appropriate digital skills starting from kindergarten. Our youngest learners begin with basic computer navigation and digital safety, while older students progress to coding fundamentals, digital citizenship, and creative media production.</p><br/><p>"The program has been transformative for our students," says Ms. Anjali, one of our lead teachers. "We\'re seeing increased engagement, improved problem-solving skills, and a new level of confidence when they work with technology."</p>',
    author: 'Dr. Emily Parker',
    readTime: '7 min read',
  },
  {
    category: 'success-stories',
    image: '/assets/img/success-story.svg',
    alt: 'Graduation ceremony',
    day: '30',
    monthYear: 'Sep 2025',
    title: "From Student to Teacher: Amina's Inspiring Journey",
    excerpt:
      'Amina, once a student in our program, has returned as a qualified teacher. Her story is a testament to the transformative power of education and community support...',
    fullContent:
      '<p>Fifteen years ago, a shy six-year-old girl named Amina walked through our doors, her eyes wide with curiosity but her voice barely above a whisper. Today, she stands confidently in front of her own classroom, inspiring the next generation of learners with the same dedication and care that once nurtured her own potential.</p><br/><p>"I remember my first day at ASKBTM like it was yesterday," Amina recalls, her face lighting up. "I was so nervous, but my teacher made me feel like I belonged. She saw something in me that I didn\'t even see in myself. That\'s the kind of teacher I strive to be every day."</p><br/><p>Amina\'s journey wasn\'t without its challenges. Growing up in an underprivileged community, she faced numerous obstacles that could have derailed her education. But through the support of our scholarship program and the mentorship of dedicated teachers, she not only completed her schooling but went on to earn a degree in Early Childhood Education.</p>',
    author: 'Maria Gonzalez',
    readTime: '5 min read',
  },
  {
    category: 'education',
    image: '/assets/img/reading-group.svg',
    alt: 'Children reading together',
    day: '20',
    monthYear: 'Sep 2025',
    title: 'The Power of Reading: Our New Literacy Initiative',
    excerpt:
      'Our literacy program has helped over 300 children improve their reading skills this year. Discover how our innovative approach to teaching reading is making a difference in young lives...',
    fullContent:
      '<p>In a world where literacy is the foundation of all learning, our Reading for Life initiative is making significant strides in transforming young lives. This year alone, we\'ve helped over 300 children develop strong reading skills, opening doors to endless possibilities and brighter futures.</p><br/><p>"When I first started the program, I could barely read a sentence," shares 9-year-old Rohan, one of our star students. "Now I can read chapter books all by myself! My favorite is the Magic Tree House series."</p><br/><p>Our approach combines evidence-based teaching methods with individualized attention. Each child receives a personalized reading plan based on their current level and learning style. We\'ve also introduced a "Reading Buddies" program that pairs older students with younger ones, creating a supportive learning environment.</p>',
    author: 'James Wilson',
    readTime: '4 min read',
  },
  {
    category: 'events',
    image: '/assets/img/fundraiser.svg',
    alt: 'Fundraising event',
    day: '10',
    monthYear: 'Sep 2025',
    title: 'Annual Gala Raises Record $250,000 for Education',
    excerpt:
      'Our most successful fundraising event to date will help us expand our programs to reach 200 more children in underserved communities. See highlights from the magical evening...',
    fullContent:
      '<p>The Grand Ballroom was alive with energy and excitement as over 300 supporters gathered for our 10th Annual Gala for Education. Themed "Building Brighter Futures," the event surpassed all expectations, raising a record-breaking $250,000 to support our educational initiatives in underserved communities.</p><br/><p>The evening began with a heartfelt welcome from our Executive Director, who shared inspiring stories of students whose lives have been transformed through our programs. "Every dollar raised tonight will go directly toward providing quality education to children who need it most," she announced.</p>',
    author: 'Sarah Thompson',
    readTime: '5 min read',
  },
  {
    category: 'volunteer',
    image: '/assets/img/volunteer-team.svg',
    alt: 'Volunteer team',
    day: '28',
    monthYear: 'Aug 2025',
    title: 'Corporate Volunteer Day: Local Businesses Give Back',
    excerpt:
      'Employees from five local companies joined forces to renovate our learning center and mentor students. See how corporate partnerships are making a real impact...',
    fullContent:
      '<p>On a bright Saturday morning, our learning center was buzzing with activity as over 100 employees from five local corporations rolled up their sleeves to give back to the community. This year\'s Corporate Volunteer Day was our largest and most impactful yet, demonstrating the power of business-community partnerships in creating positive change.</p><br/><p>Teams worked side by side to paint classrooms, create an outdoor learning garden, and conduct mentorship sessions with children.</p>',
    author: 'Robert Kim',
    readTime: '6 min read',
  },
  {
    category: 'success-stories',
    image: '/assets/img/graduation.svg',
    alt: 'Graduation ceremony',
    day: '15',
    monthYear: 'Aug 2025',
    title: 'Class of 2025: 98% Graduation Rate Achieved',
    excerpt:
      'Our latest graduating class has set a new record with a 98% graduation rate, with 85% of students continuing to higher education. Meet some of our outstanding graduates...',
    fullContent:
      '<p>As the sun set on another academic year, we celebrated the remarkable achievements of the Class of 2025, our most accomplished graduating class to date. With a 98% graduation rate and 85% of students accepted into institutions of higher learning, these young men and women have set a new standard of excellence for future classes to follow.</p><br/><p>"This isn\'t just a number—it\'s individual stories of perseverance, hard work, and triumph over adversity," said our center leadership during the commencement ceremony.</p>',
    author: 'Dr. Lisa Wong',
    readTime: '7 min read',
  },
  {
    category: 'education',
    image: '/assets/img/art-class.svg',
    alt: 'Art class in session',
    day: '01',
    monthYear: 'Aug 2025',
    title: 'Art Therapy Program Helps Children Express Themselves',
    excerpt:
      'Our new art therapy initiative is helping children process emotions and build confidence through creative expression. See how art is transforming lives in our community...',
    fullContent:
      '<p>In a brightly lit classroom filled with colorful paints, clay, and an array of art supplies, something remarkable is happening. Children who once struggled to articulate their feelings are finding their voices through art. Our new Art from the Heart program is already making a profound impact on the emotional well-being of our students.</p><br/><p>"Art provides a safe space for children to express what they might not have words for," explains Sarah Chen, our lead art therapist.</p>',
    author: 'Maria Garcia',
    readTime: '5 min read',
  },
];

export default function NewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeStory, setActiveStory] = useState<BlogPost | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredBlogs =
    selectedFilter === 'all'
      ? BLOGS_DATA
      : BLOGS_DATA.filter(
          (b) =>
            b.category.toLowerCase().replace('-', ' ') ===
              selectedFilter.toLowerCase().replace('-', ' ') ||
            b.category.toLowerCase() === selectedFilter.toLowerCase()
        );

  const handleShare = (post: BlogPost) => {
    const text = `${post.title}\n\n${post.excerpt}\n\nRead more at ASKBTM Center: https://askbtm.org/news`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setToastMessage('Story link & summary copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 px-6 relative">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 bg-color-green border-2 border-color-black rounded-lg px-3.5 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-color-black"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">
              ASKBTM Impact Chronicle · Legatafo Stories
            </span>
          </div>

          <h1 className="font-primary font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto mb-6">
            Community News &amp;{' '}
            <span className="inline-block bg-color-yellow px-3 py-0.5 -rotate-1 border-2 border-color-black mx-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Impact
            </span>{' '}
            Stories
          </h1>

          <p className="text-base md:text-lg text-color-black/80 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Explore firsthand updates on child development, nutrition statistics, volunteer
            accomplishments, and community celebrations directly from our Legatafo center.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto mb-4">
            {[
              { id: 'all', label: 'All Stories' },
              { id: 'education', label: 'Education' },
              { id: 'events', label: 'Events & Gala' },
              { id: 'volunteer', label: 'Volunteer Spotlight' },
              { id: 'success-stories', label: 'Success Stories' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`category-btn px-4 py-2 border-2 border-black rounded-xl font-bold text-xs btn-brutal transition-colors ${
                  selectedFilter === tab.id ? 'bg-color-yellow' : 'bg-white hover:bg-color-cream'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, idx) => (
              <article
                key={idx}
                className="border-2 border-color-black rounded-2xl overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="relative h-52 sm:h-60 overflow-hidden border-b-2 border-color-black bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-color-yellow border-2 border-black rounded-lg px-2.5 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span>{post.day}</span> {post.monthYear}
                  </div>
                  <div className="absolute top-3 right-3 bg-color-green border-2 border-black rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-black/70 font-semibold mb-3">
                      <span>
                        <i className="ri-user-line"></i> {post.author}
                      </span>
                      <span>·</span>
                      <span>
                        <i className="ri-time-line"></i> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-primary text-2xl font-bold leading-tight mb-3 text-color-black hover:text-amber-800 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-black/75 leading-relaxed mb-6 font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t-2 border-black/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveStory(post)}
                      className="px-4 py-2 bg-color-yellow border-2 border-black rounded-lg font-bold text-xs btn-brutal flex items-center gap-1.5"
                    >
                      <span>Read Story</span>
                      <i className="ri-arrow-right-line"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(post)}
                      className="px-3 py-2 bg-color-cream border-2 border-black rounded-lg font-bold text-xs btn-brutal flex items-center gap-1.5 hover:bg-white"
                    >
                      <i className="ri-file-copy-2-line"></i>
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Story Modal */}
      {activeStory && (
        <div className="story-modal active">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={() => setActiveStory(null)}
          ></div>
          <div className="relative z-50 bg-white border-2 border-black rounded-2xl p-6 sm:p-8 max-w-2xl max-h-[85vh] overflow-y-auto shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] w-full">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-black hover:text-red-600 transition-colors"
              aria-label="Close modal"
            >
              <i className="ri-close-line"></i>
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-color-green border border-black px-2.5 py-0.5 rounded text-xs font-bold uppercase">
                {activeStory.category}
              </span>
              <span className="text-xs text-black/70 font-semibold">
                {activeStory.day} {activeStory.monthYear}
              </span>
            </div>
            <h2 className="font-primary text-3xl font-bold mb-2">{activeStory.title}</h2>
            <p className="text-xs text-black/60 font-semibold mb-6">
              By {activeStory.author} · {activeStory.readTime}
            </p>
            <div
              className="text-sm leading-relaxed text-black/85 space-y-4"
              dangerouslySetInnerHTML={{ __html: activeStory.fullContent }}
            ></div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-color-black text-white px-5 py-3 rounded-xl border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs md:text-sm font-bold flex items-center gap-2">
          <i className="ri-checkbox-circle-fill text-green-400"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
