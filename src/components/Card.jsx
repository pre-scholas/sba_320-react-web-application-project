import React from 'react';

/**
 * A reusable card component to display item details.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {Array<{label: string, value: string | number}>} props.details - An array of details to display.
 * @param {string} props.type - The type of card for specific styling (e.g., 'planet', 'person').
 */
function Card({ title, details, type }) {
  return (
    <div className={`card card-${type}`}>
          <h2>{title}</h2>
          
      {details.map((detail) => <p key={detail.label}>{detail.label}: {detail.value}</p>)}
      <br />
      <button>Explore</button>
    </div>
  );
}

export default Card;