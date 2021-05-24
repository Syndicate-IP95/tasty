import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { service } from "../../config/api";

// icons
// import recipe from "../../assets/images/Main/recipe.jpg";

import "./main.scss";

const Main = ({ uiState }) => {
	const { showMenu } = uiState;
	const history = useHistory();

	const [recipesData, setRecipesData] = useState([]);
	useEffect(() => {
		// service.get("/recipes/").then(data => console.log(data.data));
		fetch("http://localhost:5001/recipes/")
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setRecipesData(data);
			});
	}, []);

	return (
		<div className="main">
			{/* Showcase */}
			<section className="showcase">
				<div style={showMenu ? { paddingLeft: "20vw" } : { paddingLeft: 0 }} className="recipesTable">
					{recipesData.map(el => (
						<div className="card" key={el.id} onClick={() => redirectToRecipe(el.id)}>
							<img className="image" src={el.photo_url} alt="" />
							<div className="field">
								<div>
									<i className="far fa-user"></i>
								</div>
								<p className="nick">{el.user_id}</p>
								<p className="description">{el.title}</p>
							</div>
						</div>
					))}
				</div>
			</section>
			<footer>
				<div className="box">
					<div className="previous">
						<i className="fas fa-chevron-left"></i>
					</div>
					<div className="flex">
						<div className="page active">
							<p>1</p>
						</div>
						<div className="page">
							<p>2</p>
						</div>
						<div className="page">
							<p>3</p>
						</div>
						<div className="page">
							<p>4</p>
						</div>
						<div className="page">
							<p>5</p>
						</div>
						<div className="page">
							<p>10</p>
						</div>
					</div>
					<div className="next">
						<i className="fas fa-chevron-right"></i>
					</div>
				</div>
			</footer>
		</div>
	);

	function redirectToRecipe(id) {
		history.push(`/recipe/${id}`);
	}
};

const mapState = state => ({
	uiState: state.ui
});

export default connect(mapState)(Main);
