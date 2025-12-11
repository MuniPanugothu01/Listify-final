import React from "react";

// Importing the necessary components for the JobsPage
import HeroSectionJobs from "../../components/Jobs/HeroSectionJobs";
import FeaturedJobs from "../../components/Jobs/FeaturedJobs";
import SubNavbar from "../../components/Jobs/SubNavbar";
import CompaniesLIst from "../../components/Jobs/CompaniesLIst";
import JobSeekerPosts from "../../components/Jobs/JobSeekerPosts";
import LatestJobs from "../../components/Jobs/LatestJobs";
import LatestsJobs2 from "../../components/Jobs/LatestsJobs2";


const JobsPage = () => {
  return (
    <div>
      <SubNavbar />
      <HeroSectionJobs />
      <FeaturedJobs />
      <CompaniesLIst/>
      <JobSeekerPosts/>
      {/* <LatestJobs/> */}
      <LatestsJobs2/>
    </div>
  );
};

export default JobsPage;
