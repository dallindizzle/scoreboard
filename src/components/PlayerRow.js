import React, { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import styled from "styled-components";

const noAutoComplete = (event) => {
  event.target.setAttribute("autocomplete", "off");
};

const StyledScoreField = styled.input`
  font-size: 25px;
  text-align: center;

  width: 90%;
  height: 90%;

  border: none;

  background-color: transparent;

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

const PlayerRow = (props) => {
  const { name, numOfRounds, setPlayerTotals, leading } = props;

  const [scores, setScores] = useState([]);

  const totalScore = useMemo(() => {
    if (scores.length > 0) {
      const total = scores.reduce((acc, s) => acc + s, 0);
      setPlayerTotals((oldTotals) => {
        const newTotals = { ...oldTotals };
        newTotals[name] = total;
        return newTotals;
      });
      return total;
    }
  }, [name, scores, setPlayerTotals]);

  const onScoreInput = useCallback((e) => {
    const [, round] = e.target.id.split(":");

    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[round] = Number(e.target.value);
      return newScores;
    });
  }, []);

  const roundFields = useMemo(
    () =>
      _.times(numOfRounds, (i) => (
        <td>
          <StyledScoreField
            id={`${name}:${i}`}
            onChange={onScoreInput}
            type={"number"}
            onFocus={noAutoComplete}
          />
        </td>
      )),
    [name, numOfRounds, onScoreInput]
  );

  return (
    <StyledRow leading={leading}>
      <td>{name}</td>
      {roundFields}
      <TotalScoreCell>{totalScore}</TotalScoreCell>
    </StyledRow>
  );
};

export default PlayerRow;
