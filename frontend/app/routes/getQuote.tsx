import { useState } from "react";
import {
  ArrowRight,
  Shield,
  Users,
  Home,
  Car,
  Briefcase,
  Plane,
} from "lucide-react";
import Container from "../../components/shared/Container";

const insuranceTypes = [
  {
    id: "health",
    label: "Health Insurance",
    icon: Shield,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "life",
    label: "Life Insurance",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "property",
    label: "Property Insurance",
    icon: Home,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "auto",
    label: "Auto Insurance",
    icon: Car,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "business",
    label: "Business Insurance",
    icon: Briefcase,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "travel",
    label: "Travel Insurance",
    icon: Plane,
    color: "bg-yellow-100 text-yellow-600",
  },
];

export default function GetQuote() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle quote request submission
    console.log("Quote request:", { ...formData, insuranceType: selectedType });
    alert("Thank you for your quote request! We'll get back to you shortly.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-12 md:py-16 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="font-poppins text-4xl font-bold text-[#444] md:text-5xl">
            Get a <span className="text-[#ac3e25]">Quote</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-poppins text-gray-600">
            Fill in the details below and we'll provide you with the best
            insurance quotes tailored to your needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Insurance Type Selection */}
                <div>
                  <label className="mb-3 block font-poppins text-sm font-medium text-[#444]">
                    Select Insurance Type *
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {insuranceTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                          selectedType === type.id
                            ? "border-[#ac3e25] bg-[#f7ece9]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className={`rounded-full p-2 ${type.color}`}>
                          <type.icon size={20} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block font-poppins text-sm font-medium text-[#444]"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-poppins text-sm focus:border-[#ac3e25] focus:outline-none focus:ring-1 focus:ring-[#ac3e25]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-poppins text-sm font-medium text-[#444]"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-poppins text-sm focus:border-[#ac3e25] focus:outline-none focus:ring-1 focus:ring-[#ac3e25]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block font-poppins text-sm font-medium text-[#444]"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-poppins text-sm focus:border-[#ac3e25] focus:outline-none focus:ring-1 focus:ring-[#ac3e25]"
                    placeholder="+880 17XX-XXXXXX"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-poppins text-sm font-medium text-[#444]"
                  >
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-poppins text-sm focus:border-[#ac3e25] focus:outline-none focus:ring-1 focus:ring-[#ac3e25]"
                    placeholder="Any specific requirements or details you'd like to share..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ac3e25] px-6 py-3 font-poppins font-medium text-white transition-colors hover:bg-[#8a3220] md:w-auto"
                >
                  Get Quote
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="mb-4 font-poppins text-lg font-semibold text-[#444]">
                Why Choose Purabi?
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 text-[#ac3e25]">✓</span>
                  <span>Competitive premium rates</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 text-[#ac3e25]">✓</span>
                  <span>Fast claim settlement</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 text-[#ac3e25]">✓</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 text-[#ac3e25]">✓</span>
                  <span>Multiple insurance options</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 text-[#ac3e25]">✓</span>
                  <span>100% digital process</span>
                </li>
              </ul>

              <div className="mt-6 rounded-lg bg-[#f7ece9] p-4">
                <p className="text-sm text-gray-700">
                  Need help? Call us at{" "}
                  <a
                    href="tel:+8801714044146"
                    className="font-bold text-[#ac3e25]"
                  >
                    +880 1714-044146
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
