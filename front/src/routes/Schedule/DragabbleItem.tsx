import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 7px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? "#5ae1dc" : "white")};
  box-shadow: ${(props) => (props.isDragging ? " rgba(149, 157, 165, 0.2) 0px 8px 24px" : "none")};
`;

interface IItemProps {
  item: string;
  index: number;
}

function DragabbleItem({ item, index }: IItemProps) {
  return (
    <Draggable key={item} draggableId={item} index={index}>
      {(magic, snapshot) => (
        <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {item}
        </Card>
      )}
    </Draggable>
  );
}

// React.memo(DragabbleItem) : item 프롭이 변하지 않으면, 컴포넌트 렌더링을 못하게 함
export default React.memo(DragabbleItem);
