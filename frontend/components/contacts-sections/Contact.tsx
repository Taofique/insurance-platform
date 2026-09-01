import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import Container from "../shared/Container";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add API call or email service integration
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
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
            Contact <span className="text-[#ac3e25]">Us</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-poppins text-gray-600">
            Have questions or need assistance? We're here to help. Reach out to
            us through any of the channels below.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h2 className="mb-6 font-poppins text-xl font-semibold text-[#444]">
                Get in Touch
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-[#f7ece9] p-2.5 text-[#ac3e25]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-poppins text-sm font-medium text-[#444]">
                      Address
                    </h3>
                    <p className="font-poppins text-sm text-gray-600">
                      Sandhani Life Tower (2nd Floor),
                      <br />
                      34 Bangla Motor, Dhaka - 1000.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-[#f7ece9] p-2.5 text-[#ac3e25]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-poppins text-sm font-medium text-[#444]">
                      Phone
                    </h3>
                    <a
                      href="tel:+8801714044146"
                      className="font-poppins text-sm text-gray-600 hover:text-[#ac3e25]"
                    >
                      +880 1714-044146
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-[#f7ece9] p-2.5 text-[#ac3e25]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-poppins text-sm font-medium text-[#444]">
                      Email
                    </h3>
                    <a
                      href="mailto:purabiinsurance@gmail.com"
                      className="font-poppins text-sm text-gray-600 hover:text-[#ac3e25]"
                    >
                      purabiinsurance@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-[#f7ece9] p-2.5 text-[#ac3e25]">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-poppins text-sm font-medium text-[#444]">
                      Office Hours
                    </h3>
                    <p className="font-poppins text-sm text-gray-600">
                      Sunday - Thursday: 9:00 AM - 6:00 PM
                      <br />
                      Friday - Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-6 h-48 overflow-hidden rounded-xl bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.124!2d90.4125!3d23.7405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9b3c6b8b8b7%3A0x0!2zMjPCsDQ0JzI1LjgiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Purabi Insurance Office Location"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">
              <h2 className="mb-6 font-poppins text-xl font-semibold text-[#444]">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                    htmlFor="subject"
                    className="mb-1.5 block font-poppins text-sm font-medium text-[#444]"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-poppins text-sm focus:border-[#ac3e25] focus:outline-none focus:ring-1 focus:ring-[#ac3e25]"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-poppins text-sm font-medium text-[#444]"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-poppins text-sm focus:border-[#ac3e25] focus:outline-none focus:ring-1 focus:ring-[#ac3e25]"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ac3e25] px-6 py-3 font-poppins font-medium text-white transition-colors hover:bg-[#8a3220] md:w-auto"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
