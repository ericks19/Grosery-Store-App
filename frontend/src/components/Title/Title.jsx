import React from 'react';

export default function Title({ title, fontSize, margin }) {
  return <h1 style={{ fontSize, margin, color: '#af1313' }}>{title}</h1>;
}
