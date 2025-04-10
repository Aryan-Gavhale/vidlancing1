import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Mail,
  Calendar,
  DollarSign,
  Clock,
  Award,
  User,
  Building,
  Film,
  Play,
  Star,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import axiosInstance from "../../utils/axios";

export default function JobDescriptionPage() {
  const { jobId } = useParams(); // Get jobId from URL
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details by ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`/job/${jobId}`);
        const jobData = response.data.data; // Adjust based on your API structure
        setJob({
          id: jobData._id || jobData.id,
          title: jobData.title,
          description: jobData.description,
          category: jobData.category || ["Unknown"],
          budgetMin: jobData.budgetMin || 0,
          budgetMax: jobData.budgetMax || 0,
          deadline: jobData.deadline || new Date().toISOString(), // Add to backend if needed
          jobDifficulty: jobData.jobDifficulty || "Unknown",
          projectLength: jobData.projectLength || "Unknown",
          keyResponsibilities: jobData.keyResponsibilities || ["Not specified"], // Add to schema
          requiredSkills: jobData.requiredSkills || [],
          tools: jobData.tools || [],
          scope: jobData.scope || "Not specified",
          name: jobData.name || "Anonymous",
          email: jobData.email || "N/A",
          company: jobData.company || "Unknown",
          note: jobData.note || "No additional notes provided.",
          sampleVideos: jobData.sampleVideos || [], // Add to schema if needed
          isVerified: jobData.isVerified !== undefined ? jobData.isVerified : false,
        });
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <div className="text-center py-20">Loading job details...</div>;
  }

  if (error || !job) {
    return (
      <div className="text-center py-20 text-red-600">
        {error || "Job not found."}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Film className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">{job.company}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-yellow-500" : ""}`} />
                ))}
                <span className="text-gray-600 text-sm ml-2">
                  {job.isVerified ? "Top Rated Employer" : "Employer"}
                </span>
              </div>
              <p className="text-gray-600 max-w-3xl">{job.description}</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Apply Now
              </button>
              <button
                onClick={() => navigate(-1)} // Go back to JobBoard
                className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Job details */}
          <div className="lg:col-span-2">
            {/* Overview section */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <IndianRupee className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Budget Range</h3>
                    <p className="text-gray-600">
                      ₹{Number(job.budgetMin).toLocaleString("en-IN")} - ₹{Number(job.budgetMax).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Application Deadline</h3>
                    <p className="text-gray-600">
                      {new Date(job.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Experience Level</h3>
                    <p className="text-gray-600">{job.jobDifficulty}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Project Length</h3>
                    <p className="text-gray-600">{job.projectLength}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Project Scope</h3>
                <p className="text-gray-700">{job.scope}</p>
              </div>
            </div>

            {/* Responsibilities section */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Responsibilities</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.keyResponsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Tools section */}
            <div className="border-b border-gray-200 pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Required Skills & Tools</h2>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="border border-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Videos section */}
            {job.sampleVideos.length > 0 && (
              <div className="border-b border-gray-200 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sample Videos</h2>
                <p className="text-gray-600 mb-6">
                  These videos represent the style and quality we're looking for.
                </p>
                {job.sampleVideos.map((video, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{video.title}</h3>
                      <span className="text-gray-500 text-sm">{video.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{video.description}</p>
                    <button className="flex items-center text-purple-600 hover:text-purple-800 font-medium">
                      <Play className="h-4 w-4 mr-1" /> Watch Video
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Job Categories */}
            <div className="pb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Job Categories</h3>
              <div className="flex flex-wrap gap-2">
                {job.category.map((category, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Contact info */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Contact Person</h3>
                    <p className="text-gray-600">{job.name}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href={`mailto:${job.email}`} className="text-purple-600 hover:underline">
                      {job.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 text-purple-600">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Company</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">Additional Notes</h3>
                <p className="text-gray-600 italic mb-6">{job.note}</p>

                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                  Apply for this Position
                </button>

                <div className="mt-4 text-center">
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                    Share this job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}