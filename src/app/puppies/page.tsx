import PuppyBrowser from "@/components/PuppyBrowser";
import { puppies } from "@/lib/puppies";

export const metadata = {
  title: "Available Puppies",
  description: "Browse labradoodle puppies currently available for adoption.",
};

export default function PuppiesPage() {
  return (
    <>
      <section className="bg-sand">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow">Find your match</p>
          <h1 className="heading-1 mt-4">Available puppies</h1>
          <p className="prose-warm mt-4 max-w-2xl text-lg">
            Each of our puppies is raised with love and ready to meet their family. Search and filter to find
            the one that feels just right.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <PuppyBrowser puppies={puppies} />
        </div>
      </section>
    </>
  );
}
