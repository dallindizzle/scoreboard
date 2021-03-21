import React, { useState, useCallback } from "react";
import styled from "styled-components";

const StyledInputField = styled.input`
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

const AddPlayerRow = (props) => {
  const { addPlayer } = props;

  const [name, setName] = useState("");

  const handleEnter = useCallback(
    (event) => {
      if (event.key === "Enter") {
        addPlayer(name);
        setName("");
      }
    },
    [addPlayer, name]
  );

  return (
    <tr>
      <td>
        <StyledInputField
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleEnter}
        />
      </td>
    </tr>
  );
};

export default AddPlayerRow;
