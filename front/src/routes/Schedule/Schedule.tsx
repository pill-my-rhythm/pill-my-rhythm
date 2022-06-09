import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { listState } from "../../atoms";

const TopContainer = styled.div`
  background-color: #30336b;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  background-color: #dadfe9;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 7px;
  padding: 10px 10px;
  background-color: white;
`;

function Schedule() {
  const [items, setItems] = useRecoilState(listState);
  // source : 움직임이 시작한 위치 (index)
  // destination : 움직인 item이 도착한 위치
  // draggableId : 어떤 item이 드래그 되었는지 (id)
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setItems((oldItems) => {
      const copyItems = [...oldItems];
      // 1) 움직이고 싶은 요소 삭제
      copyItems.splice(source.index, 1);
      // 1) 움직인 위치에 요소 돌려주기
      copyItems.splice(destination?.index, 0, draggableId);
      return copyItems;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TopContainer>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {items.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(magic) => (
                        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
                          {item}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </TopContainer>
    </DragDropContext>
  );
}

export default Schedule;
