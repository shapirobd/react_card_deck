import React from "react";
import "./Card.css";

const Card = ({ name, image }) => {
	return (
		<div className="Card">
			<img src={image} />
		</div>
	);
};

export default Card;
