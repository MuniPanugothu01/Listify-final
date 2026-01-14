import ElderCareAbout from "./ElderCareAbout"
import ElderCareContact from "./ElderCareContact"
import ElderCareFaq from "./ElderCareFaq"
import ElderCareHero from "./ElderCareHero"
import ElderCareHowItWorks from "./ElderCareHowItWorks"
import CareServices from "../CareServices"
import ElderCareJobs from "./ElderCareJobs"
import ElderCareProfile from "./ElderCareProfile"


const ElderCareServices = () =>{
    return(
        <>
        <ElderCareHero/>
        <ElderCareAbout/>
        <ElderCareHowItWorks/>
        <ElderCareProfile/>
        <ElderCareJobs/>
        <CareServices/>
        <ElderCareFaq/>
        <ElderCareContact/>

        </>
    )
}
export default ElderCareServices