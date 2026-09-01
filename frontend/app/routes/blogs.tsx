import { useState } from "react";
import { Search } from "lucide-react";
import Container from "../../components/shared/Container";
import NewsEventCard from "../../components/ui/NewsEventCard";
import blogData from "../data/blogs.json";

const categories = [
  "All",
  "Health Insurance",
  "Life Insurance",
  "Property Insurance",
  "Travel Insurance",
  "Business Insurance",
  "Auto Insurance",
  "Home Insurance",
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const blogs = blogData.blogs;

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-poppins text-4xl font-bold text-[#444] md:text-5xl">
            Insurance <span className="text-[#ac3e25]">Blog</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-poppins text-gray-600">
            Stay informed with the latest insights, tips, and updates from the
            world of insurance.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-2.5 pl-10 pr-4 font-poppins text-sm focus:border-[#ac3e25] focus:outline-none focus:ring-1 focus:ring-[#ac3e25]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-1.5 font-poppins text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#ac3e25] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <NewsEventCard
              key={post.id}
              image={post.image}
              title={post.title}
              date={post.date}
              description={post.excerpt}
              href={`/blogs/${post.id}`}
            />
          ))}
        </div>

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-poppins text-gray-500">
              No blog posts found matching your criteria.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
