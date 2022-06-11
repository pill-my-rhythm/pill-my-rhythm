import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleItem from "./DragabbleItem";

const Wrapper = styled.div`
  width: 300px;
  background-color: #dadfe9;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => (props.isDraggingOver ? "#dfe6e9" : props.draggingFromThisWith ? "#b2bec3" : "transparent")};
  flex-grow: 1;
  padding: 20px;
  transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
  items: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

function Board({ items, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
            {items.map((item, index) => (
              <DragabbleItem key={item} index={index} item={item} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
