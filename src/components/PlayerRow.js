import React, { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import styled from "styled-components";

import { ROUND_WIN_DEDUCTION } from "../constants";

const StyledScoreField = styled.input`
  font-size: 25px;
  text-align: center;

  width: 90%;
  height: 90%;

  border: none;

  background-color: transparent;

  color: ${({ value }) => (value === "W" ? "#EEBC1D" : "black")};

  &:focus {
    outline: none;
  }
`;

const TotalScoreCell = styled.td`
  font-size: 30px;
  font-weight: bold;
`;

const StyledRow = styled.tr`
  transition: background 500ms ease;

  background-color: ${({ leading }) => (leading ? "#7abb71" : "white")};
`;

const NameCell = styled.td`
  cursor: pointer;

  &:hover {
    background-color: #eeaeae;
  }
`;

const noAutoComplete = (event) => {
  event.target.setAttribute("autocomplete", "off");
};

const PlayerRow = (props) => {
  const {
    name,
    numOfRounds,
    setPlayerTotals,
    leading,
    removePlayer,
    focusNextScore,
  } = props;

  const [scores, setScores] = useState(() => Array(numOfRounds).fill(""));

  const totalScore = useMemo(() => {
    if (scores.length > 0) {
      if (scores.every((score) => score === "")) {
        return 0;
      }

      const total = scores.reduce((acc, s) => {
        const score = s === "W" ? ROUND_WIN_DEDUCTION : Number(s) || 0;
        return acc + score;
      }, 0);

      setPlayerTotals((oldTotals) => {
        const newTotals = { ...oldTotals };
        newTotals[name] = total;
        return newTotals;
      });
      return total;
    }
  }, [name, scores, setPlayerTotals]);

  const onChange = useCallback((e) => {
    const [, round] = e.target.id.split(":");

    const score =
      e.target.value === "w" || e.target.value === "W"
        ? "W"
        : isNaN(e.target.value)
        ? ""
        : Number(e.target.value);

    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[round] = score;
      return newScores;
    });
  }, []);

  const onScoreEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const [player, round] = e.target.id.split(":");

        onChange(e);

        focusNextScore(player, Number(round));
      }
    },
    [focusNextScore, onChange]
  );

  const roundFields = useMemo(
    () =>
      _.times(numOfRounds, (i) => (
        <td key={`${name}:${i}`}>
          <StyledScoreField
            id={`${name}:${i}`}
            onKeyDown={onScoreEnter}
            // onBlur={onBlur}
            onChange={onChange}
            value={scores[i]}
            // type="number"
            onFocus={noAutoComplete}
            key={`${name}:${i}`}
          />
        </td>
      )),
    [name, numOfRounds, onChange, onScoreEnter, scores]
  );

  return (
    <StyledRow leading={leading}>
      <NameCell onClick={() => removePlayer(name)}>{name}</NameCell>
      {roundFields}
      <TotalScoreCell>{totalScore}</TotalScoreCell>
    </StyledRow>
  );
};

export default PlayerRow;
