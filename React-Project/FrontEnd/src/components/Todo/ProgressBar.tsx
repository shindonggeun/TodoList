// components/Todo/ProgressBar.tsx

import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProgressBarProps } from '@src/types/TodoType';

const getProgressColor = (completionRate: number) => {
  if (completionRate <= 50) {
    // 0%에서 50%까지 빨간색 -> 노란색으로
    const red = 255;
    const green = Math.floor((255 * completionRate) / 50);
    return `rgb(${red}, ${green}, 0)`;
  } else {
    // 50%에서 100%까지 노란색 -> 초록색으로
    const red = Math.floor(255 - (255 * (completionRate - 50)) / 50);
    const green = 255;
    return `rgb(${red}, ${green}, 0)`;
  }
}

// styled 컴포넌트 내부에서 completionRate 처리
const BorderLinearProgress = styled(LinearProgress)(({ ownerState }: { ownerState: { completionRate: number } }) => ({
  height: 20, 
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#e0e0e0', // 기본 배경색 설정
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: getProgressColor(ownerState.completionRate), // 동적 색상 처리
  },
}));


export default function ProgressBar({ completedTodosCount, totalTodosCount }: ProgressBarProps) {
  const completionRate = totalTodosCount > 0 ? (completedTodosCount / totalTodosCount) * 100 : 0; // 완료된 할 일의 비율 계산

  return (
    <div className="flex-1 relative">
      {/* MUI의 Box 컴포넌트를 사용해 프로그레스 바의 크기를 설정 */}
      <Box sx={{ width: '100%' }}>
        <BorderLinearProgress
          variant="determinate" // 프로그레스 바의 진행률을 제어
          value={completionRate} // 계산된 완료 비율을 설정
          ownerState={{ completionRate }} // 동적 색상을 위한 completionRate 전달 (styled 내부에서 사용)
        />
      </Box>

      {/* 프로그레스 바 위에 텍스트를 배치하여 완료된 할 일 개수/전체 개수 표시 */}
      <p className="absolute inset-0 flex items-center justify-center text-white font-semibold">
        {completedTodosCount} of {totalTodosCount} tasks done
      </p>
    </div>
  );
};