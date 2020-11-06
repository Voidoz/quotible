import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import R from 'ramda';

import Box from 'react-bulma-companion/lib/Box';
import Button from 'react-bulma-companion/lib/Button';
import Title from 'react-bulma-companion/lib/Title';
import Field from 'react-bulma-companion/lib/Field';
import Control from 'react-bulma-companion/lib/Control';
import Icon from 'react-bulma-companion/lib/Icon';
import Input from 'react-bulma-companion/lib/Input';
import Label from 'react-bulma-companion/lib/Label';

import useKeyPress from '_hooks/useKeyPress';
import { attemptAddQuote } from '_thunks/quotes';

export default function NewQuote() {
  const dispatch = useDispatch();

  const [franchise, setFranchise] = useState('');
  const [installment, setInstallment] = useState('');
  const [character, setCharacter] = useState('');
  const [quote, setQuote] = useState('');

  const handleFranchiseChange = e => {
    setFranchise(e.target.value);
  };

  const handleInstallmentChange = e => {
    setInstallment(e.target.value);
  };

  const handleCharacterChange = e => {
    setCharacter(e.target.value);
  };

  const handleQuoteChange = e => {
    setQuote(e.target.value);
  };

  const handleAddQuote = () => {
    const newQuote = {
      franchise,
      installment,
      character,
      quote,
    };

    dispatch(attemptAddQuote(newQuote))
      .catch(R.identity);
  };

  useKeyPress('Enter', handleAddQuote);

  return (
    <Box className="newQuote">
      <Title size="3">
        New Quote
      </Title>
      <hr className="separator" />
      <Field>
        <Label htmlFor="franchise">
          Franchise
        </Label>
        <Control iconsRight>
          <Input
            id="franchise"
            placeholder="Franchise"
            value={franchise}
            onChange={handleFranchiseChange}
          />
          {franchise && (
            <Icon
              size="small"
              align="right"
            />
          )}
        </Control>
      </Field>
      <Field>
        <Label htmlFor="installment">
          Installation
        </Label>
        <Control iconsRight>
          <Input
            id="installment"
            placeholder="Installment"
            type="installment"
            value={installment}
            onChange={handleInstallmentChange}
          />
          {installment && (
            <Icon
              size="small"
              align="right"
            />
          )}
        </Control>
      </Field>
      <Field>
        <Label htmlFor="character">
          Character
        </Label>
        <Control iconsRight>
          <Input
            id="character"
            placeholder="Character"
            type="character"
            value={character}
            onChange={handleCharacterChange}
          />
          {character && (
            <Icon
              size="small"
              align="right"
            />
          )}
        </Control>
      </Field>
      <Field>
        <Label htmlFor="quote">
          Quote
        </Label>
        <Control iconsRight>
          <Input
            id="quote"
            placeholder="Quote"
            type="quote"
            value={quote}
            onChange={handleQuoteChange}
          />
          {quote && (
            <Icon
              size="small"
              align="right"
            />
          )}
        </Control>
      </Field>
      <hr className="separator" />
      <div className="has-text-right">
        <Button color="success" onClick={handleAddQuote} disabled={!quote || !character}>
          Add Quote
        </Button>
      </div>
    </Box>
  );
}
