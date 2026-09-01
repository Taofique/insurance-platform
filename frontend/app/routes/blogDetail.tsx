import { useParams, Link } from "react-router";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
} from "lucide-react";
import Container from "../../components/shared/Container";
import blogData from "../data/blogs.json";

export default function BlogDetail() {
  const { id } = useParams();

  // Find the blog post by id
  const blogPost = blogData.blogs.find((post) => post.id === Number(id));

  // Handle case where blog post is not found
  if (!blogPost) {
    return (
      <div className="py-12 md:py-16 bg-gray-50">
        <Container>
          <div className="text-center py-12">
            <h2 className="font-poppins text-2xl font-semibold text-[#444]">
              Blog Post Not Found
            </h2>
            <Link
              to="/blogs"
              className="mt-4 inline-block text-[#ac3e25] hover:underline"
            >
              ← Back to Blogs
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Back button */}
          <Link
            to="/blogs"
            className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-[#ac3e25] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>

          {/* Blog Header */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-md md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#f7ece9] px-3 py-1 text-xs font-medium text-[#ac3e25]">
                {blogPost.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={14} />
                {blogPost.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <User size={14} />
                {blogPost.author}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={14} />
                {blogPost.readTime}
              </span>
            </div>

            <h1 className="font-poppins text-3xl font-bold text-[#444] md:text-4xl">
              {blogPost.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ac3e25]">
                <Share2 size={16} />
                Share
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#ac3e25]">
                <Bookmark size={16} />
                Save
              </button>
            </div>
          </div>

          {/* Blog Image */}
          <div className="mb-8 overflow-hidden rounded-2xl">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">
            <div
              className="prose prose-lg max-w-none font-poppins text-gray-700"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>

          {/* Share section */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-4 font-poppins text-lg font-semibold text-[#444]">
              Share this article
            </h3>
            <div className="flex gap-3">
              <button className="rounded-full bg-[#1877f2] p-2.5 text-white hover:opacity-90">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="rounded-full bg-[#1da1f2] p-2.5 text-white hover:opacity-90">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button className="rounded-full bg-[#0a66c2] p-2.5 text-white hover:opacity-90">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
