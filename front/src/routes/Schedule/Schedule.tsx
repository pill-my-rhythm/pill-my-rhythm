import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { listState } from "../../atoms";
import Board from "./Board";

const TopContainer = styled.div`
  background-color: #30336b;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

function Schedule() {
  const [items, setItems] = useRecoilState(listState);
  // source : 움직임이 시작한 위치 (index)
  // destination : 움직인 item이 도착한 위치
  // draggableId : 어떤 item이 드래그 되었는지 (id)
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // 같은 보드 안에서 움직일 때
      setItems((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        // 1) 움직이고 싶은 요소 삭제
        boardCopy.splice(source.index, 1);
        // 2) 움직인 위치에 요소 돌려주기
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // 다른 보드로 움직일 때
      setItems((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TopContainer>
        <Wrapper>
          <Boards>
            {Object.keys(items).map((boardId) => (
              <Board boardId={boardId} key={boardId} items={items[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </TopContainer>
    </DragDropContext>
  );
}

export default Schedule;
