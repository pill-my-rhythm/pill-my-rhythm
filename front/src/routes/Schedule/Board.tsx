import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleItem from "./DragabbleItem";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  background-color: #dadfe9;
`;

interface IBoardProps {
  items: string[];
  boardId: string;
}

function Board({ items, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {items.map((item, index) => (
            <DragabbleItem key={item} index={index} item={item} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
