import React from "react";

// Importing the necessary components for the JobsPage
import HeroSectionJobs from "../../components/Jobs/HeroSectionJobs";
import FeaturedJobs from "../../components/Jobs/FeaturedJobs";
import SubNavbar from "../../components/Jobs/SubNavbar";
import CompaniesLIst from "../../components/Jobs/CompaniesLIst";
import JobSeekerResume from "../../components/Jobs/JobSeekerResume";
import LatestJobs from "../../components/Jobs/LatestJobs";
import LatestsJobs2 from "../../components/Jobs/LatestsJobs2";
import FeaturedRecruiters from "../../components/Jobs/FeaturedRecruiters";
import FreelancerGrid from "../../components/Jobs/FreelancerGrid";


const JobsPage = () => {
  return (
    <div>
      <SubNavbar />
      <HeroSectionJobs />
      <FeaturedJobs />
      <CompaniesLIst/>
      <FreelancerGrid/>
      {/* <LatestJobs/> */}
      <LatestsJobs2/>
      <FeaturedRecruiters/>
      <JobSeekerResume/>
    </div>
  );
};

export default JobsPage;
