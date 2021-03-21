import React, { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import styled from "styled-components";

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

  const [scores, setScores] = useState([]);

  const totalScore = useMemo(() => {
    if (scores.length > 0) {
      const total = scores.reduce((acc, s) => {
        const score = Number(s) || 0;
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

  const onScoreEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const [player, round] = e.target.id.split(":");

        setScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[round] = Number(e.target.value);
          return newScores;
        });

        focusNextScore(player, Number(round));
      }
    },
    [focusNextScore]
  );

  const onBlur = useCallback((e) => {
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
            onKeyDown={onScoreEnter}
            onBlur={onBlur}
            type="number"
            onFocus={noAutoComplete}
          />
        </td>
      )),
    [name, numOfRounds, onBlur, onScoreEnter]
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
