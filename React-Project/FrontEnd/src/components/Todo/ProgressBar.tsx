// components/Todo/ProgressBar.tsx

import { Box, LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProgressBarProps } from '@src/types/TodoType';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20, // 프로그레스 바의 높이를 20px로 설정
  borderRadius: 5, // 둥글게 처리
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[300], // 배경색 설정
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5, // 진행 막대 둥글게 처리
    backgroundColor: '#1a90ff', // 진행 부분의 색상 설정
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
        />
      </Box>

      {/* 프로그레스 바 위에 텍스트를 배치하여 완료된 할 일 개수/전체 개수 표시 */}
      <p className="absolute inset-0 flex items-center justify-center text-white font-semibold">
        {completedTodosCount} of {totalTodosCount} tasks done
      </p>
    </div>
  );
};