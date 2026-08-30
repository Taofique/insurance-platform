import AboutBanner from "../../components/about-us-section/AboutBanner";
import AboutIntro from "../../components/about-us-section/AboutIntro";
import WhyChooseUs from "../../components/about-us-section/WhyChooseUs";
import ClaimCoverage from "../../components/sections/ClaimCoverage";
import Partners from "../../components/sections/Partners";

export default function About() {
  return (
    <>
      <AboutBanner />
      <AboutIntro />
      <ClaimCoverage />
      <WhyChooseUs />
      <Partners />
    </>
  );
}
