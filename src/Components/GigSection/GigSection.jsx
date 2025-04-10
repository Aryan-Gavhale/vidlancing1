import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Star, Clock, ChevronDown, Filter } from "lucide-react"

export default function GigSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const categories = [
    { id: "all", name: "All Services" },
    { id: "video", name: "Video Editing" },
    { id: "animation", name: "Animation" },
    { id: "graphics", name: "Graphics Design" },
    { id: "social", name: "Social Media" },
    { id: "audio", name: "Audio Production" },
  ]

  const gigs = [
    {
      id: 1,
      title: "Professional Video Editing with Cinematic Effects",
      description:
        "Transform your raw footage into stunning, professional videos with color grading, transitions, and effects.",
      image: "/placeholder.svg?height=400&width=600",
      category: "video",
      rating: 4.9,
      reviews: 237,
      price: 2499,
      deliveryTime: "2 days",
    },
    {
      id: 2,
      title: "Motion Graphics & Visual Effects",
      description: "Add eye-catching motion graphics and VFX to elevate your video content to the next level.",
      image: "/placeholder.svg?height=400&width=600",
      category: "animation",
      rating: 5.0,
      reviews: 182,
      price: 3499,
      deliveryTime: "3 days",
    },
    {
      id: 3,
      title: "YouTube Video Optimization & Editing",
      description: "Get YouTube-ready videos with SEO optimization, engaging thumbnails, and audience-focused editing.",
      image: "/placeholder.svg?height=400&width=600",
      category: "video",
      rating: 4.8,
      reviews: 315,
      price: 1999,
      deliveryTime: "2 days",
    },
    {
      id: 4,
      title: "Social Media Video Content Creation",
      description: "Short-form videos optimized for Instagram, TikTok, and other platforms to boost your engagement.",
      image: "/placeholder.svg?height=400&width=600",
      category: "social",
      rating: 4.9,
      reviews: 426,
      price: 1799,
      deliveryTime: "1 day",
    },
    {
      id: 5,
      title: "3D Animation & Character Design",
      description: "Custom 3D animations and character designs for your brand, products, or creative projects.",
      image: "/placeholder.svg?height=400&width=600",
      category: "animation",
      rating: 5.0,
      reviews: 98,
      price: 5499,
      deliveryTime: "5 days",
    },
    {
      id: 6,
      title: "Professional Audio Mixing & Mastering",
      description: "Studio-quality audio enhancement for your videos, podcasts, or music productions.",
      image: "/placeholder.svg?height=400&width=600",
      category: "audio",
      rating: 4.7,
      reviews: 142,
      price: 2299,
      deliveryTime: "2 days",
    },
  ]

  const filteredGigs = selectedCategory === "all" ? gigs : gigs.filter((gig) => gig.category === selectedCategory)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16 px-4 md:px-8">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-purple-100 to-pink-100 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-t from-blue-100 to-teal-100 rounded-tr-full opacity-40"></div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium rounded-md mb-4">
            Premium Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600">
            Creative Services Marketplace
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Elevate your content with our professional creative services. From video editing to animation, we bring your
            vision to life.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 relative">
              Browse Services
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
            </h3>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 px-4 py-2 rounded-md transition-all md:hidden border border-gray-200 shadow-sm"
            >
              <Filter size={18} />
              <span>Filter</span>
              <ChevronDown size={18} className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className={`${isMobile && !isFilterOpen ? "hidden" : "flex"} flex-wrap gap-3 md:gap-4 mb-8 md:mb-0`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-md transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-purple-200 shadow-sm"
                }`}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="group relative bg-white rounded-md overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-purple-200"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img
                  src={gig.image || "/placeholder.svg"}
                  alt={gig.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium text-purple-700">
                  {gig.category.charAt(0).toUpperCase() + gig.category.slice(1)}
                </div>
              </div>

              <div className="p-6">
                <div className="h-14 mb-2">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {gig.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gig.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium">{gig.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({gig.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock size={16} />
                    <span>{gig.deliveryTime}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-xs">Starting at</span>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-violet-600">
                      ₹{gig.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link
                    href="#"
                    className="block text-center bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-md transition-all shadow-md hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-md transition-all border border-gray-200 shadow-sm hover:shadow-md">
            View All Services
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
