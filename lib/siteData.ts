export interface BlogPost {
  id: string;
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
  createdAt: string;
}

export interface SiteStats {
  childrenFed: string;
  mothersEmpowered: string;
  mealsPerDay: string;
  allocationPercent: string;
  targetYear: string;
  targetDescription: string;
}

export interface VisitorAnnouncement {
  enabled: boolean;
  message: string;
  type: 'yellow' | 'green' | 'blue' | 'pink';
  actionText?: string;
  actionLink?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'in-progress' | 'replied';
}

export const INITIAL_STATS: SiteStats = {
  childrenFed: '387+',
  mothersEmpowered: '241+',
  mealsPerDay: '3 / Day',
  allocationPercent: '100%',
  targetYear: '2025–2026',
  targetDescription: 'Providing 3 nutritious meals, early education, daytime shelter, and maternal micro-grants in Legatafo.',
};

export const INITIAL_ANNOUNCEMENT: VisitorAnnouncement = {
  enabled: true,
  message: 'Visiting Legatafo? Center campus tours are open Mon–Fri 8:30 AM – 5:30 PM & Sat 9:00 AM – 1:00 PM. Call +251 911 89 27 87 to schedule.',
  type: 'yellow',
  actionText: 'Plan Visit',
  actionLink: '/support',
};

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'story-1',
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
    createdAt: '2025-11-05T10:00:00Z',
  },
  {
    id: 'story-2',
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
    createdAt: '2025-10-28T09:00:00Z',
  },
  {
    id: 'story-3',
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
    createdAt: '2025-10-15T08:30:00Z',
  },
  {
    id: 'story-4',
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
    createdAt: '2025-09-30T14:00:00Z',
  },
  {
    id: 'story-5',
    category: 'education',
    image: '/assets/img/reading-group.svg',
    alt: 'Children reading together',
    day: '20',
    monthYear: 'Sep 2025',
    title: 'The Power of Reading: Our New Literacy Initiative',
    excerpt:
      'Our literacy program has helped over 300 children improve their reading skills this year. Discover how our innovative approach to teaching reading is making a difference in young lives...',
    fullContent:
      '<p>In a world where literacy is the foundation of all learning, our Reading for Life initiative is making significant strides in transforming young lives. This year alone, we\'ve helped over 300 children develop strong reading skills, opening doors to endless possibilities and brighter futures.</p><br/><p>"When I first started the program, I could barely read a sentence," shares 9-year-old Rohan, one of our star students. "Now I can read chapter books all by myself! My favorite is the Magic Tree House series."</p>',
    author: 'James Wilson',
    readTime: '4 min read',
    createdAt: '2025-09-20T11:00:00Z',
  },
];
