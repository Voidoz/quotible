import React from 'react';
import { useSelector } from 'react-redux';
import R from 'ramda';

import Quote from '_molecules/Quote';

export default function QuoteList() {
  const { quotes } = useSelector(R.pick(['quotes']));

  return (
    <ul className="quote-list">
      {R.reverse(quotes).map(<Quote />)}
    </ul>
  );
}
