import React from 'react';
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
// import { inLastWeek } from "../../../../helpers/helpers";

// import Tab from './TabComponent/Tab';
import Donations from "./Donations/Donations";
// import NoContent from "./NoContent/NoContent";


// import { apprenticeTabs, apprenticeList } from '../../dashboarddummydata';

const MainDonor = props => {
	const { donations, mainTabs } = props;
	// Moving away from managing any tab information anywhere other than in dashboard.

	if (!mainTabs) {
		return (
			<LoadingSpinner />
		)
	}

	return (
		<section className="dashboard-main section  donor ">
			<div className="dashboard-section-inner-container" >

				<div className="dashboard-main-body">
					<Donations donations={donations} />
				</div>

			</div>
		</section>
	);
};

export default MainDonor;
