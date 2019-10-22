import React from 'react';
import Slider from "react-slick";

import RecommendedProjectsSkeleton from './RecommendedProjectsSkeleton';
import CarouselCard from '../CarouselCard/CarouselCard';
import { NextArrow, PrevArrow } from "../CarouselCard/Arrows";

// Graphql
import { useQuery } from '@apollo/react-hooks';
import { GET_RECOMMENDED_PROJECTS } from '../../../graphql/queries';

import { useAuth } from '../../../hooks/useAuth';

const RecommendedProjects = ({ history }) => {
        const { loading, error, data } = useQuery(GET_RECOMMENDED_PROJECTS);
        // console.log("data: ", data);
        const { currentUser } = useAuth(history);
        const profileId = currentUser().profileId;
        console.log("profileId: ", profileId);

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            centerPadding: "400px",
            lazyLoad: "on-demand",
            className: "carousel-card",
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }

        if (loading) return <RecommendedProjectsSkeleton />

        if (error) return console.log(error)

        console.log("data: ", data);

        return (
            <section className="recommened-projects-section">
                <h4>Recommended Projects</h4>
                <div className="slider">
                    <Slider {...settings}>
                        {data.recommendedProjects ? data.recommendedProjects.map(recommendedItem => (
                            <CarouselCard
                                key={recommendedItem.id}
                                card={recommendedItem}
                                view="recommended"
                                profileId={profileId}
                            />
                        )) : (
                            <RecommendedProjectsSkeleton />
                        )}
                    </Slider>
                </div>
            </section>
        );
}

export default RecommendedProjects;
