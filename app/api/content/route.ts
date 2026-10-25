import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import {
  BlogPost,
  SiteStats,
  VisitorAnnouncement,
  INITIAL_BLOGS,
  INITIAL_STATS,
  INITIAL_ANNOUNCEMENT,
} from '../../../lib/siteData';

// Server-side persistent storage in memory as fallback
let storedBlogs: BlogPost[] = [...INITIAL_BLOGS];
let storedStats: SiteStats = { ...INITIAL_STATS };
let storedAnnouncement: VisitorAnnouncement = { ...INITIAL_ANNOUNCEMENT, enabled: false };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    // If Supabase is available, we can fetch from Supabase
    if (isSupabaseConfigured && supabase) {
      if (type === 'blogs' || type === 'all') {
        const { data: blogsData } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });
        if (blogsData && blogsData.length > 0) {
          storedBlogs = blogsData;
        }
      }
      if (type === 'stats' || type === 'all') {
        const { data: statsData } = await supabase
          .from('site_stats')
          .select('*')
          .limit(1)
          .single();
        if (statsData) {
          storedStats = statsData;
        }
      }
      if (type === 'announcement' || type === 'all') {
        const { data: annData } = await supabase
          .from('announcements')
          .select('*')
          .limit(1)
          .single();
        if (annData) {
          storedAnnouncement = annData;
        }
      }
    }

    if (type === 'blogs') {
      return NextResponse.json({ success: true, blogs: storedBlogs });
    }
    if (type === 'stats') {
      return NextResponse.json({ success: true, stats: storedStats });
    }
    if (type === 'announcement') {
      return NextResponse.json({ success: true, announcement: storedAnnouncement });
    }

    return NextResponse.json({
      success: true,
      blogs: storedBlogs,
      stats: storedStats,
      announcement: storedAnnouncement,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      blogs: storedBlogs,
      stats: storedStats,
      announcement: storedAnnouncement,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, payload } = body;

    // 1. Create a new Blog Post
    if (action === 'create_blog') {
      const { title, category, excerpt, fullContent, author, readTime, image } = payload;
      if (!title || !fullContent) {
        return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
      }

      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = String(now.getDate()).padStart(2, '0');
      const monthYear = `${months[now.getMonth()]} ${now.getFullYear()}`;

      const newPost: BlogPost = {
        id: `story-${Date.now()}`,
        title: title.trim(),
        category: category || 'education',
        excerpt: excerpt || (fullContent.slice(0, 150) + '...'),
        fullContent,
        author: author || 'Sister Sirgutemikael & Team',
        readTime: readTime || '4 min read',
        image: image || '/assets/img/children learning at askbtm.svg',
        alt: title,
        day,
        monthYear,
        createdAt: now.toISOString(),
      };

      storedBlogs = [newPost, ...storedBlogs];

      if (isSupabaseConfigured && supabase) {
        await supabase.from('blogs').insert([newPost]);
      }

      return NextResponse.json({ success: true, blog: newPost, message: 'Story published successfully!' });
    }

    // 2. Update Stats
    if (action === 'update_stats') {
      storedStats = { ...storedStats, ...payload };

      if (isSupabaseConfigured && supabase) {
        await supabase.from('site_stats').upsert([storedStats]);
      }

      return NextResponse.json({ success: true, stats: storedStats, message: 'Impact statistics updated!' });
    }

    // 3. Update Announcement
    if (action === 'update_announcement') {
      storedAnnouncement = { ...storedAnnouncement, ...payload };

      if (isSupabaseConfigured && supabase) {
        await supabase.from('announcements').upsert([storedAnnouncement]);
      }

      return NextResponse.json({
        success: true,
        announcement: storedAnnouncement,
        message: 'Visitor announcement banner updated!',
      });
    }

    // 4. Delete Blog
    if (action === 'delete_blog') {
      const { id } = payload;
      storedBlogs = storedBlogs.filter((b) => b.id !== id);

      if (isSupabaseConfigured && supabase) {
        await supabase.from('blogs').delete().eq('id', id);
      }

      return NextResponse.json({ success: true, message: 'Story deleted' });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
