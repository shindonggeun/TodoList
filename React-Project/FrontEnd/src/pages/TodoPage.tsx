// pages/TodoPage.tsx

import TodoContainer from "@src/containers/Todo/TodoContainers";

// TodoPage는 TodoContainer를 렌더링하는 컴포넌트
const TodoPage = () => {
    return (
        <div className="container mx-auto my-10 px-4"> 
            {/* container: 기본적인 Tailwind 컨테이너 설정 사용 */}
            {/* mx-auto: 양쪽에 자동으로 마진을 주어 중앙에 정렬 */}
            {/* my-10: 상하 마진을 설정하여 페이지 상단과 약간의 간격을 줌*/}
            {/* px-4: 양쪽 패딩을 추가하여 양옆에 여백을 줌 */}
            <TodoContainer />
        </div>
    )
}

export default TodoPage;
