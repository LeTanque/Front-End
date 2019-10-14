import React from "react";
import Header from "../DashboardComponents/Header/Header";
import MainProjectAdmin from "../DashboardComponents/Main/MainProjectAdmin";
import MainTradesMaster from "../DashboardComponents/Main/MainTradeMaster";
import MainStudent from "../DashboardComponents/Main/MainStudent";
import Donations from "../DashboardComponents/Main/Donations/Donations";


export default function HeaderMainSort(props) {
    const { projectArray, selectedProject, setProject, mainTabs, setMainTabs, dashNavTabState, possibleDashNavTabs } = props;
    if (!projectArray) return null;
    let renderedHeaderMain;

    // console.log("dashNavTabState ", dashNavTabState);


    // Selected tab is PROJECT ADMIN
    if (dashNavTabState.selectedDashNavTab === possibleDashNavTabs[0]) { 

        // console.log("Project admin main sort array  ", projectArray);

        return renderedHeaderMain = projectArray.map(project => (
            <React.Fragment key={project.id} >
                {!selectedProject.id ? ( // If there is no selected project, render all the headers in this view
                    <Header 
                        key={project.id} 
                        project={project} 
                        setProject={setProject}
                        selectedProject={selectedProject}
                    />
                ) : project.id === selectedProject.id ? ( // If there is a selected project, only render that header
                    <Header 
                        key={project.id} 
                        project={project} 
                        setProject={setProject}
                        selectedProject={selectedProject}
                    />
                ) : null}
                
                {project.id === selectedProject.id ? ( // Render the main tab of the selected header
                    <MainProjectAdmin
                        project={project}
                        mainTabs={mainTabs}
                        selectedMainTab={mainTabs.selectedMainTab}
                        setMainTabs={setMainTabs}
                    />
                ) : null}
            </React.Fragment>
        ))
    }
    
    
    // Selected tab is STUDENT
    if (dashNavTabState.selectedDashNavTab === possibleDashNavTabs[1]) {
        
        // console.log("Student header main sort array  ", projectArray);

        return renderedHeaderMain = projectArray.map(project => (
            <React.Fragment key={project.id} >
                {!selectedProject.id ? (
                    <Header 
                        key={project.project.id} 
                        project={project.project} 
                        setProject={setProject}
                        selectedProject={selectedProject}
                    />
                ) : project.id === selectedProject.id ? (
                    <Header 
                        key={project.project.id} 
                        project={project.project} 
                        setProject={setProject}
                        selectedProject={selectedProject}
                    />
                ) : null}
                
                {project.project.id === selectedProject.id ? (
                    <MainStudent
                        // defaultTab={mainTabState.defaultMainTab}
                        // setMainTabState={setMainTabState}
                        // tabs={mainTabState.mainTabs}
                        // project={project.project}
                    />
                ) : null}
            </React.Fragment>
        ))
    }


    // Selected tab is TRADE MASTER
    if (dashNavTabState.selectedDashNavTab === possibleDashNavTabs[2]) { 

        // console.log("Trade Master main sort array  ", projectArray);

        return renderedHeaderMain = projectArray.map(project => (
            <React.Fragment key={project.id} >
                {!selectedProject.id ? (
                    <Header 
                        key={project.project.id} 
                        project={project.project} 
                        setProject={setProject}
                        selectedProject={selectedProject}
                    />
                ) : project.id === selectedProject.id ? (
                    <Header 
                        key={project.project.id} 
                        project={project.project} 
                        setProject={setProject}
                        selectedProject={selectedProject}
                    />
                ) : null}
                
                {project.project.id === selectedProject.id ? (
                    <MainTradesMaster
                        // defaultTab={mainTabState.defaultMainTab}
                        // setMainTabState={setMainTabState}
                        // tabs={mainTabState.mainTabs}
                        // project={project.project}
                    />
                ) : null}
            </React.Fragment>
        ))
    }


    // Selected tab is DONATIONS
    if (dashNavTabState.selectedDashNavTab === possibleDashNavTabs[3]) { 

        // console.log("Donation main sort array  ", projectArray);

        // return renderedHeaderMain = projectArray.map(donation => (
        //     <React.Fragment key={donation.id} >
        //         {!selectedProject.id ? (
        //             <Header 
        //                 key={project.project.id}
        //                 project={project.project} 
        //                 setProject={setProject}
        //                 selectedProject={selectedProject}
        //             />
        //         ) : project.id === selectedProject.id ? (
        //             <Header 
        //                 key={project.project.id} 
        //                 project={project.project} 
        //                 setProject={setProject}
        //                 selectedProject={selectedProject}
        //             />
        //         ) : null}
                
        //         {donation.id === selectedProject.id ? (
        //             <Donations 
        //                 donations={project}
        //                 project={project}
        //                 mainTabs={mainTabs.donationTabs}
        //                 defaultTab={mainTabs.donationTabs[0]}
        //                 setMainTabs={setMainTabs}
        //             />
        //         ) : null}
        //     </React.Fragment>
        // ))
        return renderedHeaderMain = (
            <Donations 
                donations={projectArray}
                mainTabs={mainTabs.donationTabs}
                defaultTab={mainTabs.donationTabs[0]}
                setMainTabs={setMainTabs}
            />
        )
    }

    return (
        <>
            {() => renderedHeaderMain()}
        </>
    )
}
