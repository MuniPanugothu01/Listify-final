import React from "react";

// Importing the necessary components for the JobsPage
import HeroSectionJobs from "../../components/Jobs/HeroSectionJobs";
import FeaturedJobs from "../../components/Jobs/FeaturedJobs";
import SubNavbar from "../../components/Jobs/SubNavbar";

const JobsPage = () => {
  return (
    <div>
      <SubNavbar />
      <HeroSectionJobs />
      <FeaturedJobs />
    </div>
  );
};

export default JobsPage;
