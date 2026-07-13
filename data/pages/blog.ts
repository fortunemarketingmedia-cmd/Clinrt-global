import { makeHero, makeSeedImage } from "../factories";
import { deepFreeze } from "../utils";
import type { BlogPost, HeroContent, BlogCategory } from "../types";
import { validateBlogPosts, validateHero } from "../validators";

/** Blog page hero. */
export const blogHero: HeroContent = validateHero(
  makeHero({
    title: "Blog & Insights",
    breadcrumb: "Home / Blog",
    image: makeSeedImage("labrix-blog-hero", 1600, 900),
  }),
);

/** Blog categories for filtering. */
export const blogCategories: BlogCategory[] = [
  "All",
  "Research",
  "Lab Life",
  "Technology",
  "News",
  "Interviews"
];

/** Blog post summaries with enhanced metadata. */
export const blogPosts: ReadonlyArray<BlogPost> = validateBlogPosts(
  deepFreeze([
    {
      slug: "lab-operations-built-for-clarity",
      title: "Lab operations built for clarity",
      excerpt: "How modern laboratories are streamlining workflows and reducing errors through intelligent automation and clear protocols.",
      image: makeSeedImage("labrix-blog-1", 640, 480),
      category: "Lab Life",
      author: "Dr. Sarah Chen",
      date: "Feb 18, 2026",
      readTime: "4 min read",
    },
    {
      slug: "the-rise-of-connected-diagnostics",
      title: "The rise of connected diagnostics",
      excerpt: "Exploring the integration of IoT and real-time data in diagnostic systems and what it means for patient outcomes.",
      image: makeSeedImage("labrix-blog-2", 640, 480),
      category: "Technology",
      author: "Michael Roberts",
      date: "Jan 29, 2026",
      readTime: "5 min read",
    },
    {
      slug: "why-testing-workflows-need-calm",
      title: "Why testing workflows need calm",
      excerpt: "The psychology of lab efficiency: how reducing cognitive load can improve accuracy and throughput.",
      image: makeSeedImage("labrix-blog-3", 640, 480),
      category: "Research",
      author: "Dr. James Wilson",
      date: "Jan 05, 2026",
      readTime: "3 min read",
    },
    {
      slug: "future-of-molecular-diagnostics",
      title: "The future of molecular diagnostics",
      excerpt: "Breakthroughs in PCR technology and what they mean for clinical laboratories and patient care.",
      image: makeSeedImage("labrix-blog-4", 640, 480),
      category: "Research",
      author: "Dr. Sarah Chen",
      date: "Dec 12, 2025",
      readTime: "6 min read",
    },
    {
      slug: "building-resilient-lab-teams",
      title: "Building resilient lab teams",
      excerpt: "Strategies for hiring, training, and retaining top talent in competitive research environments.",
      image: makeSeedImage("labrix-blog-5", 640, 480),
      category: "Lab Life",
      author: "Emma Thompson",
      date: "Nov 28, 2025",
      readTime: "4 min read",
    },
    {
      slug: "interview-dr-elena-martinez",
      title: "Interview: Dr. Elena Martinez on AI in diagnostics",
      excerpt: "Leading researcher discusses how machine learning is transforming early disease detection.",
      image: makeSeedImage("labrix-blog-6", 640, 480),
      category: "Interviews",
      author: "Alex Rivera",
      date: "Nov 10, 2025",
      readTime: "7 min read",
    },
  ]),
);

/** Blog list excerpt copy. */
export const blogExcerpt = deepFreeze({
  summary: "Field notes on product research, lab strategy, and innovation.",
});

/** Featured post (first post) */
export const featuredPost = blogPosts[0];

/** Recent posts (next 3) */
export const recentPosts = blogPosts.slice(1, 4);

/** All other posts */
export const otherPosts = blogPosts.slice(4);