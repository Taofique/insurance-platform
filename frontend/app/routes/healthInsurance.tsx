import HealthInsuranceBanner from "../../components/health-insurance-sections/HealthInsuranceBanner";
import HealthInsuranceFaq from "../../components/health-insurance-sections/HealthInsuranceFaq";
import HealthInsuranceQuote from "../../components/health-insurance-sections/HealthInsuranceQuote";

export default function HealthInsurance() {
  return (
    <>
      <HealthInsuranceBanner />
      <HealthInsuranceQuote />
      <HealthInsuranceFaq />
    </>
  );
}
