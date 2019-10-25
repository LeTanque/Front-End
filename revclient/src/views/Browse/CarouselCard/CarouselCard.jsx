import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaAngleRight } from 'react-icons/fa';
import Truncate from 'react-truncate';
import Skeleton from 'react-loading-skeleton';

import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import { formatMoney } from '../../../helpers/formatMoney';
import { addUpDonations } from '../../../helpers/helpers';
import { GET_USER } from '../../../graphql/queries/Users';

import { GET_ALL_PROJECTS } from '../../../graphql/queries/Projects'

import { CREATE_PROJECT_LIKE, DELETE_PROJECT_LIKE } from '../../../graphql/mutations';
import { useMutation, useQuery } from '@apollo/react-hooks';

const CarouselCard = props => {
	const { card, view, setToggleState, toggleState } = props;

	const {data } = useQuery(GET_USER);


	const [ createProjectLike ] = useMutation( CREATE_PROJECT_LIKE, {
		update(cache, {data: createProjectLike}) {
			const {getProjectsView} = cache.readQuery({
				query: GET_ALL_PROJECTS
			})
			cache.writeQuery({
				query: GET_ALL_PROJECTS,
				data: {getProjectsView:{
					...getProjectsView,
					recommendedProjects: getProjectsView.recommendedProjects.map(eachProject => {
						if(eachProject.id === card.id) {
							return {
								...eachProject,
								likes: createProjectLike.createProjectLike.project.likes
							}
						} 
						// else {
						// 	return eachProject
						// }
					})}
				} 
			})
			setToggleState(!toggleState)
		}
	}
	);
	const [ deleteProjectLike ] = useMutation( DELETE_PROJECT_LIKE, {
		update(cache, {data: deleteProjectLike}) {
			const {getProjectsView} = cache.readQuery({
				query: GET_ALL_PROJECTS
			})
			cache.writeQuery({
				query: GET_ALL_PROJECTS,
				data: {getProjectsView: {
					...getProjectsView,
					recommendedProjects: getProjectsView.recommendedProjects.map(eachProject => {
					if(card.id === eachProject.id) {
						return {
							...card,
							likes: eachProject.likes.filter(eachLike => eachLike.id !== deleteProjectLike.deleteProjectLike.id)
						}
					} else {
						return eachProject
					}
				})}}
			})
			setToggleState(!toggleState)
		}
	}
	);

	const [ likeState, setLikeState ] = useState({
		liked: false,
		likeId: '',
	});

	const toggleLiked = async (e, arg) => {
		e.preventDefault();
		if (arg === "unlike") {
			await deleteProjectLike({ variables: { id: likeState.likeId }})
		}
		if (arg === "like") {
			await createProjectLike({ variables: { id: card.id }})

		}
	};

	useEffect(() => {  
		if(card.likes && data) {
			card.likes.map(eachLike => {
				if(eachLike.profile.id === data.me.id) {
					setLikeState({liked: true, likeId: eachLike.id})
				} else {
					setLikeState({...likeState, liked: false})
				}
			})
		}
    }, [card, data]);

	if (!card && view === 'recommended') {
		return (
			<section className="carousel-card-inner __recommended">
				<Skeleton count={1} height={360} width={240} />
			</section>
		);
	}

	if (!card.images) {
		card.images = [
			'https://res.cloudinary.com/revitalize/image/upload/v1569451117/start%20page/Camp_Crystal_Lake_jqewaz.jpg',
		];
	}

	if (!card.featuredImage) {
		card.featuredImage =
			'https://res.cloudinary.com/revitalize/image/upload/v1569451117/start%20page/Camp_Crystal_Lake_jqewaz.jpg';
	}

	if (view === 'recommended') {
		return (
			<section className="carousel-card-inner __recommended">
				<div className="carousel-card-image">
					{localStorage.getItem('token') ? (
						likeState.liked ? (
							<FaHeart fill="#d2405b" onClick={e => toggleLiked(e, 'unlike')} />
						) : (
							<FaRegHeart onClick={e => toggleLiked(e, 'like')} />
						)
					) : null}
					<img src={card.featuredImage} alt={card.name} />
					<div className="after"></div>
				</div>
				<div className="carousel-card-body">
					<div className="carousel-card-body-descript">
						<i>
							{card.city}, {card.state}
						</i>
						<Link to={`/project/${card.slug}`}>
							<h5>{card.name}</h5>
						</Link>
						<Truncate lines={3} ellipsis={`...`}>
							{card.description}
						</Truncate>
					</div>
					<div className="carousel-card-body-money">
						<ProgressBar startingPoint={card.goalAmount} progress={addUpDonations(card.donations)} />
						<p>
							<b>${addUpDonations(card.donations)}</b> out of ${formatMoney(card.goalAmount)}
						</p>
					</div>
				</div>
			</section>
		);
	}
	if (view === 'nearYou') {
		return (
			<section className="carousel-card-inner __near-you">
				<div className="carousel-card-image">
					<i className="carousel-card-location">
						{card.city}, {card.state}
					</i>
					<img src={card.featuredImage} alt={card.name} />
					<div className="after"></div>
				</div>
				<div className="carousel-card-body">
					<div className="carousel-card-body-descript">
						<Link to={`/project/${card.slug}`}>
							<h5>{card.name}</h5>
						</Link>
						<Truncate lines={3} ellipsis={`...`}>
							{card.description}
						</Truncate>
					</div>
					<Link to={`/project/${card.slug}`}>
						Learn more <FaAngleRight />
					</Link>
				</div>
			</section>
		);
	}
	if (view === 'noteworthy') {
		return (
			<section className="carousel-card-inner __noteworthy">
				<div className="carousel-card-image">
					<div className="carousel-card-location">
						{card.city}, {card.state}
					</div>
					<img src={card.featuredImage} alt={card.name} />
				</div>

				<div className="carousel-card-body">
					<div className="carousel-card-body-descript">
						<h4>{card.name}</h4>
						<p>{card.description}</p>
					</div>
					<Link to={`/project/${card.slug}`}>
						Learn more <FaAngleRight />
					</Link>
				</div>
			</section>
		);
	}
};

export default CarouselCard;