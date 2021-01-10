import React, { useRef } from "react";
import "./Card.css";

const Card = ({ name, image }) => {
	const posOrNegAngle = Math.random() < 0.5 ? -1 : 1;
	const posOrNegTop = Math.random() < 0.5 ? -1 : 1;
	const posOrNegLeft = Math.random() < 0.5 ? -1 : 1;

	const angle = Math.random() * 45 * posOrNegAngle;
	const y = (5 - Math.random() * 5) * posOrNegTop;
	const x = (5 - Math.random() * 5) * posOrNegLeft;

	const cardRef = useRef({
		name,
		image,
		angle,
		y,
		x,
		posOrNegTop,
		posOrNegLeft,
	});
	return (
		<div
			className="Card"
			style={{
				transform: `
						translateX(${cardRef.current.x}%) 
						translateY(${cardRef.current.y}%)
						rotate(${cardRef.current.angle}deg)`,
			}}
		>
			<img className="Card-img" src={image}></img>
		</div>
	);
};

export default Card;
