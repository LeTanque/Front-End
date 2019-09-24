import React from 'react';

import StartNav from './StartNav/StartNav';
import Top from './Top/Top';
import Banner from './Banner/Banner';
import Spotlight from './Spotlight/Spotlight';
import RecommendedProjects from './RecommendedProjects/RecommendedProjects';
import NearYou from './NearYou/NearYou';
import Noteworthy from './Noteworthy/Noteworthy';
import Hire from './Hire/Hire';

const Start = () => {
    return (
        <div className="startContainer">
            <StartNav />
            <Top />
            <Banner />
            <Spotlight />
            <RecommendedProjects />
            <NearYou />
            <Noteworthy />
            <Hire />
        </div>
    );
};

export default Start;